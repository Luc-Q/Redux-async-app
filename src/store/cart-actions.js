import { uiActions } from "./ui-slice";

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
