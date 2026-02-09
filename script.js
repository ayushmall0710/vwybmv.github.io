// ===== Polaroid Data =====
// Replace the messages with your own personal messages!
const polaroids = [
    { 
        image: "photos/photo1.jpg", 
        message: "PLACEHOLDER_MESSAGE_1" 
    },
    { 
        image: "photos/photo2.jpg", 
        message: "PLACEHOLDER_MESSAGE_2" 
    },
    { 
        image: "photos/photo3.jpg", 
        message: "PLACEHOLDER_MESSAGE_3" 
    },
    { 
        image: "photos/photo4.jpg", 
        message: "PLACEHOLDER_MESSAGE_4" 
    },
    { 
        image: "photos/photo5.jpg", 
        message: "PLACEHOLDER_MESSAGE_5" 
    },
    { 
        image: "photos/photo6.jpg", 
        message: "PLACEHOLDER_MESSAGE_6" 
    },
    { 
        image: "photos/photo7.jpg", 
        message: "PLACEHOLDER_MESSAGE_7" 
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
        <img src="${polaroidData.image}" alt="Our memory ${index + 1}" onerror="this.src='https://via.placeholder.com/200x180/B8D4E3/4A4A4A?text=photo${index + 1}'">
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
