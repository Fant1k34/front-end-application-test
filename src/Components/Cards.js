import { connect } from "react-redux";
import {getAllPostsAction, likeAction, errorGettingPostsAction, filterAction, deleteAction,
        reloadImagesAction, successGettingPostsAction, successDrawingPicturesAction} from "../Actions/actions";
import { getAllPictures, fetchPosts } from "../api";
import Card from "../Components/Card";


function Cards(props) {
  function handleReloadButton() {
      return props.onReload();
  }

  function handleFilterButton() {
    return props.onFilter();
  }

  return (
    <div className="Cards">
      <div className="Information">
        <p>Одностраничный сервис по показу погоды и кошечек</p>
        <p>Для альфа-банка</p>
        <p>Город: Санкт-Петербург</p>
        <button
          onClick={handleFilterButton}
          className={
            (props.needFilter ? "Filtered" : "FreeFilter") + " FilterButton"
          }
        ></button>
        <button onClick={handleReloadButton} className={"ReloadButton"}></button>
      </div>
      <div className="CardList">
        {props.timeseries &&
          props.timeseries.map((element, i) => {
            if ((props.needFilter && element.isLiked) || !props.needFilter) {
              return (
                  <Card parentToChild={{element, props, i}} key={i}/>
              );
            }
            else {
              return null;
            }
          })}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    like: state.like,
    name: state.name,
    version: state.version,
    description: state.description,
    timeseries: state.timeseries,
    urls: state.urls,
    needFilter: state.needFilter
  };
}


function mapDispatchToProps(dispatch) {
  return {
    onReload: () => {
      dispatch(getAllPostsAction());
      dispatch(reloadImagesAction());
      try {
          return fetchPosts().then(([response, json]) => {
              json.dataseries.map((data) => {
                  return {
                      ...data,
                      isLiked: false
                  }
              })
              dispatch(successGettingPostsAction(json));

              // Диспатчим картинки
              for (let i = 0; i < json.dataseries.length; i++) {
                getAllPictures().then(([json]) => {
                  dispatch(successDrawingPicturesAction(i, json[0].url));
                });
              }
        });
      }
      catch {
          dispatch(errorGettingPostsAction());
      }
    },
    onLike: (id) => {
      dispatch(likeAction(id));
    },
    onDelete: (id) => {
      dispatch(deleteAction(id));
    },
    onFilter: () => {
      dispatch(filterAction());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);