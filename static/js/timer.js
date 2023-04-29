export class Timer {
    constructor(timeLeft, HTMLTimeElement) {
        const regex = new RegExp(
            /^(?:[0-9]|[0-5][0-9]):(?:[0-9]|[0-5][0-9])$/,
            "gm"
        );

        if (!regex.test(timeLeft)) {
            throw new Error("Invalid time format");
        }

        this.HTMLTimeElement = HTMLTimeElement;
        this.timeLeft = timeLeft;
    }

    init() {
        // this.renderComponent(this.timeLeft);

        const timeArray = this.timeLeft.split(":");
        const minutes = parseInt(timeArray[0]);
        const seconds = parseInt(timeArray[1]);

        this.totalSeconds = minutes * 60 + seconds;

        const response = sessionStorage.getItem("startTime");

        if (response !== null) {
            const { timestamp, expirationTime } = JSON.parse(response);
            const currentTime = new Date();

            if (currentTime - timestamp > expirationTime) {
                sessionStorage.removeItem("startTime");

                this.startTime = currentTime.getTime();

                sessionStorage.setItem(
                    "startTime",
                    JSON.stringify({
                        timestamp: this.startTime,
                        expirationTime: this.totalSeconds * 1000,
                    })
                );
            } else {
                this.startTime = timestamp;
            }
        } else {
            const currentTime = new Date();
            this.startTime = currentTime.getTime();

            sessionStorage.setItem(
                "startTime",
                JSON.stringify({
                    timestamp: this.startTime,
                    expirationTime: this.totalSeconds * 1000,
                })
            );
        }
    }

    run() {
        let countdown = setInterval(() => {
            const currentTime = new Date();
            const secondsSinceStart = Math.floor(
                (currentTime.getTime() - this.startTime) / 1000
            );

            if (secondsSinceStart >= this.totalSeconds) {
                clearInterval(countdown);
            }

            const minutes = Math.floor(
                (this.totalSeconds - secondsSinceStart) / 60
            )
                .toString()
                .padStart(2, "0");
            const seconds = ((this.totalSeconds - secondsSinceStart) % 60)
                .toString()
                .padStart(2, "0");

            this.renderComponent(minutes + ":" + seconds);
        }, 1000);
    }

    renderComponent(time) {
        this.HTMLTimeElement.setAttribute("datetime", time.padStart(8, "00:"));
        this.HTMLTimeElement.innerText = time;
    }
}
