import React from 'react';

import MainContainer from './MainContainer';

const HomeContainer = ()=>{
    return  <div id="home">
        <h2 className="main-heading">Toilet Status</h2>
        <MainContainer isAdmin={false} />
    </div>
}

export default HomeContainer;