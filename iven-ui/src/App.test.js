import React from 'react';
import { expect } from 'chai';
import { shallow,mount } from 'enzyme';
import sinon from 'sinon';
import { WebSocket } from 'mock-socket';

import AdminContainer from './Containers/AdminContainer';
import HomeContainer from './Containers/HomeContainer';
import MainContainer from './Containers/MainContainer';
import Toilet from './Components/Toilet';
import StatusToggle from './Components/StatusToggle';

import {ToiletMock} from './mock';
import Options from './Models/Options';
import { occupied } from './Models/constants';


global.WebSocket = WebSocket;
global.this = {}
global.this.socket = WebSocket;

 describe('<AdminContainer />', () => {
   const wrapper = shallow(<AdminContainer />);
  it('renders one <MainContainer /> component', () => {
    expect(wrapper.find(MainContainer)).to.have.length(1);
  });
  it('renders one <h2/> component', () => {
    expect(wrapper.find('h2.main-heading')).to.have.length(1);
  }); 
});

describe('<HomeContainer />', () => {
  const wrapper = shallow(<HomeContainer />);
  it('renders one <MainContainer /> component', () => {
    expect(wrapper.find(MainContainer)).to.have.length(1);
  });
  it('renders one <h2/> component', () => {
    expect(wrapper.find('h2.main-heading')).to.have.length(1);
  }); 
});

describe('<StatusToggle />', () => {
  const onSelectChange = sinon.spy();
  const wrapper = shallow(<StatusToggle options={Options} onChange={onSelectChange}/>);
  it('runs onChange function when option is selected', () => {
    wrapper.find('select').simulate('change')
    expect(onSelectChange).to.have.property('callCount', 1);
  });
});

describe('<MainContainer isAdmin/>', () => {

  it('runs ComponentWillMount  ', () => {
    const spy = sinon.spy(MainContainer.prototype, 'componentWillMount');
    const wrapper = mount(<MainContainer isAdmin={true}/>);
    expect(spy.calledOnce).to.equal(true);
    spy.restore();
  });
  it('contacts the server', () => {
    const spy = sinon.spy(MainContainer.prototype, 'connectToServer');
    const wrapper = mount(<MainContainer isAdmin={true}/>);
    expect(spy.calledOnce).to.equal(true);
    spy.restore();
  });

  it('loads <Toilet /> component when the state is set', () => {
    const wrapper = mount(<MainContainer isAdmin/>);
    wrapper.setState({ toilets: [ToiletMock] });
    wrapper.update();
    expect(wrapper.find('div#Toilet')).to.have.length(1);
  });
  
  it('loads <Timer /> component when the state is set', () => {
    const wrapper = mount(<MainContainer isAdmin/>);
    wrapper.setState({ toilets: [ToiletMock] });
    wrapper.update();
    expect(wrapper.find('.timer')).to.have.length(1);
  });
  it('loads <StatusToggle /> component when the state is set', () => {
    const wrapper = mount(<MainContainer isAdmin/>);
    wrapper.setState({ toilets: [ToiletMock] });
    wrapper.update();
    expect(wrapper.find('#statusToggle')).to.have.length(1);
  });
  
  
  
});




