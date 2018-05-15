import React from 'react';

import MainContainer from './MainContainer';

const AdminContainer = ()=>{
    return <div> 
        <h2 className="main-heading">Admin Page</h2>
        <MainContainer isAdmin={true} />
    </div>
}

export default AdminContainer;