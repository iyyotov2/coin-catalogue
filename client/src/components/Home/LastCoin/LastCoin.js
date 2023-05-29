const LastCoin = ({
    coin
}) => {
    return (
        <div className="col-md-4 col-sm-6 highlight">
            <img className="item" src={coin.imageUrl} alt="" />
            <div className="h-caption"><h4>{coin.value} {coin.title}</h4></div>
            <div className="h-body text-center">
                <p>Country: {coin.country}</p>
            </div>
        </div>
    );
}

export default LastCoin;