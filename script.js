const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const hint = document.getElementById('hint');
const heart = document.getElementById('heart');
const question = document.getElementById('question');
const container = document.querySelector('.container');
const sadCatsContainer = document.getElementById('sadCatsContainer');
const kissingCat = document.getElementById('happyCat');

let attemptCount = 0;
let yesScale = 1;
let noScale = 1;
let isComplete = false;

const sadCatGifs = [
    'sad-cat.gif',
    'sad-cat (1).gif',
    'sad-cat-cat.gif',
    'cat.gif'
];

const hints = [
    "Think carefully... 💭",
    "Are you sure about that? 🤔",
    "The Yes button looks nice... ✨",
    "No is getting smaller... 👀",
    "Yes is growing... 💕",
    "You know you want to... 😊",
    "Just click Yes already! 💖",
    "No is almost gone... 😏",
    "Yes is calling you... 💫",
    "One more try? 🥺"
];

// Handle No button interaction
function handleNoAttempt(e) {
    if (isComplete) return;
    
    e.preventDefault();
    attemptCount++;
    
    // Add a new sad cat at random position
    const catIndex = (attemptCount - 1) % sadCatGifs.length;
    const sadCat = document.createElement('img');
    sadCat.src = sadCatGifs[catIndex];
    sadCat.className = 'sad-cat';
    
    // Random size like happy cats
    const isMobile = window.innerWidth < 768;
    const sizes = isMobile 
        ? [100, 150, 200, 170, 220] 
        : [180, 250, 350, 300, 400];
    const sizeIndex = attemptCount % sizes.length;
    const randomVariation = isMobile ? 20 : 40;
    const size = sizes[sizeIndex] + (Math.random() * randomVariation * 2 - randomVariation);
    sadCat.style.width = size + 'px';
    
    // Balanced random position - divide screen into grid
    const gridCols = 3;
    const gridRows = 3;
    const cellWidth = window.innerWidth / gridCols;
    const cellHeight = window.innerHeight / gridRows;
    
    const gridIndex = (attemptCount - 1) % (gridCols * gridRows);
    const col = gridIndex % gridCols;
    const row = Math.floor(gridIndex / gridCols);
    
    const x = col * cellWidth + Math.random() * (cellWidth - size);
    const y = row * cellHeight + Math.random() * (cellHeight - size);
    sadCat.style.left = Math.max(0, Math.min(window.innerWidth - size, x)) + 'px';
    sadCat.style.top = Math.max(0, Math.min(window.innerHeight - size, y)) + 'px';
    
    // Random rotation
    const rotation = Math.random() * 60 - 30;
    sadCat.style.transform = `rotate(${rotation}deg)`;
    
    sadCatsContainer.appendChild(sadCat);
    
    // Hide heart after first no
    if (attemptCount === 1) {
        heart.style.display = 'none';
    }
    
    // Shrink No button
    noScale = Math.max(0.3, noScale - 0.1);
    noBtn.style.transform = `scale(${noScale})`;
    noBtn.style.opacity = Math.max(0.2, 1 - attemptCount * 0.1);
    
    // Grow Yes button
    yesScale += 0.15;
    yesBtn.style.transform = `scale(${yesScale})`;
    
    // Update hint
    const hintIndex = Math.min(attemptCount - 1, hints.length - 1);
    hint.textContent = hints[hintIndex];
    
    // Hide No button after many attempts
    if (attemptCount >= 8) {
        noBtn.style.display = 'none';
        hint.textContent = "There's only one choice now... 💝";
    }
}

noBtn.addEventListener('click', handleNoAttempt);
noBtn.addEventListener('touchstart', handleNoAttempt);

// Handle Yes button
yesBtn.addEventListener('click', () => {
    if (isComplete) return;
    isComplete = true;
    
    // Hide No button
    noBtn.style.display = 'none';
    
    // Hide heart and remove all sad cats
    heart.style.display = 'none';
    sadCatsContainer.innerHTML = '';
    
    // Show kissing cat in center
    kissingCat.src = 'kissing cat.gif';
    kissingCat.className = 'kissing-cat';
    
    // Create 10 random happy cats
    createRandomHappyCats();
    
    // Update text
    question.textContent = "Yay! You said Yes! 🎉";
    hint.textContent = "I promise to make you the happiest! 💕";
    container.classList.add('success');
    
    // Hide Yes button
    yesBtn.style.display = 'none';
    
    // Trigger optimized confetti using canvas-confetti library
    celebrateWithConfetti();
});

// Create 10 random happy cat gifs
function createRandomHappyCats() {
    const isMobile = window.innerWidth < 768;
    const catCount = isMobile ? 8 : 10; // Fewer cats on mobile
    
    // Adjust sizes based on screen size - bigger on mobile
    const sizes = isMobile 
        ? [150, 200, 280, 220, 320] 
        : [200, 300, 450, 350, 500];
    
    // Divide screen into grid for balanced placement
    const gridCols = isMobile ? 3 : 4;
    const gridRows = isMobile ? 3 : 3;
    const cellWidth = window.innerWidth / gridCols;
    const cellHeight = window.innerHeight / gridRows;
    
    for (let i = 0; i < catCount; i++) {
        setTimeout(() => {
            const cat = document.createElement('img');
            cat.src = 'happy-happy-cat-happy-happy-happy-cat.gif';
            cat.className = 'happy-cat show';
            
            // Use predefined sizes with some randomness
            const randomVariation = isMobile ? 30 : 50;
            const sizeIndex = i % sizes.length;
            const size = sizes[sizeIndex] + (Math.random() * randomVariation * 2 - randomVariation);
            cat.style.width = size + 'px';
            
            // Balanced position using grid
            const gridIndex = i % (gridCols * gridRows);
            const col = gridIndex % gridCols;
            const row = Math.floor(gridIndex / gridCols);
            
            const x = col * cellWidth + Math.random() * (cellWidth - size);
            const y = row * cellHeight + Math.random() * (cellHeight - size);
            const edgeBuffer = isMobile ? -20 : -50;
            cat.style.left = Math.max(edgeBuffer, Math.min(window.innerWidth - size - edgeBuffer, x)) + 'px';
            cat.style.top = Math.max(edgeBuffer, Math.min(window.innerHeight - size - edgeBuffer, y)) + 'px';
            
            // More random rotation
            const rotation = Math.random() * 80 - 40; // -40 to 40 degrees
            cat.style.transform = `rotate(${rotation}deg)`;
            
            // Random animation delay
            cat.style.animationDelay = (Math.random() * 0.3) + 's';
            
            document.body.appendChild(cat);
        }, i * (isMobile ? 250 : 300)); // Faster on mobile
    }
}

// Optimized celebration using canvas-confetti library
function celebrateWithConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;
    
    // Heart shapes
    const heartShape = confetti.shapeFromText({ text: '💕', scalar: 2 });
    
    // Initial burst
    confetti({
        particleCount: 50,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ff6b9d'],
        shapes: [heartShape],
        scalar: 1.2,
        gravity: 0.8,
        ticks: 200
    });
    
    // Continuous confetti for 3 seconds
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval);
            return;
        }
        
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors: ['#ff69b4', '#ff1493', '#ffc0cb'],
            shapes: [heartShape],
            scalar: 0.8,
            gravity: 1,
            ticks: 150
        });
        
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors: ['#ff69b4', '#ff1493', '#ffc0cb'],
            shapes: [heartShape],
            scalar: 0.8,
            gravity: 1,
            ticks: 150
        });
    }, 200);
}
