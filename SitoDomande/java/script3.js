// Recupera il tempo rimanente dal localStorage
let timeLeft = localStorage.getItem("timeLeft");

// Se non ci sono dati salvati, inizializza il timer con 600 secondi (10 minuti)
if (timeLeft === null) {
    timeLeft = 600;
} else {
    // Converte il valore salvato da stringa a numero
    timeLeft = parseInt(timeLeft);
}

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
        saveAndDownloadAnswers(); // Chiamata diretta per salvare e scaricare le risposte
    }

    // Salva il tempo rimanente nel localStorage
    localStorage.setItem("timeLeft", timeLeft);
}

// Avvia il timer ogni secondo
const timerInterval = setInterval(updateTimer, 1000);

// Inizializza il timer subito
updateTimer();

// Funzione per salvare e scaricare le risposte
function saveAndDownloadAnswers() {
    // Raccolta delle risposte delle domande aperte
    const question1 = document.getElementById('question1').value;
    const question2 = document.getElementById('question2').value;
    const question3 = document.getElementById('question3').value;
    const question4 = document.getElementById('question4').value;

    // Crea il contenuto per il file di testo
    let fileContent = '';

    // Recupera le risposte delle domande chiuse
    const closedAnswers = JSON.parse(sessionStorage.getItem("closedAnswers"));
    if (closedAnswers && closedAnswers.length > 0) {
        fileContent += closedAnswers.join('\n') + '\n\n';
    }

    // Aggiungi le risposte delle domande aperte
    fileContent += `1. Risposta: ${question1}\n`;
    fileContent += `2. Risposta: ${question2}\n`;
    fileContent += `3. Risposta: ${question3}\n`;
    fileContent += `4. Risposta: ${question4}\n`;

    // Crea un blob di testo
    const blob = new Blob([fileContent], { type: 'text/plain' });

    // Crea un link per il download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'risposte.txt'; // Nome del file da scaricare

    // Simula il clic per avviare il download
    link.click();

    // Mostra il messaggio al centro della pagina
    displaySubmittedMessage();
}

// Funzione per visualizzare il messaggio "Test Inviato"
function displaySubmittedMessage() {
    // Cancella tutto il contenuto della pagina
    document.body.innerHTML = '';

    // Crea un elemento per il messaggio
    const messageDiv = document.createElement('div');
    messageDiv.textContent = 'Test Inviato';
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.fontSize = '3rem';
    messageDiv.style.fontWeight = 'bold';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.color = '#333';
    document.body.appendChild(messageDiv);
}

// Gestione del submit manuale
document.getElementById('open-questions-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Impedisce il comportamento di submit predefinito
    saveAndDownloadAnswers();
});
