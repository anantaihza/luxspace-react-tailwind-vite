import React from "react";

export default function SkeletonJustArrived() {
    return Array(6)
        .fill()
        .map((_, index) => {
            return (
                <div className="px-4 relative card group" key={index}>
                    <div
                        className="rounded-xl bg-gray-300 overflow-hidden card-shadow relative"
                        style={{ width: 287, height: 386 }}
                    ></div>
                    <div className="w-24 h-3 bg-gray-300 mt-3 rounded-full"></div>
                    <div className="w-36 h-3 bg-gray-300 mt-2 rounded-full"></div>
                </div>
            );
        });
}
