import React from 'react';


export const Modal = function(props) {
    return(
        <div>
            <div className="modal-backdrop fade in"> </div>
            <div className="modal fade in" style={{display: 'block'}}>
                <div className={`modal-dialog${props.top ? ' top' : ''}`}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={props.close}><span className="icon-close"> </span></button>
                            <h4 className="modal-title">{props.title}</h4>
                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
