// Track current page and no button clicks
let currentPage = 0;
let noClickCount = 0;

// Initialize floating hearts on page load
window.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
});

// Create floating hearts background animation
function createFloatingHearts() {
    const heartBg = document.getElementById('heartBg');
    const hearts = ['💕', '💖', '💗', '💝', '💘', '❤️', '🌹'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 5 + 's';
            heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
            heartBg.appendChild(heart);
        }, i * 200);
    }
}

// Flip to the next page
function flipPage(pageNum) {
    // Prevent flipping backwards or skipping pages
    if (pageNum !== currentPage + 1) return;
    
    const page = document.querySelector(`[data-page="${pageNum}"]`);
    if (!page) return;
    
    page.classList.add('flipped');
    currentPage = pageNum;

    // Update navigation hint
    updateNavHint(pageNum);

    // Disable click on question page
    if (pageNum === 6) {
        const questionPage = document.getElementById('questionPage');
        questionPage.onclick = null;
        questionPage.style.cursor = 'default';
    }
}

// Update the navigation hint text
function updateNavHint(pageNum) {
    const navHint = document.getElementById('navHint');
    
    if (pageNum < 6) {
        navHint.textContent = 'Click to turn the page →';
    } else if (pageNum === 6) {
        navHint.textContent = 'Time to answer... 💕';
    } else {
        navHint.style.display = 'none';
    }
}

// Handle "No" button click
function sayNo() {
    noClickCount++;
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    
    // Increase yes button size with each "no" click
    const newFontSize = 24 + (noClickCount * 6);
    const newPadding = 20 + (noClickCount * 4);
    
    yesBtn.style.fontSize = newFontSize + 'px';
    yesBtn.style.padding = newPadding + 'px ' + (newPadding * 2.5) + 'px';
    
    // Shake the no button
    noBtn.style.animation = 'none';
    setTimeout(() => {
        noBtn.style.animation = 'shake 0.5s';
    }, 10);
    
    // Optional: Make no button smaller after multiple clicks
    if (noClickCount > 3) {
        const noFontSize = Math.max(14, 18 - (noClickCount - 3) * 2);
        const noPadding = Math.max(10, 15 - (noClickCount - 3) * 2);
        noBtn.style.fontSize = noFontSize + 'px';
        noBtn.style.padding = noPadding + 'px ' + (noPadding * 2) + 'px';
    }
}

// Handle "Yes" button click
function sayYes() {
    // Hide the navigation hint
    const navHint = document.getElementById('navHint');
    navHint.style.display = 'none';

    // Disable question page interaction
    const questionPage = document.getElementById('questionPage');
    questionPage.style.pointerEvents = 'none';

    // Show celebration page with fade-in effect
    const celebrationPage = document.getElementById('celebrationPage');
    celebrationPage.classList.add('show');
    currentPage = 7;

    // Create confetti celebration
    setTimeout(() => {
        createConfetti();
    }, 300);
}

// Create confetti animation
function createConfetti() {
    const colors = ['#ff6b9d', '#c9184a', '#ffccd5', '#d4af37', '#ffffff'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.width = (Math.random() * 8 + 4) + 'px';
            confetti.style.height = (Math.random() * 8 + 4) + 'px';
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => confetti.remove(), 3000);
        }, i * 20);
    }
}