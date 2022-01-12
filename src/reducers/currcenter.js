const currCenter = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_CURR_CENTER':
            return action.payload
        default:
            return state;    
    }
}

export default currCenter;