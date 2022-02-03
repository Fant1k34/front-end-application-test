function Card({parentToChild}) {
    function handleDeleteButton(event) {
        return parentToChild.props.onDelete(event.target.dataset.mssg);
    }

    function handleLikeButton(event) {
        return parentToChild.props.onLike(event.target.dataset.mssg);
    }

    return (
            <div className="FullCard" role="card">
                <div className="FirstColumn">
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
                <div className="SecondColumn">
                    <img
                        height="250em"
                        src={parentToChild.props.urls[parentToChild.i]}
                        alt="Картинка загружается"
                        role="image"
                    />
                </div>
            </div>
    );
}


export default Card;