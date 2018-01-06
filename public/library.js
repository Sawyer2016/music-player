import React from 'react'
var library=[{name:'说散就散',img:'./images/san.jpeg',audio:'./audios/说散就散.mp3'},
{name:'shape of you', img:'./images/shape of you.png', audio:'./audios/shape of you.mp3'}
]
var addMusic= (name,img,audio)=>{
	library.push({name,img,audio})
}
export {library, addMusic}