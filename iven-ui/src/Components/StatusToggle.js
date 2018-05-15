import React from 'react';

const StatusToggle = (props) => {
    return <div id="statusToggle">
        <select onChange={e=>props.onChange(props,e)} value={props.value}>
            {
                props.options.map( option => <option key={option.name}>{option.name}</option> )
            }
        </select>
    </div>
}


export default StatusToggle;