export function questionCreator(nextQuestion) {
    const questionHTMLElement = document.createElement("h2");
    const answersContainer = document.createElement("fieldset");

    questionHTMLElement.innerText = nextQuestion.value.question;

    for (let answer of nextQuestion.value.answers) {
        const label = document.createElement("label");
        if (nextQuestion.value.type === "color") {
            label.style.backgroundColor = answer;
        }

        const answerHTMLElement = document.createElement("input");
        answerHTMLElement.setAttribute("type", "radio");
        answerHTMLElement.setAttribute("name", nextQuestion.value.name);
        answerHTMLElement.setAttribute("value", answer);
        answerHTMLElement.setAttribute("required", "");

        label.appendChild(answerHTMLElement);

        if (nextQuestion.value.type !== "color") {
            const text = document.createElement("span");
            text.innerText = answer;

            label.append(text);
        }

        answersContainer.appendChild(label);
    }

    switch (nextQuestion.value.type) {
        case "text":
            answersContainer.classList.add("row-selector");
            break;
        case "color":
            answersContainer.classList.add("color-selector", "outlined");
            break;
        case "image-button":
            answersContainer.classList.add("cell-selector", "outlined");
            break;
        case "image-text":
            answersContainer.classList.add("row-selector");
            break;
        default:
            break;
    }

    if (nextQuestion.value.type.includes("image")) {
        const questionImage = document.createElement("img");
        questionImage.src = nextQuestion.value.url;
        questionImage.alt = nextQuestion.value.question;

        return [questionHTMLElement, questionImage, answersContainer];
    }

    return [questionHTMLElement, answersContainer];
}
