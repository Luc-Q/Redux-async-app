import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice'
import Notification from '../src/components/UI/Notification'
import { sendCartData } from './store/cart-actions'

let isInitial = true

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisble)
  const cart = useSelector((state) => state.cart)
  const notification = useSelector((state) => state.ui.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    // const sendCartData = async () => {
      // dispatch(uiActions.showNotification({
      //   statu: 'pending',
      //   title: 'Sending...',
      //   message: 'Sending data'
      // }))
      // const res  = await fetch('https://react-http-cb707-default-rtdb.firebaseio.com/cart.json', {
      //   method: 'PUT',
      //   body: JSON.stringify(cart)
      // })
      // if (!res.ok) {
      //   throw new Error('Sending data failed')
      // }

    //   dispatch(uiActions.showNotification({
    //     statu: 'success',
    //     title: 'Success...',
    //     message: 'Sent cart data successfully'
    //   }))
    // }

    if (isInitial) {
      isInitial = false
      return
    }

    dispatch(sendCartData(cart))
    // sendCartData().catch((error) => {
    //   dispatch(uiActions.showNotification({
    //     statu: 'error',
    //     title: 'Error...',
    //     message: 'Sent cart data failed'
    //   }))
    // })
  }, [cart, dispatch])

  return (
    <React.Fragment>
      {notification && <Notification status={notification.status}  title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
