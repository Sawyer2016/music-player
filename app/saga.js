import { put, call } from 'redux-saga/effects'
import { takeEvery, takeLatest } from 'redux-saga'
import * as api from '../public/library'
var delay=seconds=>new Promise(resolve=>setTimeout(resolve,seconds))


export function *deleteFav(action){
	yield delay(1000)
	yield put({type:'del_fav'})
}

export function *addFav(action){
	
	yield delay(1000)
	yield put({type:'add_fav',id:action.id})

}

function *watch(){
	yield* takeEvery('*',function* logger(action) {
    console.log('action', action)
})
	yield* takeEvery('addFavSync', addFav)
	yield* takeEvery('deleteFavSync', deleteFav)
	
  }

export default function *rootSaga(){
	yield watch()
}
