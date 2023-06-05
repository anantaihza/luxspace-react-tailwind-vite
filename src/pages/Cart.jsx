import React from "react";
import Header from "../parts/Header";
import Breadcrumb from "../components/Breadcrumb";
import Sitemap from "../parts/Sitemap";
import Footer from "../parts/Footer";
import CartDetails from "../parts/cart/CartDetails";

export default function Cart() {
    return (
        <>
            <Header theme={"black"} />

            <Breadcrumb
                list={[
                    { url: "/", name: "Home" },
                    { url: "/cart", name: "Shopping Cart" },
                ]}
            />
            <CartDetails />

            <Sitemap />
            <Footer />
        </>
    );
}
