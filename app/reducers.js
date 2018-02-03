import React from 'react'

const initialState={
	indexOfSongs:0,
	favList:[0],
	value:0
}
function cunrrentMusic(state=initialState, action){
	switch(action.type){
		case "chooseMusic":
			return Object.assign({},state,{indexOfSongs:action.index})

		case "addFav":
			let addList=[...state.favList]
			addList.push(action.id)
			return {...state, favList:addList}			
		case "del_fav":
			favList=state.favList
			let index = favList.findIndex(item=>item==action.id)
			favList.splice(index,1)
			return {...state,favList}
		default:
			return state
				
	}
}

export {cunrrentMusic}