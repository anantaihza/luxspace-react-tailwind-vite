import React from "react";

import { Link } from "react-router-dom";
import { useGlobalContext } from "../../helpers/hooks/useGlobalContext";

export default function ShoppingCart() {
    const { state, dispatch } = useGlobalContext();
    // console.log("shopping cart", Object.keys(state.cart));
    const cart = Object.keys(state.cart);
    return (
        <div className="w-full px-4 mb-4 md:w-8/12 md:mb-0" id="shopping-cart">
            <div className="flex flex-start mb-4 mt-8 pb-3 border-b border-gray-200 md:border-b-0">
                <h3 className="text-2xl">Shopping Cart</h3>
            </div>

            <div className="border-b border-gray-200 mb-4 hidden md:block">
                <div className="flex flex-start items-center pb-2 -mx-4">
                    <div className="px-4 flex-none">
                        <div className="" style={{ width: 90 }}>
                            <h6>Photo</h6>
                        </div>
                    </div>
                    <div className="px-4 w-4/12">
                        <div className="">
                            <h6>Product</h6>
                        </div>
                    </div>
                    <div className="px-4 w-4/12">
                        <div className="">
                            <h6>Price</h6>
                        </div>
                    </div>
                    <div className="px-4 w-3/12">
                        <div className="text-center">
                            <h6>Qty</h6>
                        </div>
                    </div>
                    <div className="px-4 w-2/12">
                        <div className="text-center">
                            <h6>Action</h6>
                        </div>
                    </div>
                </div>
            </div>

            {cart.length === 0 ? (
                <p id="cart-empty" className="text-center py-8">
                    Ooops... Cart is empty{" "}
                    <Link to="/" className="underline">
                        Shop Now
                    </Link>
                </p>
            ) : (
                cart.map((key) => {
                    const item = state.cart[key];
                    return (
                        <div
                            className="flex flex-start flex-wrap items-center mb-4 -mx-4"
                            key={key}
                        >
                            <div className="px-4 flex-none">
                                <div
                                    className=""
                                    style={{ width: 90, height: 90 }}
                                >
                                    <img
                                        src={item.product.imgUrls[0]}
                                        alt={item.product.title}
                                        className="object-cover rounded-xl w-full h-full"
                                    />
                                </div>
                            </div>

                            <div className="px-4 w-auto flex-1 md:w-4/12">
                                <div className="">
                                    <h6 className="font-semibold text-lg md:text-xl leading-8">
                                        {item.product.title}
                                    </h6>
                                    <span className="text-sm md:text-lg">
                                        {item.product.category.title}
                                    </span>
                                    <h6 className="font-semibold text-base md:text-lg block md:hidden">
                                        IDR {item.product.price * item.qty}
                                    </h6>
                                </div>
                            </div>
                            <div className="px-4 w-auto flex-none md:flex-1 md:w-4/12 hidden md:block">
                                <div className="">
                                    <h6 className="font-semibold text-lg">
                                        IDR {item.product.price * item.qty}
                                    </h6>
                                </div>
                            </div>
                            <div className="px-4 w-2/12">
                                <div className="text-center">
                                    <h6 className="font-semibold text-lg">
                                        {item.qty}
                                    </h6>
                                </div>
                            </div>
                            <div className="px-4 w-2/12">
                                <div className="text-center">
                                    <button
                                        onClick={() =>
                                            dispatch({
                                                type: "REMOVE_FROM_CART",
                                                id: item.product.id,
                                                item: item.product
                                            })
                                        }
                                        className="text-red-600 border-none focus:outline-none px-3 py-1"
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
