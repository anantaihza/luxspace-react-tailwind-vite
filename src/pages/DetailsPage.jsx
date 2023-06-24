import React, { useEffect } from "react";
import Header from "../parts/Header";
import Breadcrumb from "../components/Breadcrumb";
import Sitemap from "../parts/Sitemap";
import Footer from "../parts/Footer";
import ProductDetails from "../parts/details/ProductDetails";
import Suggestion from "../parts/details/Suggestion";

import { useParams } from "react-router-dom";
import useAsync from "../helpers/hooks/useAsync";
import fetchData from "../helpers/fetch";

import SkeletonProductDetails from "../parts/details/skeleton/SkeletonProductDetails";
import SkeletonSuggestion from "../parts/details/skeleton/SkeletonSuggestion";

import Document from "../parts/Document";
import Message from "../components/Message";
import "../helpers/format/currency"

export default function DetailPage() {
    const { idp } = useParams();

    const { data, error, run, isLoading, isError } = useAsync();

    useEffect(() => {
        run(fetchData({ url: `/api/products/${idp}` }));
    }, [run, idp]);

    return (
        <Document>
            <Header theme={"black"} />

            <Breadcrumb
                list={[
                    { url: "/", name: "Home" },
                    { url: "/categories/09283", name: "Office Room" },
                    { url: "/categories/09283/products/7888", name: "Details" },
                ]}
            />

            {isError ? (
                <Message
                    info={{
                        title: "404 NOT FOUND",
                        desc: error.errors.message,
                        img: "",
                        altImg: "",
                    }}
                />
            ) : (
                <>
                    {isLoading ? (
                        <SkeletonProductDetails />
                    ) : (
                        <ProductDetails data={data} />
                    )}

                    {isLoading ? (
                        <SkeletonSuggestion />
                    ) : (
                        <Suggestion data={data?.relatedProducts || {}} />
                    )}
                </>
            )}

            <Sitemap />
            <Footer />
        </Document>
    );
}
