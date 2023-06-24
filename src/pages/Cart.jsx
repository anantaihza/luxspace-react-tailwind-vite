import React from "react";
import Header from "../parts/Header";
import Breadcrumb from "../components/Breadcrumb";
import Sitemap from "../parts/Sitemap";
import Footer from "../parts/Footer";
import CartDetails from "../parts/cart/CartDetails";
import Document from "../parts/Document";

export default function Cart() {
    return (
        <Document>
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
        </Document>
    );
}
