import { router } from "../app.js";

import { questionsIterator } from "../questionsIterator.js";
import { questionCreator } from "../questionCreator.js";

import { QUESTIONS } from "../data/questions.js";

export function testHandler() {
    const iterator = questionsIterator(QUESTIONS);
    let currentQuestion = iterator.next();
    let questionsCounter = 1;
    const answers = [];

    const form = document.querySelector("form");
    const submitButton = form.querySelector("button[type='submit']");

    onProgressChange(questionsCounter);
    form.append(...questionCreator(currentQuestion));

    form.addEventListener("change", () => {
        if (form.checkValidity()) {
            submitButton.removeAttribute("disabled");
        } else {
            submitButton.setAttribute("disabled", true);
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        saveProgress(event.target, currentQuestion, answers);
        clearForm(form, currentQuestion);

        currentQuestion = iterator.next();

        if (!currentQuestion.done) {
            onProgressChange(++questionsCounter);

            form.append(...questionCreator(currentQuestion));

            submitButton.setAttribute("disabled", true);
        } else {
            router.renderPage("/processing");
        }
    });
}

function clearForm(form, question) {
    form.removeChild(form.querySelector("h2"));
    form.removeChild(form.querySelector("fieldset"));

    if (question.value.type.includes("image")) {
        form.removeChild(form.querySelector("img"));
    }
}

function onProgressChange(newValue) {
    const progress = document.querySelector("progress");

    progress.setAttribute("value", newValue);
    progress.innerText = newValue;

    if (!progress.hasAttribute("max")) {
        progress.setAttribute("max", QUESTIONS.length);
    }
}

function saveProgress(formData, question, answers) {
    const name = question.value.name;
    const value = new FormData(formData).get(question.value.name);

    answers.push({ name, value });

    sessionStorage.setItem("answers", JSON.stringify(answers));
}
