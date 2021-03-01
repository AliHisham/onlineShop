const RemoveFromCart =(id)=>(dispatch , getState)=>{
    dispatch({
       type:'REMOVE_FROM_CART',
       payload:id
    })
    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))
 }
 export default RemoveFromCart