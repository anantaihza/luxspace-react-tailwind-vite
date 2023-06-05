import React from "react";
import Header from "../parts/Header";
import Sitemap from "../parts/Sitemap";
import Footer from "../parts/Footer";
import Message from "../components/Message";

export default function NotFound() {
    return (
        <>
            <Header theme={"black"} />
            <Message
                info={{
                    title: "404 NOT FOUND",
                    desc: "Looks like this page not found",
                    img: "",
                    altImg: ""
                }}
            />

            <Sitemap />
            <Footer />
        </>
    );
}
