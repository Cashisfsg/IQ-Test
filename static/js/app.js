import { Router } from "./router.js";
import { Route } from "./route.js";

import { resultsHandler } from "./handlers/resultsHandler.js";
import { aboutHandler } from "./handlers/aboutHandler.js";
import { testHandler } from "./handlers/testHandler.js";
import { processingDataHandler } from "./handlers/processingDataHandler.js";
import { errorHandler } from "./handlers/errorHandler.js";

const router = new Router([
    new Route("/", "../../routes/home.html", "Home", "description", () => {
        console.log("Load successful");
    }),
    new Route(
        "/about",
        "../../routes/home.html",
        "Home",
        "description",
        aboutHandler
    ),
    new Route(
        "/test",
        "../../routes/test.html",
        "Test",
        "description",
        testHandler
    ),
    new Route(
        "/processing",
        "../../routes/processing.html",
        "Processing",
        "description",
        processingDataHandler
    ),
    new Route(
        "/results",
        "../../routes/results.html",
        "Test",
        "description",
        resultsHandler
    ),
    new Route(
        "/404",
        "../../routes/404.html",
        "Error",
        "description",
        errorHandler
    ),
]);

router.init();

const burgerMenu = document.querySelector(".burger-menu");
const burgerMenuButton = document.querySelector(".burger-menu_button");
const burgerMenuCloseButton = document.querySelector(
    ".burger-menu_close-button"
);

burgerMenuButton.addEventListener("click", () => {
    if (burgerMenu.hasAttribute("open")) {
        burgerMenu.close();
    } else {
        burgerMenu.show();
    }
});

burgerMenuCloseButton.addEventListener("click", () => {
    burgerMenu.close();
});

document.addEventListener("click", (event) => {
    const { target } = event;
    const isNotTestButtonPressed =
        !target.matches("button") ||
        target.closest("form") ||
        (!target.classList.contains("button-primary") &&
            !target.classList.contains("button-outlined"));

    if (isNotTestButtonPressed) return;

    router.renderPage("/test");
});

export { router };
