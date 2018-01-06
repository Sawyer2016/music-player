import React from 'react'
import styles from './Music.css'
import {Icon, Slider} from 'antd'
import {library} from '../public/library'



class Music extends React.Component{
  constructor(props){
  	super(props)
  	this.state={
  		isPlay:false,
  		indexOfSongs:0,
  		library:library,
  		duration:0,
  		currentValue:0,
  	}
  	
  }

  
  handleAudio () {
  	var node = document.getElementById('player') 	
  	this.setState({isPlay:!this.state.isPlay},()=>{
  		if(this.state.isPlay){
  			node.play()
  		}else{
  			node.pause()
  		}
  	})
  }

  nextSong () {
  	let index = this.state.indexOfSongs
  	let songs = this.state.library
  	if(index>=songs.length-1){
  		index=0;
  	}
  	else{
  		index++;
  	}
  	this.setState({indexOfSongs:index, isPlay:false, currentValue:0})
  }

  preSong () {
  	let index = this.state.indexOfSongs
  	let songs = this.state.library
  	if(index<=0){
  		index=songs.length-1;
  	}
  	else{
  		index--;
  	}
  	this.setState({indexOfSongs:index, isPlay:false, currentValue:0})
  }

  getFormatTime(time) {
  	let minite=Math.floor(time/60)
  	let seconds=Math.floor(time-minite*60)
  	let totalTime=minite+":"+ (seconds<10 ? "0"+seconds : seconds)
  	return totalTime
  }

  handleChange(value){
    var node = document.getElementById('player')
    node.currentTime=value
    this.setState({currentValue:value})
  }


  componentDidMount(){
  	var node = document.getElementById('player')
  	node.onended= ()=>{
  		this.setState({isPlay:false})
  	}
  	node.oncanplay=()=>{
  		this.setState({duration:node.duration})
  	}
  	setInterval(()=>{this.setState({currentValue:node.currentTime})},1000)
  }
  render() {
  	const {indexOfSongs, library, duration, currentValue} = this.state
    console.log()
  	let totalTime=this.getFormatTime(duration)
  	let currentTime=this.getFormatTime(currentValue)
    return (
    	<div style={{margin:'auto',width:'400px'}}>
    		<h1 style={{marginTop:'40px',marginBottom:'20px',textAlign:'center'}}>{library[indexOfSongs].name}</h1>
	      
	        <div className={styles.imgBox}>
	        	<img className={this.state.isPlay ? styles.imgStyle+" "+styles.play : 
	        	styles.imgStyle} src={library[indexOfSongs].img} />
	        </div>
	        <div style={{width:'100%',display:'flex',alignItems:'center'}}>
		        <div style={{flexGrow:1, textAlign:'center'}}>{currentTime}</div>
			        <div style={{flexGrow:8}}>
			        <Slider  value={currentValue} onAfterChange={this.handleChange.bind(this)} onChange={this.handleChange.bind(this)} tipFormatter={null} max={Math.floor(duration)} />
			        </div>
		        <div style={{flexGrow:1, textAlign:'center'}}>{totalTime}</div>
	        </div>
	        <div style={{display:'flex', justifyContent:'space-between', fontSize:40}}>
	        <Icon type="verticle-right" onClick={this.preSong.bind(this)}/>
	        {this.state.isPlay ?  <Icon type="pause-circle-o" onClick={this.handleAudio.bind(this)}/> : 
	        <Icon type="play-circle-o" onClick={this.handleAudio.bind(this)}/>}
	        <Icon type="verticle-left" onClick={this.nextSong.bind(this)}/>
	        <audio id="player" src={library[indexOfSongs].audio} ></audio>
	        </div>
	      
	    </div>
    )
  }
}

export default Music

