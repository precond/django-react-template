import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Header from '../structure/header';


const mapStateToProps = state => {
    return {
        user: state.user
    };
};


const UserHeader = withRouter(connect(
    mapStateToProps,
    null
)(Header));


export default UserHeader;
