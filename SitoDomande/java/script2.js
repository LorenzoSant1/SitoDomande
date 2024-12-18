// Imposta il tempo iniziale (10 minuti = 600 secondi)
let timeLeft = 600; // 10 minuti in secondi

// Riferimento all'elemento dove verrà visualizzato il timer
const timerElement = document.getElementById("timer");

// Funzione per aggiornare il timer
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Format del timer (00:00)
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (timeLeft > 0) {
        timeLeft--;
    } else {
        clearInterval(timerInterval);
        alert("Tempo scaduto!");
        
        // Scatena l'evento di click sul pulsante "Invia Risposte"
        document.getElementById("submit-quiz").click();
    }

    // Salva il tempo rimanente nel localStorage
    localStorage.setItem("timeLeft", timeLeft);
}

// Avvia il timer ogni secondo
const timerInterval = setInterval(updateTimer, 1000);

// Inizializza il timer subito
updateTimer();

// Funzione per raccogliere le risposte delle domande chiuse
function collectClosedAnswers() {
    const answers = [];
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');

    if (q1) answers.push(`1. Risposta: ${q1.value}`);
    if (q2) answers.push(`2. Risposta: ${q2.value}`);
    if (q3) answers.push(`3. Risposta: ${q3.value}`);

    return answers;
}

// Funzione per salvare le risposte nel sessionStorage
function saveAnswers() {
    // Raccolta risposte domande chiuse
    const closedAnswers = collectClosedAnswers();

    // Salva le risposte delle domande chiuse nel sessionStorage
    sessionStorage.setItem("closedAnswers", JSON.stringify(closedAnswers));

    // Redirige alla pagina delle domande aperte
    window.location.href = "Aperte.html";
}

// Aggiungi evento al pulsante "Invia Risposte"
document.getElementById("submit-quiz").addEventListener("click", saveAnswers);
