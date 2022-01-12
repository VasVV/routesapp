const points = (state = [], action) => {
    switch (action.type) {
        case 'ADD_POINT':
            return [...state, action.payload];
        case 'REMOVE_POINT':
            return state.filter(point => point.currPoint !== action.payload);
        case 'REORDER':
            return action.payload;
        default:
            return state;    
    }
}

export default points;