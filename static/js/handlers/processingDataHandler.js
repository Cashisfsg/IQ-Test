import { router } from "../app.js";

export function processingDataHandler() {
    const text = document.querySelector(".processing-data_dynamic-text");

    const interval = setInterval(() => {
        text.append(".");
    }, 100);
    const timeout = setTimeout(() => {
        clearInterval(interval);
        clearTimeout(timeout);

        sessionStorage.removeItem("answers");
        sessionStorage.removeItem("startTime");

        router.renderPage("/results");
    }, 3000);
}
