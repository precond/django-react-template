import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import MainPage from '../structure/mainpage';


const mapStateToProps = state => {
    return {
        user: state.user
    };
};


const UserMainPage = withRouter(connect(
    mapStateToProps,
    null
)(MainPage));


export default UserMainPage;
