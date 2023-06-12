import { useLayoutEffect } from "react";

export default function useScrollAnchor() {
    useLayoutEffect(() => {
        // mengambil elemen a yang memiliki href yang berawalan #
        const smoothScrollAnchor = document.querySelectorAll("a[href^='#']");
        for (let i = 0; i < smoothScrollAnchor.length; i++) {
            // const elemen akan menyimpan semua element a yang dipilih berupa seperti array
            const element = smoothScrollAnchor[i];

            // pada setiap element diberikan event listenner
            element.addEventListener("click", function (e) {
                // mencegah perilaku bawaan pada element a
                e.preventDefault();

                const targetId = this.getAttribute("href").replace("#", "");
                const targetElement = document.getElementById(targetId);

                targetElement
                    ? targetElement.scrollIntoView({ behavior: "smooth" })
                    : null;
            });
        }

        return () => {};
    });
}
