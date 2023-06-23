import React, {
    useReducer,
    useContext,
    createContext,
} from "react";

const initialState = {
    cart: {},
};
const Context = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                // state akan disalin kemudian state akan ditambahkan item baru yang berada pada cart: state.cart
                // jika kondisi nya true maka akan ditambah item jika false atau kosong maka akan dibuat baru
                ...state,
                cart: !state.cart
                    ? { [action.item.id]: { product: action.item, qty: 1 } }
                    : !state.cart[action.item.id]
                    ? {
                          ...state.cart,
                          [action.item.id]: { product: action.item, qty: 1 },
                      }
                    : {
                          ...state.cart,
                          [action.item.id]: {
                              product: action.item,
                              qty: state.cart[action.item.id].qty + 1,
                          },
                      },
            };
        case "REMOVE_FROM_CART":
            if (state.cart[action.id].qty > 1) {
                return {
                    ...state,
                    cart: {...state.cart,
                          [action.id]: {
                              product: action.item,
                              qty: state.cart[action.id].qty - 1,
                          },}
                };
            } else if (state.cart[action.id].qty === 1) {
                return {
                    ...state,
                    cart: Object.keys(state.cart)
                    .filter((key) => +key !== +action.id)
                    .reduce((acc, key) => {
                      const item = state.cart[key];
                      acc[item.product.id] = item;
                      return acc;
                    }, {})
                        
                };
            }
            

        case "RESET_CART":
            return {
                ...state,
                cart: initialState.cart,
            };

        default: {
            throw new Error(`Unhandled action type ${action.type}`);
        }
    }
}

export function useGlobalContext() {
    const [state, dispatch] = useContext(Context);

    // kondisi ini jika sudah diclick jika salah satunya kosong maka keluar error
    if (!state || !dispatch) {
        throw new Error("useGlobalContext must be used within a Provider");
    }

    return { state, dispatch };
}

// di halaman lain yang akan digunakan adalah dispatch nya dari reducer untuk update cart
// return ini menjelaskan bahwa untuk halaman lain yang menggunakan useGlobalContext akan berada dalam Context.Provider, props nya ini akan menyesuaikan.
export default function Provider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    console.log(state);
    return <Context.Provider value={[state, dispatch]} {...props} />;
}
