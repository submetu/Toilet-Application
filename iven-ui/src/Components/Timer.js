import React, {Component} from 'react';
import {occupied} from '../Models/constants';

export default class Timer extends Component{
    constructor(){
        super();
        this.state = {
            time: '0:0:0',
            loading: false
        }

        this.updateTimer = this.updateTimer.bind(this);
        this.timerInterval;
    }

    componentWillMount(){
        this.updateTimer();
    }
    componentWillUnmount(){
        clearInterval(this.timerInterval); 
    }

    render(){
        return (
            <div className="timer">
                {this.state.loading ? this.props.loadingText : (occupied + " since: " + this.state.time) }
            </div>
        )
    }

    updateTimer(){
        this.subtractTime.call(this);
        this.timerInterval = setInterval(this.subtractTime.bind(this),1000)
    }

    subtractTime(){
        let diff = Math.round( (new Date() - new Date(this.props.startTime)) /1000 ) * 1000;
        
        if(diff > 0){
            this.setState({loading:false, time: this.msToTime(diff) });
        }else{
            this.setState({loading:true});
        }
    
        
    }
    
    msToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
      
        return hrs + ' hrs ' + mins + ' mins ' + secs + ' secs '
      }
}

Timer.defaultProps = {
    loadingText: 'Loading ...'
}