import React from 'react';

const Toilet = ({toilet, statusColor, glow}) => {
    return <div id="Toilet">
        <div className="toilet-name sub-heading">{toilet.name}</div>
        <div className="toilet-id " hidden>{toilet.id}</div>
        <div style={{color: statusColor}} className="toilet-status status-heading">{toilet.status}</div>
    </div>
}

export default Toilet;