/*!
 * cache-funk <https://github.com/beckettkev/cache-funk>
 *
 * Copyright (c) 2016, Kevin Beckett (@beckettkev).
 * Licensed under the MIT License.
 */

'use strict';

// Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem
// throw QuotaExceededError. We're going to detect this and just silently drop any calls to setItem
// to avoid the entire page breaking, without having to do a check at each usage of Storage.
let isStorageAvailable = false;

if (typeof localStorage === 'object') {
		try {
			localStorage.setItem('localStorage', 1);
			localStorage.removeItem('localStorage');

			isStorageAvailable = true;
		} catch (error) {
			Storage.prototype._setItem = Storage.prototype.setItem;
			Storage.prototype.setItem = function setItem () {};

			console.log('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
		}
}

function insertIntoArrayAtPosition (src, target, position) {
	const beginning = src.splice(0, position);
	const end = src.splice(position);

	return beginning.concat(target).concat(end);
}

function dynamicallySetObjectAttributes (source, target, exclusions) {
	target = {
		payload: target
	};

	Object.keys(source).map(function(item) {
		if (exclusions.indexOf(item) === -1) {
			target[item] = source[item];
		}
	});

	//update the timestamp to now, we have just updated it...
	target.timestamp = Date.now();

	return target;
}

function fetchItem (key) {
	const cache = localStorage.getItem(key);

	const data = JSON.parse(cache);

	if (data && data.payload) {
		return data;
	}

	return undefined;
}

module.exports = {
	//check to see if we have local storage available
	exists: () => {
		return isStorageAvailable;
	},
  	//get local storage item if it is still valid
	fetch: (key) => {
		return fetchItem(key);
	},
	//good citizen removal service function for deleting local storage entries
	remove: (key) => {
		localStorage.removeItem(key);
	},
	//vanilla local storage cache entry with a new key
	store: (key, payload) => {
		//const data = { timestamp: Date.now(), payload: payload };

		localStorage.setItem(key, JSON.stringify(payload));
	},
	//function for inserting into a pre-existing local storage item at a set position (to maintain the search results shape)
	insert: (key, items, position, exclusions) => {
		let data = fetchItem(key);

		if (typeof exclusions === 'undefined') {
			exclusions = [];
		}

		//if the length of the array is bigger than it's position - insert this page results to the correct position of the cache array
		//else add this data  to the end of the cache array (remember that position is zero based)
		data = data.payload.length > (position + 1) ? insertIntoArrayAtPosition(data.payload, items.payload, position) : data.payload.concat(items.payload);
				
		//populate any other properties within the payload before adding the combined result back to the cache
		//const combined = { timestamp: Date.now(), payload: dynamicallySetObjectAttributes(items, data, ['birthday','payload'].concat(exclusions)) };
		const combined = dynamicallySetObjectAttributes(items, data, ['timestamp','payload'].concat(exclusions));

		localStorage.setItem(key, JSON.stringify(combined));
	}
};
