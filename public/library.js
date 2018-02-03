import React from 'react'
var library=[{id:0,name:'说散就散',img:'./images/san.jpeg',audio:'./audios/说散就散.mp3'},
{id:1, name:'shape of you', img:'./images/shape of you.png', audio:'./audios/shape of you.mp3'},
{id:2, name:'体面', img:'./images/体面.png', audio:'./audios/体面.mp3'},
{id:3, name:'全部都是你', img:'./images/全部都是你.jpg', audio:'./audios/全部都是你.mp4'}
]
var favourite=[2,3]
var addMusic= (name,img,audio)=>{
	setTimeout(()=>library.push({id:library.length, name,img,audio}),1000)
}

var findMusic=(id)=>{
	return library.find(item=>{
		return item.id==id
	})

}
var editMusic=(id,obj)=>{
	let music=library.find(item=>{
		return item.id==id
	})
	let index=library.findIndex(item=>{
		return item.id==id
	})
	library=[...library.slice(0,index),{...music,...obj}, ...library.slice(index+1)]
}

var addFavourite =(id)=>{
	if(!library.map(item=>item.id).includes(id))
		favourite.push(id)
}

var deleteFavourite=(id)=>{
	let index = favourite.findIndex(item=>item)
	favourite.splice(index,1)
}
export {
	library, 
	addMusic, 
	findMusic, 
	editMusic,
	favourite,
	addFavourite,
	deleteFavourite
}