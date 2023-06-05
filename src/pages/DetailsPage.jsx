import React from "react";
import Header from "../parts/Header";
import Breadcrumb from "../components/Breadcrumb";
import Sitemap from "../parts/Sitemap";
import Footer from "../parts/Footer";
import ProductDetails from "../parts/details/ProductDetails";
import Suggestion from "../parts/details/Suggestion";

export default function DetailPage() {
    return (
        <>
            <Header theme={"black"} />

            <Breadcrumb
                list={[
                    { url: "/", name: "Home" },
                    { url: "/categories/09283", name: "Office Room" },
                    { url: "/categories/09283/products/7888", name: "Details" },
                ]}
            />
            < ProductDetails />
            < Suggestion />
            <Sitemap />
            <Footer />
        </>
    );
}
