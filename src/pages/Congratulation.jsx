import React from "react";
import Header from "../parts/Header";
import Breadcrumb from "../components/Breadcrumb";
import Sitemap from "../parts/Sitemap";
import Footer from "../parts/Footer";
import Message from "../components/Message";

export default function Congratulation() {
    return (
        <>
            <Header theme={"black"} />

            <Breadcrumb
                list={[
                    { url: "/", name: "Home" },
                    { url: "/congratulation", name: "Success Checkout" },
                ]}
            />
            <Message
                info={{
                    title: "Ah yes it’s success!",
                    desc: "Furniture yang anda beli akan kami kirimkan saat ini juga so now please sit tight and be ready for it",
                    img: "/images/content/illustration-success.png",
                    altImg: "congrats illustration"
                }}
            />

            <Sitemap />
            <Footer />
        </>
    );
}
