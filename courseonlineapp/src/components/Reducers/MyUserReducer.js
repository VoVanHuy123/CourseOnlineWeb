import cookie from 'react-cookies'

export const MyUserReducer = (current, action) => {
    switch (action.type) {
        case "login":
            return action.payload;
        case "logout":
            cookie.remove('token');
            return null;
    }

    return current;
}