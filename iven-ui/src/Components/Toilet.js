import React from 'react';
import PropTypes from 'prop-types';

const Toilet = ({toilet, statusColor}) => {
    return <div id="Toilet">
        <div className="toilet-name sub-heading">{toilet.name}</div>
        <div className="toilet-id " hidden>{toilet.id}</div>
        <div style={{color: statusColor}} className="toilet-status status-heading">{toilet.status}</div>
    </div>
}

Toilet.propTypes = {
    toilet: PropTypes.object.isRequired,
    statusColor: PropTypes.string
}

export default Toilet;