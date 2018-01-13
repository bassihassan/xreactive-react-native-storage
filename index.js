import React, {Component} from 'react';
import {
    AsyncStorage
} from 'react-native';
import {Observable} from "rxjs"
import _ from "lodash"

class XReactiveStorage {

    save(key, value) {
        return this.toObservable(!_.isArray(key) ?
            AsyncStorage.setItem(key, JSON.stringify(value)) :
            AsyncStorage.multiSet(_.zip(key, value.map(JSON.stringify)))
        )
    }

    get (key) {
        return this.toObservable(!_.isArray(key) ?
            AsyncStorage.getItem(key).then(JSON.parse) :
            AsyncStorage.multiGet(key).then((e) => {
                let unzipArray = _.unzip(e);
                let keys = unzipArray[0];
                let values = unzipArray[1].map(JSON.parse)
                return _.zipObject(keys, values)
            })
        )
    }
    getArray(keys){
        if(keys.length == 0) return Observable.of([])
        return this.toObservable(AsyncStorage.multiGet(keys).then((e) => {
            let unzipArray = _.unzip(e);
            return unzipArray[1].map(JSON.parse)
        }))
    }
    getAllKeys() {
        return this.toObservable(AsyncStorage.getAllKeys())
    }


    update(key, value) {
        return this.toObservable(AsyncStorage.setItem(key, JSON.stringify(value)));
    }

    merge(key, value) {
        return this.toObservable(!_.isArray(key) ?
            AsyncStorage.mergeItem(key, JSON.stringify(value)) :
            AsyncStorage.multiMerge(_.zip(key, value))
        )

    }

    remove(key) {
        return this.toObservable(!_.isArray(key) ?
            AsyncStorage.removeItem(key) : AsyncStorage.multiRemove(key))
    }

    clear() {
        return this.toObservable(AsyncStorage.clear());
    }

    toObservable(promise) {
        return Observable.fromPromise(promise);
    }

}

module.exports = new XReactiveStorage();
