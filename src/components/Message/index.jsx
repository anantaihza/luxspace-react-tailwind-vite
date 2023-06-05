import React from "react";
import { Link } from 'react-router-dom'



export default function Message({ info }) {
    const imageCheck = (info) => {
        if (info.img != "") {
            return (
                <img src={info.img} alt={info.altImg} />
            )
        }
    }
    return (
        <section className="mt-24">
            <div className="container mx-auto min-h-screen">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full md:w-4/12 text-center">
                        {imageCheck(info)}
                        <h2 className="text-3xl font-semibold mb-6">
                            {info.title}
                        </h2>
                        <p className="text-lg mb-12">
                            {info.desc}
                        </p>
                        <Link
                            to="/"
                            className="text-gray-900 bg-red-200 focus:outline-none w-full py-3 rounded-full text-lg focus:text-black transition-all duration-200 px-8 cursor-pointer"
                        >
                            Back to Shop
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
