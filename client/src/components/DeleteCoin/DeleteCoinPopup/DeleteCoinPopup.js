import { Link } from "react-router-dom";

const DeleteCoinPopup = (props) => {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h3 style={{'marginTop': 0}}>Do you want to delete this record</h3>
                <div>
                    <button className="btn btn-success close-btn" onClick={() => props.setTrigger(false)}>Cancel</button> <Link className="btn btn-danger close-btn" to={`/catalog/${props.coinId}/delete`}>Delete</Link>
                </div>
                { props.children }
            </div>
        </div>
    ) : '';
}

export default DeleteCoinPopup;