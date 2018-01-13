#  xreactive-react-native-storage
An AsyncStorage wrapper based on RxJs for React Native to simplify the code and take advantage of the power offered by Rx

## How to install
`npm i xreactive-react-native-storage --save`

## Why did I build this?
While working on a React Native project for the first time, I discovered that AsyncStorage and it's asynchronous nature was really a puzzle. It was also very difficult to memorize or copy the same piece of code everywhere to make a simple get or set so if we want to save several keys, values we must repeat operations to zip the two arrays (keys, values) It's very annoying . So, I decided to create this package based on rxjs to take advantage of it's power as well as it's simplicity
to solve the problems I mentioned above and I hope someone else too!

## Methods
All methods are based on observables.

*   __save(key(s),value(s))__ : Save _value(s)_ to _key(s)_.
	* _key_  : may be string or string[] .
	*  _value_ may be  any or  any[] .
*    __get(key(s))__ : Get value(s) from local storage.
	*  _key_ may be a string or string[], 
		* if the key is a string the function return an observable that hold the value of the key but if the key is string[] then the value is an object { key : value}
*   __getArray(keys)__ : Get array of values . 
	* keys must be an array of strings the function will  return an observable that hold an array of values each value is in the same position of the key .
*   __getAllKeys()__ : Get _all_ keys from local storage.
*   __update(key, value)__ : update _value_ to existing _key_ value. 
	* key must be string 
*    __merge(key(s), value(s))__ : merge _value(s)_ to existing _key(s)_ value.
	*  _key_ may be a string or string[]
	*   _value_ may be any or any[]
*   __remove(key)__ : Remove key(s) from local storage. 
	* _key_ may be a string or string[] .
*   __clear()__ : Remove _all_ keys from local storage.


## Examples

### get and save : 
```Javascript
import {Observable} from "rxjs"
import xstorage from "xreactive-react-native-storage"

var key  = 'key1'
var values = [1,3,4]

xstorage.save(key,values).subscribe((e)=>{
	 
})
var keys = ['key1','key2']
xstorage.get(keys).subscribe(({key1,key2})=>{
		console.log(`value of key 1 is ${key}`)
})
```

### Real world Exemple : 
```Javascript
import {Observable} from "rxjs"
import xstorage from "xreactive-react-native-storage"

function fetchTalkDetail(event,talksId,type) {
    let ids = talksId.map((id)=>`${event.code}-talk-${id}`);
    return xstorage.getArray(ids).switchMap((e)=>{
        return Observable.of({
            talks:e,
            event,
            type
        })
    }).toPromise()
   
}
```


## Contributors

-   Bassi Hassan (Me)
-   You! Feel free to contribute in any way. :D
