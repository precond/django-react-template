import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {Login} from './login';
import {getAPI} from './api';


const mapStateToProps = state => {
    return {
        next: state.next
    };
};


const mapDispatchToProps = dispatch => {
    return {
        api: getAPI(dispatch)
    };
};


const LoginContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Login));


export default LoginContainer;
