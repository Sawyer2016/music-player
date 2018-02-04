import React from 'react'
import styles from './Music.css'
import {Icon, Slider, Modal, List, Spin} from 'antd'
import {library} from '../public/library'
import {InfiniteList} from './InfiniteList'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';


class Music extends React.Component{
  constructor(props){
  	super(props)
  	this.state={
  		isPlay:false,
  		indexOfSongs:0,
  		library:library,
  		duration:0,
  		currentValue:0,
      visible:false,
      mode:'list-reverse'
  	}
  	
  }

  componentDidMount(){
    const {index} =this.props
    let react=this
    if(index){
      this.setState({indexOfSongs:index})
    }
    var node = this.refs.player
    this.listReverseMode(node)
    node.oncanplay=()=>{
      this.setState({duration:node.duration})
    }
    document.body.onkeydown=react.pressSpace
    setInterval(()=>{this.setState({currentValue:node.currentTime})},1000)
  }

  //click space
  pressSpace = () =>{  
    if(event.keyCode==32)
      {
        this.handleAudio()
      }
  }

  //play or pause the music
  handleAudio = () => {
  	var node = this.refs.player 	
  	this.setState({isPlay:!this.state.isPlay},()=>{
  		if(this.state.isPlay){
  			node.play()
  		}else{
  			node.pause()
  		}
  	})
  }

  //play next song
  nextSong = () => {
  	let index = this.state.indexOfSongs
  	let songs = this.state.library
  	if(index>=songs.length-1){
  		index=0;
  	}
  	else{
  		index++;
  	}
    this.gotoMusic(index)
  }
  

  //play pre song
  preSong = () =>  {
  	let index = this.state.indexOfSongs
  	let songs = this.state.library
  	if(index<=0){
  		index=songs.length-1;
  	}
  	else{
  		index--;
  	}
    this.gotoMusic(index)
  }

  getFormatTime = (time) =>{
  	let minite=Math.floor(time/60)
  	let seconds=Math.floor(time-minite*60)
  	let totalTime=minite+":"+ (seconds<10 ? "0"+seconds : seconds)
  	return totalTime
  }

  //change time of music
  handleChange = (value) =>{
    var node = this.refs.player
    node.currentTime=value
    this.setState({currentValue:value})
  }
  
  setVisible =(visible)=>{
    this.setState({visible:visible})
  }
  
  //turn to specific music
  gotoMusic =(id) =>{
    if(id!=this.state.indexOfSongs){
      this.setState({visible:false,indexOfSongs:id, isPlay:true, currentValue:0})
      var node = this.refs.player
      node.oncanplay=()=>{
        node.play()
        this.setState({duration:node.duration})
      }
    }else{
      this.setState({visible:false})
    }
  }
  
  // change mode
  changeMode = ()=>{
    var node = this.refs.player
    if(this.state.mode=='list-reverse'){
      this.setState({mode:'single-reverse'})
      this.singleReverseMode(node)
    }else{
      this.setState({mode:'list-reverse'})
      this.listReverseMode(node)
    }
  }

  listReverseMode =(node) =>{
    node.onended= ()=>{
      this.nextSong()
      this.setState({isPlay:true})
      node.play()  
    }
  }

  singleReverseMode =(node)=>{
    node.onended= ()=>{
      this.setState({isPlay:true, currentValue:0})
      node.play()  
    }
  }

  

  
  render() {
  	const {indexOfSongs, library, duration, currentValue, mode} = this.state
  	let totalTime=this.getFormatTime(duration)
  	let currentTime=this.getFormatTime(currentValue)
    return (
    	<div style={{margin:'auto',width:'400px'}}>
          <div style={{display:'flex', alignItems:'flex-end',fontSize:'24px',justifyContent:'space-between'}}>
            <img src="./images/音符.jpg" className={styles.note} /> 
            <Link to="/library">曲库</Link>
            {/*<Link to='/favMusic'>试听列表</Link>*/}
          </div>
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
          {mode=='list-reverse'?<Icon type="reload" title="列表循环" onClick={this.changeMode.bind(this)}/> : <Icon type="retweet" title="单曲循环" onClick={this.changeMode.bind(this)}/>}
	        <Icon type="verticle-right" onClick={this.preSong.bind(this)}/>
	        {this.state.isPlay ?  <Icon type="pause-circle-o" onClick={this.handleAudio.bind(this)}/> : 
	        <Icon type="play-circle-o" onClick={this.handleAudio.bind(this)}/>}
	        <Icon type="verticle-left" onClick={this.nextSong.bind(this)}/>
          <Icon type="bars" onClick={this.setVisible.bind(this,true)}/>
	        <audio id="player" ref="player" src={library[indexOfSongs].audio} ></audio>
	        </div>

        <Modal
          title="歌单"
          style={{ top: 0 }}
          footer={null}
          visible={this.state.visible}
          onCancel={() => this.setVisible(false)}
        >
          <InfiniteList data={library} handleClick={this.gotoMusic.bind(this)}/>
        </Modal>
	      
	    </div>
    )
  }
}

function select (state){
    return{
      index:state.indexOfSongs
    }
  }

export default connect(select)(Music)

