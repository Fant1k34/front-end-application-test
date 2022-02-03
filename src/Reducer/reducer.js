import initialState from "../initialState";

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LIKING": {
      let modified = state.timeseries.slice();
      modified[action.payload].isLiked = !modified[action.payload].isLiked;
      return {
        ...state,
        timeseries: modified,
      };
    }

    case "DELETING": {
      let modified = state.timeseries.slice();
      modified.splice(action.payload, 1);
      let urlsModified = state.urls.slice();
      urlsModified.splice(action.payload, 1);
      return {
        ...state,
        timeseries: modified,
        urls: urlsModified,
      };
    }

    case "FETCHING":
      return {
        ...state,
      };

    case "FETCH_SUCCESS":
      return {
        ...state,
        name: action.payload.init,
        timeseries: action.payload.dataseries,
      };

    case "FETCH_ERROR":
      return {
        ...state,
      };

    case "RELOAD_PICTURES":
      return {
        ...state,
        urls: [],
        needFilter: false
      };

    case "PICTURES_SUCCESS":
      const urlsCopy = state.urls.slice();
      urlsCopy.push(action.payload.payload);
      return {
        ...state,
        urls: urlsCopy,
      };

    case "FILTERING":
      return {
        ...state,
        needFilter: !state.needFilter,
      };

    default: {
      return {
        ...state
      };
    }
  }
}

export default reducer;