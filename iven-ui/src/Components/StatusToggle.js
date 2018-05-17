import React from 'react';
import PropTypes from 'prop-types';

const StatusToggle = (props) => {
    return <div id="statusToggle">
        <select onChange={e=>props.onChange(props,e)} value={props.value}>
            {
                props.options.map( option => <option key={option.name}>{option.name}</option> )
            }
        </select>
    </div>
}

StatusToggle.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    options: PropTypes.array.isRequired
  };

export default StatusToggle;