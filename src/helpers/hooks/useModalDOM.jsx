import { useLayoutEffect } from "react";
import { addClass } from "../format/classNameModifier";

export default function useModalDOM() {
    useLayoutEffect(() => {
        const openModal = (element) => {
            // const { createElement } = document;

            const modalWrapper = document.createElement("div");
            const modalOverlay = document.createElement("div");
            const modalContent = document.createElement("div");

            modalOverlay.addEventListener("click", function () {
                modalWrapper.remove();
            });

            addClass(
                modalWrapper,
                "fixed inset-0 z-40 flex items-center justify-center w-100 min-h-screen"
            );
            addClass(modalOverlay, "fixed inset-0 bg-black opacity-35");
            addClass(modalContent, "bg-white p-0 md:p-6 z-10");

            modalContent.innerHTML =
                element.target.attributes?.["data-content"].value;

            modalWrapper.append(modalOverlay, modalContent);

            document.body.append(modalWrapper);
        };

        const modalTriggers = document.getElementsByClassName("modal-trigger");

        for (let i = 0; i < modalTriggers.length; i++) {
            const element = modalTriggers[i];
            element.addEventListener("click", openModal);
        }

        return () => {
            for (let idx = 0; idx < modalTriggers.length; idx++) {
                const element = modalTriggers[idx];
                element.removeEventListener("click", openModal);
            }
        };
    });
}
