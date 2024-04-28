export const InitialState = {
    cart: [],
};

const reducer = (state, action) => {
    // console.log(action);

    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, action.item]
            };

        case "DELETE":
            // console.log('action-id',action.id);
            const index = state.cart.findIndex(cartItem => cartItem.id === action.item.id);
            // console.log('action-item',action.item);
            let newBasket = [...state.cart];
            if (index !== -1) {
                newBasket.splice(index, 1);
            } else {
                console.warn(`can't remove product(id: ${action.item.id}) as it's not in basket`);
            }
            return {
                ...state,
                cart: newBasket
            };
        default:
            return state;
    }
};

export default reducer;
