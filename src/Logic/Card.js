import {connect} from "react-redux";
import getAllData from "../Logic/Fething"

function Card(props) {
    console.log(props);
    return (
        <div className="Cards">
            <div className="Card">
                {props.timeseries && props.timeseries.map((element, i) => {     
                console.log(element);                    
                return (<p key={element.timepoint}>{element.timepoint}</p>)
                })}
            </div>

            <div className="Card">
                <p>Имя: {props.name}</p>
                <p>Версия: {props.version}</p>
                <p>Описание: {props.description}</p>
                <p>Картинка: ...</p>
                <button onClick={props.onLike}>Like {props.like}</button>
                <button onClick={props.onReload}>Reload</button>
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
        timeseries: state.timeseries
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