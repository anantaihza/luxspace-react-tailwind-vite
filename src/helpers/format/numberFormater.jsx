import React from "react";

function separator(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function numberFormater({ number }) {
    const numberSeparator = separator(number);

    return <span>{numberSeparator}</span>;
}
