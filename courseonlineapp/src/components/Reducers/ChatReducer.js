import cookie from 'react-cookies'

export const ChatReducer = (current, action) => {
    switch (action.type) {
        case "setConversation":
            return action.payload;
        
    }

    return current;
}