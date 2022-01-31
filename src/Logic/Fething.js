import getAllPostsAction from "../Actions/getAllPostsAction";
import errorGettingPostsAction from "../Actions/errorGettingPostsAction";
import reloadImagesAction from "../Actions/reloadImagesAction";
import filterAction from "../Actions/filterAction";

function getAllData(dispatch) {
  return {
    onReload: () => {
      dispatch(getAllPostsAction);
      dispatch(reloadImagesAction);
      return fetchPosts().then(([response, json]) => {
        if (response.status === 200) {
          // Диспатчим посты
          for (var i = 0; i < Object.keys(json.dataseries).length; i++) {
            json.dataseries[i].isLiked = false; // Не лайкнуты
          }
          dispatch(successGettingPostsAction(json));

          // Диспатчим картинки
          for (let i = 0; i < Object.keys(json.dataseries).length; i++) {
            getAllPictures().then(([json]) => {
              dispatch(successDrawingPicturesAction(i, json[0].url));
            });
          }
        } else {
          dispatch(errorGettingPostsAction);
        }
      });
    },
    onLike: (event) => {
      console.log(event.target.dataset.mssg);
      dispatch(likeAction(event.target.dataset.mssg));
    },
    onDelete: (event) => {
      console.log(event.target.dataset.mssg);
      dispatch(deleteAction(event.target.dataset.mssg));
    },
    onFilter: () => {
      dispatch(filterAction);
    },
  };
}

function getAllPictures() {
  return fetch(
    "https://api.thecatapi.com/v1/images/search?api_key=efaf6552-f07a-4e9d-b1e8-9c615dfa9a4f"
  ).then((response) => Promise.all([response.json()]));
}

function fetchPosts() {
  return fetch(
    "https://www.7timer.info/bin/astro.php?lon=30.3&lat=59.9&ac=0&unit=metric&output=json&tzshift=0"
  ).then((response) => Promise.all([response, response.json()]));
}

function successGettingPostsAction(payload) {
  return {
    type: "FETCH_SUCCESS",
    payload,
  };
}

function successDrawingPicturesAction(number, payload) {
  return {
    type: "PICTURES_SUCCESS",
    payload: {
      id: number,
      payload: payload,
    },
  };
}

function likeAction(payload) {
  return {
    type: "LIKING",
    payload: payload,
  };
}

function deleteAction(payload) {
  return {
    type: "DELETING",
    payload: payload,
  };
}

export default getAllData;
