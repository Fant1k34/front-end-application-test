import initialState from "../initialState";


function reducer(state = initialState, action) {
    console.log(action);
    console.log(action.type);
    switch (action.type) {
        case 'LIKING':
            return {
                ...state,
                name: state.name = "Liked"
            }

        case 'FETCHING':
            return {
                ...state
            }

        case 'FETCH_SUCCESS':
            console.log("I'm here");
            console.log(action.payload);
            return {
                ...state,
                name: state.name = action.payload.init,
                timeseries: state.timeseries = action.payload.dataseries
            }

        case 'FETCH_ERROR':
            return {
                ...state
            }

        default: {
            return {
            ...state,
            name: state.name = "Поймал"
            }
        }
    }
    return state;
}

export default reducer;