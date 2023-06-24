import React from "react";
import Header from "../parts/Header";
import Hero from "../parts/homepage/Hero";
import JustArrived from "../parts/homepage/JustArrived";
import BrowseRoom from "../parts/homepage/BrowseRoom";
import Clients from "../parts/Clients";
import Sitemap from "../parts/Sitemap";
import Footer from "../parts/Footer";
import Document from "../parts/Document";

export default function HomePage() {
    

    return (
        <Document>
            <Header position="absolute" />
            <Hero />
            <BrowseRoom />
            <JustArrived />
            <Clients />
            <Sitemap />
            <Footer />
        </Document>
    );
}
