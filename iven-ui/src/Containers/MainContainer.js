import React, { Component } from 'react';

import config from '../config';
import Toilet from '../Components/Toilet';
import StatusToggle from '../Components/StatusToggle';
import ToiletImage from '../Components/ToiletImage';
import Timer from '../Components/Timer';
import Options from '../Models/Options';
import ToiletImageModel from '../Models/ToiletImageModel';
import {occupied} from '../Models/constants';
import statusColors from '../Models/statusColors';


export default class MainContainer extends Component {

    constructor() {
        super();
        this.state = {
            toilets: [],
        }
        this.socket = new WebSocket(config.websockerServer);
        this.onStatusToggle = this.onStatusToggle.bind(this);
    }

    componentWillMount() {
        this.connectToServer.call(this);
    }

    render() {
        return (
            <div className="toilets">
                    {this.generateToilets.call(this)}
            </div>
        );
    }

    connectToServer() {
        
        this.socket.onmessage = (event) => {
            let toilets = [];
            try {
                toilets = JSON.parse(event.data);
            } catch (e) {
                throw new Error('Toilet data not parsable!');
            }
            if(toilets.length > 0){
                return this.setState(() => {
                    return { toilets }
                });
            }
            throw new Error ("No toilets received from server");
        }
    }
    
    generateToilets(){
        return this.state.toilets.map( toilet => {
            return <div className="toilet-container" key={toilet.id}>

                        <Toilet toilet={toilet} statusColor={statusColors[toilet.status]}/>

                        <div className="toilet-image-container">
                            <ToiletImage source={ToiletImageModel[toilet.status]}/>
                        </div>

                        { this.props.isAdmin && 
                        <StatusToggle 
                            value={toilet.status} 
                            toiletId={toilet.id} 
                            options={Options} 
                            onChange={this.onStatusToggle}
                        />
                        }

                        { toilet.status === occupied && 
                            <Timer 
                                loadingText={"Just " + occupied + '...'}
                                startTime={toilet.toggleTime}
                            />
                        }

                </div>
      });
    }
    
    onStatusToggle(propsPassed, event){
        var payLoad = {
            action: "toggle",
            id: propsPassed.toiletId,
            newStatus: event.target.value
        };
        this.socket.send(JSON.stringify(payLoad));
    }
}
