"use strict";

export class Route {
    constructor(
        path,
        template,
        title = "ABC mobile",
        description = "IQ Test",
        onLoadHandler = () => {}
    ) {
        this.path = path;
        this.template = template;
        this.title = title;
        this.description = description;
        this.onLoadHandler = onLoadHandler;
    }

    async fetchPage() {
        try {
            const response = await fetch(this.template);

            if (!response.ok)
                throw new Error("Error while loading page: " + response.status);

            return await response.text();
        } catch (error) {
            console.warn(
                `An error occurred while processing data: ${error.message}`
            );
            throw new Error(error);
        }
    }

    setPageTitle() {
        document.querySelector("title").innerText = this.title;
    }

    setPageDescription() {
        document
            .querySelector('meta[name="description"]')
            .setAttribute("content", this.description);
    }

    routeHandler(...args) {
        this.setPageTitle();
        this.setPageDescription();
        this.onLoadHandler(...args);
    }
}
