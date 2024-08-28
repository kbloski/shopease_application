import { webTokenController } from "../../../middlewares/WebTokenController.js";

export function addToCard(event,){
    event.preventDefault();
    
    const form = event.target;
    
    const productId = form.querySelector('input[name="productId"]').value;
    const quantity = form.querySelector('input[name="quantity"]').value;
    

    const token = webTokenController.getToken();
    fetch( 
        'http://localhost:3010/api/order/item/add',
        {
            method: 'POST',
            headers: {
                'authorization' : `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                productId: productId,
                quantity: quantity 
            })
        }
    )
    .then( response => {
        if ( !response.ok) throw new Error('Error order add')
        return response.json()
    })
    .then(
        data => {
            console.log( data );
        }
    )
    .catch( err => console.error(err) );

}