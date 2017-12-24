import React from 'react';


export const Popover = function(props) {
    return(
        <div className="popover fade right in" style={{display: 'inline-block'}}>
            <div className="arrow" style={{top: '50%'}}></div>
            <div className="popover-content">{props.children}</div>
        </div>
    );
};
