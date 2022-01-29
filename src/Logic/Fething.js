import getAllPostsAction from "../Actions/getAllPostsAction";
import errorGettingPostsAction from "../Actions/errorGettingPostsAction";
import likeAction from "../Actions/likeAction";
import reloadImagesAction from "../Actions/reloadImagesAction";

function getAllData(dispatch) {
    return {
        onReload: () => {
            dispatch(getAllPostsAction);
            dispatch(reloadImagesAction);
            return fetchPosts().then(([response, json]) =>{
                if(response.status === 200){
                    // Диспатчим посты
                    dispatch(successGettingPostsAction(json));

                    // Диспатчим картинки
                    for (let i = 0; i < Object.keys(json.dataseries).length; i++) {
                        getAllPictures().then(([json]) => {
                            dispatch(successDrawingPicturesAction(i, json[0].url));
                        });
                    }
              }
              else{
                dispatch(errorGettingPostsAction)
              }
            });
        },
        onLike: () => {
            console.log('!');
            dispatch(likeAction);
        }
    }
}

function getAllPictures() {
    return fetch('https://api.thecatapi.com/v1/images/search?api_key=efaf6552-f07a-4e9d-b1e8-9c615dfa9a4f')
    .then( response => Promise.all([response.json()]));
}


function fetchPosts() {
    return fetch('http://www.7timer.info/bin/api.pl?lon=30.3141&lat=59.9386&product=astro&output=json')
       .then( response => Promise.all([response, response.json()]));
}

function successGettingPostsAction(payload) {
    return {
        type: "FETCH_SUCCESS",
        payload
    }
}

function successDrawingPicturesAction(number, payload) {
    return {
        type: "PICTURES_SUCCESS",
        payload: {
            id: number,
            payload: payload
        }
    }
}


export default getAllData;