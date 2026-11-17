
const question = document.getElementById("question");
const love = document.getElementById("love");
const horror = document.getElementById("horror");
const errorPage = document.getElementById("error");
const answerInput = document.getElementById("answer");
const message = document.getElementById("message");

function showScreen(screen) {
    question.classList.add("hidden");
    love.classList.add("hidden");
    horror.classList.add("hidden");
    errorPage.classList.add("hidden");

    screen.classList.remove("hidden");
}

function checkAnswer() {
    const answer = answerInput.value.trim().toLowerCase();

    if (!answer) {
        message.textContent = "Isi jawapan dulu...";
        return;
    }

    const noWords = [
        "tak", "tidak", "x", "no", "nope",
        "taknak", "tak nak", "never", "nggak",
        "gak", "ndak", "bukan"
    ];

    const yesWords = [
        "ya", "yes", "yup", "yess", "mestilah",
        "sayang", "sayangg", "tentulah",
        "of course", "sure", "mesti", "nak"
    ];

    // Check negative phrases first to avoid false YES.
    const negativePhrases = [
        "tak sayang", "tidak sayang",
        "x sayang", "no sayang", "tak cinta"
    ];

    if (negativePhrases.some(word => answer.includes(word)) ||
        noWords.includes(answer)) {
        startHorror();
        return;
    }

    if (yesWords.includes(answer)) {
        showScreen(love);
        document.body.classList.remove("horror-mode");
        return;
    }

    message.textContent = "Jawapan tak faham. Cuba lagi.";
}

answerInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") checkAnswer();
});

// Floating hearts
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "♥";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (12 + Math.random() * 25) + "px";
    heart.style.animationDuration = (4 + Math.random() * 5) + "s";

    document.getElementById("hearts").appendChild(heart);

    setTimeout(() => heart.remove(), 9000);
}

setInterval(createHeart, 450);

function startHorror() {
    document.body.classList.add("horror-mode");
    showScreen(horror);

    const terminal = document.getElementById("terminal");
    const finalMessage = document.getElementById("finalMessage");
    const scaryText = document.getElementById("scaryText");

    terminal.innerHTML = "";
    finalMessage.textContent = "";

    const lines = [
        "[SYSTEM] Initializing connection...",
        "[SYSTEM] Searching...",
        "[ACCESS] Connection established.",
        "[SEARCH] MENCARI RUMAH KAU...",
        "[SCAN] Searching fictional coordinates...",
        "[WARNING] UNKNOWN SIGNAL DETECTED",
        "[SYSTEM] Process completed."
    ];

    let i = 0;

    function addLine() {
        if (i < lines.length) {
            const line = document.createElement("div");
            line.className = "terminal-line";
            line.textContent = lines[i];
            terminal.appendChild(line);
            i++;
            setTimeout(addLine, 850);
        } else {
            setTimeout(() => {
                scaryText.style.display = "none";
                terminal.style.display = "none";
                finalMessage.textContent = "sayang... dah jumpa";

                setTimeout(() => {
                    horror.classList.add("hidden");
                    errorPage.classList.remove("hidden");
                    document.body.classList.remove("horror-mode");
                }, 2500);
            }, 1000);
        }
    }

    addLine();
}
