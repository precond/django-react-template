import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Profile from '../pages/profile';
import {getAPI} from '../api';


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


const StoreProfile = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile));


export default StoreProfile;
