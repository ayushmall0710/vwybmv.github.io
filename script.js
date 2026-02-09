// ===== Polaroid Data =====
// Replace the messages with your own personal messages!
const polaroids = [
    { 
        image: "photos/1.jpg", 
        message: "MESSAGE_1 - Replace with your memory" 
    },
    { 
        image: "photos/2.jpg", 
        message: "MESSAGE_2 - Replace with your memory" 
    },
    { 
        image: "photos/3.jpg", 
        message: "MESSAGE_3 - Replace with your memory" 
    },
    { 
        image: "photos/4.jpg", 
        message: "MESSAGE_4 - Replace with your memory" 
    },
    { 
        image: "photos/5.jpg", 
        message: "MESSAGE_5 - Replace with your memory" 
    },
    { 
        image: "photos/6.jpg", 
        message: "MESSAGE_6 - Replace with your memory" 
    },
    { 
        image: "photos/7.jpg", 
        message: "MESSAGE_7 - Replace with your memory" 
    }
];

// Pleading messages shown above the buttons
const pleadingMessages = [
    "Are you sure? 🥺",
    "Really, Vrushti?",
    "Think about it...",
    "Pretty please?",
    "I'll be sad...",
    "One more chance?",
    "Please? 💕"
];

// ===== State =====
let clickCount = 0;
let currentScale = 1;
const shrinkFactor = 0.75; // Shrink by 25% each click

// ===== DOM Elements =====
const noBtn = document.getElementById('noBtn');
const messageEl = document.getElementById('message');
const polaroidGallery = document.getElementById('polaroidGallery');

// ===== Handle No Button Click =====
function handleNoClick() {
    // Add shake animation
    noBtn.classList.add('shrinking');
    setTimeout(() => noBtn.classList.remove('shrinking'), 400);
    
    // Show polaroid
    if (clickCount < polaroids.length) {
        showPolaroid(clickCount);
    }
    
    // Show pleading message
    if (clickCount < pleadingMessages.length) {
        messageEl.textContent = pleadingMessages[clickCount];
        messageEl.classList.add('visible');
    }
    
    // Shrink the No button
    currentScale *= shrinkFactor;
    noBtn.style.transform = `scale(${currentScale})`;
    noBtn.style.opacity = Math.max(0.3, currentScale);
    
    clickCount++;
    
    // After all polaroids shown, hide the No button
    if (clickCount >= polaroids.length) {
        setTimeout(() => {
            noBtn.style.transition = 'all 0.5s ease';
            noBtn.style.transform = 'scale(0)';
            noBtn.style.opacity = '0';
            setTimeout(() => {
                noBtn.style.display = 'none';
                messageEl.textContent = "There's only one option now... 💖";
            }, 500);
        }, 300);
    }
}

// ===== Show Polaroid =====
function showPolaroid(index) {
    const polaroidData = polaroids[index];
    
    // Create polaroid element
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    
    // Random rotation between -6 and 6 degrees
    const rotation = (Math.random() - 0.5) * 12;
    const tapeRotation = (Math.random() - 0.5) * 20;
    polaroid.style.setProperty('--rotation', `${rotation}deg`);
    polaroid.style.setProperty('--tape-rotation', `${tapeRotation}deg`);
    
    // Add delay for staggered animation
    polaroid.style.animationDelay = `${index * 0.1}s`;
    
    polaroid.innerHTML = `
        <img src="${polaroidData.image}" alt="Our memory ${index + 1}" onerror="this.src='https://via.placeholder.com/200x180/B8D4E3/4A4A4A?text=Photo+${index + 1}'">
        <p class="polaroid-caption">${polaroidData.message}</p>
    `;
    
    polaroidGallery.appendChild(polaroid);
}

// ===== Handle Yes Button Click =====
function handleYesClick() {
    // Add a little celebration before redirect
    document.body.style.transition = 'all 0.3s ease';
    document.body.style.backgroundColor = '#E8B4B8';
    
    setTimeout(() => {
        window.location.href = 'yes.html';
    }, 300);
}
