"use strict";

export class Router {
    constructor(routes, appHTMLElement) {
        this.routes = routes;
        this.appElement = appHTMLElement || document.getElementById("app");
    }

    init() {
        document.addEventListener("click", (event) => {
            const { target } = event;

            if (!target.matches("nav a")) return;

            document.querySelector(".burger-menu").close();

            this.handleRouteChange(event);
        });

        this.renderPage("/");
    }

    handleRouteChange(event) {
        event = event || window.event;
        event.preventDefault();

        const link = event.target;
        const path = link.getAttribute("href");

        this.renderPage(path);
    }

    async renderPage(path) {
        if (
            this.getCurrentRoute().path === path &&
            this.getCurrentRoute().path !== "/404"
        ) {
            return;
        }

        try {
            const route = this.routes.find((route) => route.path === path);

            if (!route) {
                throw new Error("No such route: " + path);
            }

            const pageContent = await route.fetchPage();

            this.cleanAppComponent();
            this.appElement.innerHTML = pageContent;
            this.setCurrentRoute(path);

            window.history.pushState(null, null, path);
            route.routeHandler();
        } catch (error) {
            console.warn(error.message);
            this.setCurrentRoute("/404");

            const pageContent = await this.getCurrentRoute().fetchPage();
            this.cleanAppComponent();
            this.appElement.innerHTML = pageContent;
            this.setCurrentRoute("/404");

            window.history.pushState(null, null, "/404");
            this.getCurrentRoute().routeHandler(error.message);
        }
    }

    setCurrentRoute(path) {
        this.currentRoute = this.routes.find((route) => route.path === path);
    }

    getCurrentRoute() {
        return this.currentRoute || "";
    }

    cleanAppComponent() {
        while (this.appElement.firstChild) {
            this.appElement.removeChild(this.appElement.firstChild);
        }
    }
}
