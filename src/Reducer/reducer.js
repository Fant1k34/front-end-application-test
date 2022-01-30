import initialState from "../initialState";


function reducer(state = initialState, action) {
    console.log(action);
    console.log(action.type);
    switch (action.type) {
        case 'LIKING': {
            console.log(JSON.stringify(state.timeseries));
            let modified = state.timeseries.slice();
            modified[action.payload].isLiked = !modified[action.payload].isLiked;
            return {
                ...state,
                timeseries: modified
                }
        }
        
        case 'DELETING': {
            let modified = state.timeseries.slice();
            modified.splice(action.payload, 1);
            let urlsModified = state.urls.slice();
            urlsModified.splice(action.payload, 1);
            return {
                ...state,
                timeseries: modified,
                urls: urlsModified
                }
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
                name: action.payload.init,
                timeseries: action.payload.dataseries
            }

        case 'FETCH_ERROR':
            return {
                ...state
            }
        
        case 'RELOAD_PICTURES':
            return {
                ...state,
                urls: [] 
            }

        case 'PICTURES_SUCCESS':
            console.log(state.urls);
            const urlsCopy = state.urls.slice();
            urlsCopy.push(action.payload.payload);
            return {
                ...state,
                urls: urlsCopy
            }

        case 'FILTERING':
            console.log(action.type);
            return {
                ...state,
                needFilter: !state.needFilter
            }

        default: {
            return {
            ...state,
            name: "Поймал"
            }
        }
    }
    return state;
}

export default reducer;