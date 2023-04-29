export function errorHandler(error) {
    console.log(error);
    document.querySelector(".error-message").innerText = error;
}
