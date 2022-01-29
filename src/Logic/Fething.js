import getAllPostsAction from "../Actions/getAllPostsAction";
import errorGettingPostsAction from "../Actions/errorGettingPostsAction";
import likeAction from "../Actions/likeAction";

function getAllData(dispatch) {
    return {
        onReload: () => {
            dispatch(getAllPostsAction);
            return fetchPosts().then(([response, json]) =>{
                if(response.status === 200){
                dispatch(successGettingPostsAction(json))
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


function fetchPosts() {
  return fetch('http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json')
     .then( response => Promise.all([response, response.json()]));
}

function successGettingPostsAction(payload) {
    return {
      type: "FETCH_SUCCESS",
      payload
    }
}


export default getAllData;