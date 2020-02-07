import DjangoAPI from '../util/django';


export const getAPI = dispatch => {
    return {
        setPassword: (password_current, password_new) => {
            return dispatch(() => {
                return DjangoAPI.post('/api/me/password', {
                    password_current: password_current,
                    password_new: password_new
                });
            });
        }
    };
};
