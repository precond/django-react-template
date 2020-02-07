import DjangoAPI from '../util/django';


export const getAPI = dispatch => {
    return {
        login: (username, password) => {
            return dispatch(() => {
                const data = {username: username, password: password};
                return DjangoAPI.post('/api/login', data);
            });
        },
    };
};
