function Card({parentToChild}) {
    function handleDeleteButton(event) {
        return parentToChild.props.onDelete(event.target.dataset.mssg);
    }

    function handleLikeButton(event) {
        return parentToChild.props.onLike(event.target.dataset.mssg);
    }

    return (
            <table>
                <tr>
                <td>
                    <div className="CardText">
                    Температура воздуха: {" "} <strong>{parentToChild.element.temp2m}</strong>
                    <br /> Направление ветра: {" "}
                    <strong>{parentToChild.element.wind10m.direction}</strong>
                    <br /> Вихревая мощность: {" "}
                    <strong>{parentToChild.element.wind10m.speed}</strong>
                    <br />
                    <button
                        className={
                        (parentToChild.element.isLiked ? "Liked" : "Usual") +
                        " LikedButton"
                        }
                        onClick={handleLikeButton}
                        data-mssg={parentToChild.i}
                    >
                        ❤
                    </button>
                    <button
                        className={"DeleteButton"}
                        onClick={handleDeleteButton}
                        data-mssg={parentToChild.i}
                    >
                        🗑
                    </button>
                    </div>
                </td>
                <td>
                    <div className="CardImage">
                    <img
                        height="250em"
                        width="250em"
                        src={parentToChild.props.urls[parentToChild.i]}
                        alt="Картинка загружается"
                    />
                    </div>
                </td>
                </tr>
            </table>
    );
}


export default Card;