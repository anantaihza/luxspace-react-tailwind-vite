import React, { useReducer, useContext, createContext } from "react";

const initialState = {
  cart: {},
};
const Context = createContext();


function reducer(state, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            console.log(action);
            return {
              // state akan disalin kemudian state akan ditambahkan item baru yang berada pada cart: state.cart
              // jika kondisi nya true maka akan ditambah item jika false atau kosong maka akan dibuat baru
                ...state,
                cart: state.cart
                    ? { ...state.cart, [action.item.id]: action.item }
                    : { [action.item.id]: action.item },
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
