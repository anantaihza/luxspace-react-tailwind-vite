import React from "react";
import ShoppingCart from "./ShoppingCart";
import ShippingDetails from "./ShippingDetails";


export default function CartDetails() {
    return (
        <section className="md:py-16">
            <div className="container mx-auto px-4">
                <div className="flex -mx-4 flex-wrap">
                    <ShoppingCart />
                    <ShippingDetails/>
                </div>
            </div>
        </section>
    );
}
