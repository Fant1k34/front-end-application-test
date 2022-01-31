import {connect} from "react-redux";
import getAllData from "../Logic/Fething";

function Card(props) {
    console.log(props);
    return (
        <div className="Cards">
            <div className="Information">
                <p>Одностраничный сервис по показу погоды и кошечек</p>
                <p>Для альфа-банка</p>
                <p>Город: Санкт-Петербург</p>
                <button onClick={props.onFilter} className={(props.needFilter ? "Filtered" : "FreeFilter") + " FilterButton"}></button>
                <button onClick={props.onReload} className={"ReloadButton"}></button>
            </div>
            <div className="Card">
                {props.timeseries && props.timeseries.map((element, i) => {     
                console.log(element);
                if ((props.needFilter && element.isLiked) || (!props.needFilter)) {            
                    return (
                        <table>
                            <tr>
                                <td>
                                    <div className="CardText">
                                        Температура воздуха: <strong>{element.temp2m}</strong>
                                        <br/> Направление ветра: <strong>{element.wind10m.direction}</strong>
                                        <br/> Вихревая мощность: <strong>{element.wind10m.speed}</strong>
                                        <br/> <button className={(element.isLiked ? "Liked" : "Usual") + " LikedButton"} onClick={props.onLike} data-mssg={i}>❤</button>
                                        <button className={"DeleteButton"} onClick={props.onDelete} data-mssg={i}>🗑</button>
                                    </div>
                                </td>
                                <td>
                                    <div className="CardImage">
                                        <img height="250em" width="250em" src={props.urls[i]} alt="Картинка загружается"/>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    )
                }
                })}
            </div>
        </div>
    )
}

function mapStateToProps(state){
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
/*
function mapDispatchToProps(dispatch){
    return {
        onUpdate: () => {
            console.log('!');
            dispatch(likeAction);
        }
    }
}
*/

export default connect(mapStateToProps, getAllData)(Card);