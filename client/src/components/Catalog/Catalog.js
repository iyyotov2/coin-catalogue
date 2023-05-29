import CatalogItem from "./CatalogItem/CatalogItem";

const Catalog = ({
    coins
}) => {
    return (
        <>
            <header id="head" className="secondary" />
            <div className="jumbotron">
                <div className="container container-catalog">
                    {coins.length > 0
                        ? <>
                            <h3 className="text-center thin">All Coins</h3>
                            <div className="row">
                                {coins.map(x => <CatalogItem key={x._id} coin={x} />)}
                            </div>
                        </>
                        : <h3 className="text-center thin">No coins uploaded yet</h3>
                    }
                </div>
            </div>
        </>
    );
}

export default Catalog;