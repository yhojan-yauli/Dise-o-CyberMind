let currentModule = 1;
const totalModules = 12;
let completedModules = {};
let maxUnlockedModule = 1;

function updateButtonStates() {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach((button, index) => {
        const moduleNumber = index + 1;
        const isCompleted = completedModules[moduleNumber];
        const text = button.textContent.replace('✅', '').trim();

        button.disabled = moduleNumber > maxUnlockedModule;
        button.innerHTML = isCompleted
            ? `<i class="fas fa-check"></i> ${text}`
            : `${text}`;
    });
}

function navigateModule(moduleNumber) {
    document.getElementById(`module${currentModule}`).style.display = 'none';
    currentModule = moduleNumber;

    const currentDiv = document.getElementById(`module${currentModule}`);
    currentDiv.style.display = 'block';

    const feedbackPanel = document.getElementById(`feedback${currentModule}`);
    const nextButton = document.getElementById(`next${currentModule}`);

    if (completedModules[currentModule]) {
        if (feedbackPanel) {
            feedbackPanel.textContent = "✅ Ya completaste este módulo.";
            feedbackPanel.style.display = 'block';
            feedbackPanel.style.backgroundColor = '#d4edda';
        }
        if (nextButton) {
            nextButton.style.display = 'block';
        }
    }

    updateButtonStates();
}

function checkAnswer(questionName, correctAnswer, moduleNumber) {
    const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
    const feedbackPanel = document.getElementById(`feedback${moduleNumber}`);
    const nextButton = document.getElementById(`next${moduleNumber}`);

    if (!selectedAnswer) {
        feedbackPanel.textContent = "Por favor, selecciona una respuesta.";
        feedbackPanel.style.display = 'block';
        feedbackPanel.style.backgroundColor = '#f8d7da';
        nextButton.style.display = 'none';
        return;
    }

    if (selectedAnswer.value === correctAnswer) {
        feedbackPanel.textContent = "¡Respuesta correcta! Puedes avanzar al siguiente módulo.";
        feedbackPanel.style.display = 'block';
        feedbackPanel.style.backgroundColor = '#d4edda';
        nextButton.style.display = 'block';

        completedModules[moduleNumber] = true;

        if (moduleNumber + 1 <= totalModules && maxUnlockedModule < moduleNumber + 1) {
            maxUnlockedModule = moduleNumber + 1;
        }

        updateButtonStates();
    } else {
        feedbackPanel.textContent = "Respuesta incorrecta. Por favor, inténtalo de nuevo.";
        feedbackPanel.style.display = 'block';
        feedbackPanel.style.backgroundColor = '#f8d7da';
        nextButton.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById(`module${currentModule}`).style.display = 'block';
    updateButtonStates();

    const moduleNav = document.querySelector('.module-nav');

    let isDragging = false;
    let startX;
    let scrollLeft;

    moduleNav.addEventListener('mousedown', (e) => {
        isDragging = true;
        moduleNav.classList.add('dragging');
        startX = e.pageX - moduleNav.offsetLeft;
        scrollLeft = moduleNav.scrollLeft;
    });

    moduleNav.addEventListener('mouseleave', () => {
        isDragging = false;
        moduleNav.classList.remove('dragging');
    });

    moduleNav.addEventListener('mouseup', () => {
        isDragging = false;
        moduleNav.classList.remove('dragging');
    });

    moduleNav.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - moduleNav.offsetLeft;
        const walk = (x - startX) * 2;
        moduleNav.scrollLeft = scrollLeft - walk;
    });

    moduleNav.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - moduleNav.offsetLeft;
        scrollLeft = moduleNav.scrollLeft;
    });

    moduleNav.addEventListener('touchend', () => {
        isDragging = false;
    });

    moduleNav.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - moduleNav.offsetLeft;
        const walk = (x - startX) * 2;
        moduleNav.scrollLeft = scrollLeft - walk;
    });
});