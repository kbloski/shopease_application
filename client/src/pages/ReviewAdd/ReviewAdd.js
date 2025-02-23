import { useParams } from "react-router-dom";
import { useState } from "react";
import { submitReviewAdd } from "./helpers/submitAddReview";
import handleInputChange from "../../utils/formHandlers";

export default function ReviewAdd(props) 
{
    const productId = useParams().id;
    const [rating, setRating] = useState(5);
    const [description, setDescription] = useState('');

    
    return (
        <div className="container p-2">
            <div className="msg">

            </div>
            <form onSubmit={ event => submitReviewAdd(
                event, 
                {
                    rating: rating, 
                    description: description
                },
                productId
            )}>
                <label htmlFor="ratingControl">Rating</label>
                <input className="form-control" type="number" name="rating" id='ratingControl'  min='0' max='5' required onChange={event => handleInputChange(event, setRating)}/>
                <label htmlFor='textareaControl' className="form-label">Description</label>
                <textarea className="form-control" id="textareaControl" name="description" rows="1" cols="50" onChange={event => handleInputChange(event, setDescription)}></textarea>
                <button className="btn btn-primary" type="submit">Add</button>
            </form>  
        </div>
    );
}