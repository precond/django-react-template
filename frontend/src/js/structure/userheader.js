import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Header from './header';


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
