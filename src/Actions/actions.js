export function likeAction(payload) {
    return {
      type: "LIKING",
      payload
    }
}

export function errorGettingPostsAction() {
    return {
        type: "FETCH_ERROR"
    }
  }
  
export function filterAction() {
    return {
        type: "FILTERING",
    }
}

export function getAllPostsAction() {
    return {
        type: "FETCHING"
    }
}

export function reloadImagesAction() {
    return {
        type: "RELOAD_PICTURES"
    }
}

export function successGettingPostsAction(payload) {
    return {
      type: "FETCH_SUCCESS",
      payload,
    };
}
  
export function successDrawingPicturesAction(number, payload) {
    return {
      type: "PICTURES_SUCCESS",
      payload: {
        id: number,
        payload: payload,
      },
    };
}
  
export function deleteAction(payload) {
    return {
      type: "DELETING",
      payload: payload,
    };
}