import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Profile from './profile';
import {getAPI} from './api';


const mapStateToProps = state => {
    return {
        user: state.user
    };
};


const mapDispatchToProps = dispatch => {
    return {
        api: getAPI(dispatch)
    };
};


const ProfileContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile));


export default ProfileContainer;
