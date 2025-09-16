import cookie from 'react-cookies'

export const CurrentCourseReducer = (current, action) => {
    switch (action.type) {
        case "update":
            return action.payload;
        
    }

    return current;
}