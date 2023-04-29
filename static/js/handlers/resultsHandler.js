import { Timer } from "../timer.js";

export function resultsHandler() {
    const timeLeft = "10:00";
    const HTMLTimeElement = document.getElementById("countdown-timer");

    const timer = new Timer(timeLeft, HTMLTimeElement);

    timer.init();
    timer.run();

    const callButton = document.getElementById("call-button");

    callButton.addEventListener("click", onClickHandler);
}

function onClickHandler(event) {
    const infoContent = document.querySelector(".test-info_content");

    fetch("https://swapi.dev/api/people/1/")
        .then((response) => response.json())
        .then((data) => {
            const needfulParameters = Object.entries(data).slice(0, 8);

            const table = document.createElement("table");
            const caption = document.createElement("caption");
            const tableHeader = document.createElement("thead");
            const tableBody = document.createElement("tbody");

            table.append(caption, tableHeader, tableBody);
            caption.innerText = "BIO";

            for (const column of ["Parameter", "Description"]) {
                const columnName = document.createElement("th");
                columnName.innerText = column;
                tableHeader.appendChild(columnName);
            }

            for (const [key, value] of needfulParameters) {
                const tableRow = document.createElement("tr");
                const name = document.createElement("td");
                const description = document.createElement("td");

                name.innerText = key.replace("_", " ");
                description.innerText = value;

                tableRow.append(name, description);
                tableBody.appendChild(tableRow);
            }

            infoContent.appendChild(table);

            event.target.removeEventListener("click", onClickHandler);
        })
        .catch((error) =>
            console.error(`Error while loading data: ${error.message}`)
        );
}
