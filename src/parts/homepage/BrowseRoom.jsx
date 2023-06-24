import React, { useEffect } from "react";
import useAsync from "../../helpers/hooks/useAsync";
import fetchData from "../../helpers/fetch";
import SkeletonBrowseRoom from "../homepage/skeleton/SkeletonBrowseRoom";
import NumberFormater from "../../helpers/format/numberFormater";

export default function BrowseRoom() {
    const { data, run, isLoading } = useAsync();

    useEffect(() => {
        run(fetchData({ url: "/api/categories/?page=1&limit=4" }));
    }, [run]);

    
    const ratioClassNames = {
        wrapper: {
            default: {
                "1/9": "col-span-9 row-span-1",
            },
            md: {
                "1/4": "md:col-span-4 md:row-span-1",
                "2/2": "md:col-span-2 md:row-span-2",
                "2/3": "md:col-span-3 md:row-span-2",
            },
        },
        meta: {
            "1/9": "left-0 top-0 bottom-0 flex justify-center flex-col pl-48 md:pl-72",
            "1/4": "left-0 top-0 bottom-0 flex justify-center flex-col pl-48 md:pl-72",
            "2/2": "inset-0 md:bottom-auto flex justify-center md:items-center flex-col pl-48 md:pl-0 pt-0 md:pt-12",
            "2/3": "inset-0 md:bottom-auto flex justify-center md:items-center flex-col pl-48 md:pl-0 pt-0 md:pt-12",
        },
    };

    return (
        <section className="flex bg-gray-100 py-16 px-4" id="browse-the-room">
            <div className="container mx-auto">
                <div className="flex flex-start mb-4">
                    <h3 className="text-2xl capitalize font-semibold">
                        browse the room <br className="" />
                        that we designed for you
                    </h3>
                </div>
                <div className="grid grid-rows-2 grid-cols-9 gap-4">
                    {isLoading ? (
                        <SkeletonBrowseRoom ratio={ratioClassNames} />
                    ) : (
                        data.data.map((room, index) => {
                            return (
                                <div
                                    key={room.id}
                                    className={`relative card ${
                                        ratioClassNames?.wrapper.default?.[
                                            room.ratio.default
                                        ]
                                    } ${
                                        ratioClassNames?.wrapper.md?.[
                                            room.ratio.md
                                        ]
                                    }`}
                                    style={{
                                        height: index === 0 ? 180 : "auto",
                                    }}
                                >
                                    <div className="card-shadow rounded-xl">
                                        <img
                                            src={`images/content/${room.imageUrl}`}
                                            alt={room.title}
                                            className="w-full h-full object-cover object-center overlay overflow-hidden rounded-xl"
                                        />
                                    </div>
                                    <div
                                        className={`overlay ${
                                            ratioClassNames?.meta?.[
                                                room.ratio.md
                                            ]
                                        }`}
                                    >
                                        <h5 className="text-lg font-semibold">
                                            {room.title}
                                        </h5>
                                        <span className="">
                                            <NumberFormater number={room.products} /> item
                                            {room.products > 1 ? "s" : ""}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
}
