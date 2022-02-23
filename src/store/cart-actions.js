import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const res= await fetch('https://react-http-cb707-default-rtdb.firebaseio.com/cart.json')

            if (!res.ok) {
                throw new Error('Can not fetch data')
            }
            const data = res.json()

            return  data
        }
        
        try {
            const cartData = await fetchData()
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }))
        } catch (error ) {
            dispatch(uiActions.showNotification({
                statu: 'error',
                title: 'Error...',
                message: 'Fetch cart data failed'
            }))
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            dispatch(uiActions.showNotification({
                statu: 'pending',
                title: 'Sending...',
                message: 'Sending data'
            }))
        )

        const sendRequest = async () => {
            const res  = await fetch('https://react-http-cb707-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart)
            })
            if (!res.ok) {
                throw new Error('Sending data failed')
            }
        }
        
        try {
            await sendRequest()

            dispatch(uiActions.showNotification({
                statu: 'success',
                title: 'Success...',
                message: 'Sent cart data successfully'
            }))
        } catch(error) {
            dispatch(uiActions.showNotification({
                statu: 'error',
                title: 'Error...',
                message: 'Sent cart data failed'
            }))
        }

        
        dispatch(uiActions.showNotification({
            statu: 'success',
            title: 'Success...',
            message: 'Sent cart data successfully'
        }))
    }
}
