// ===== Polaroid Data =====
const polaroids = [
    { 
        image: "photos/1.jpg", 
        message: "What!? I mean, Look at us!! What wedding would you want to go not looking like this?" 
    },
    { 
        image: "photos/2.jpg", 
        message: "LOOOK AT US!?" 
    },
    { 
        image: "photos/3.jpg", 
        message: "More dates to Cubbon Park, and I would listen to the books you read with intent" 
    },
    { 
        image: "photos/4.jpg", 
        message: "AND more treks where we might need a tent?" 
    },
    { 
        image: "photos/5.jpg", 
        message: "AND many more together Jatras" 
    },
    { 
        image: "photos/6.jpg", 
        message: "Think about more family dates with Vyama" 
    },
    { 
        image: "photos/7.jpg", 
        message: "Evening talks at Versova?" 
    },
    { 
        image: "photos/8.jpg", 
        message: "AND more trips to Goa?" 
    },
    { 
        image: "photos/9.jpg", 
        message: "AND more evenings at Juhu?" 
    },
    { 
        image: "photos/10.jpg", 
        message: "I promise to organize and sit through more Batuk Bhojans" 
    },
    { 
        image: "photos/11.jpg", 
        message: "AND obvious involvement in all self care you do Oo" 
    },
    { 
        image: "photos/12.jpg", 
        message: "Maani jaa have! Tane maathe besadi ne raakhis" 
    }
];

// Pleading messages shown above the buttons - extended for 12 clicks
const pleadingMessages = [
    "Are you sure? 🥺",
    "Really, Vrushti?",
    "Think about it...",
    "Pretty please?",
    "I'll be sad...",
    "One more chance?",
    "Please? 💕",
    "Come on now...",
    "You know you want to say yes...",
    "Almost there... 💝",
    "Just one more click away...",
    "Last chance to say no! 😏"
];

// ===== State =====
let clickCount = 0;
let currentScale = 1;

// ===== DOM Elements =====
const noBtn = document.getElementById('noBtn');
const messageEl = document.getElementById('message');
const polaroidGalleryLeft = document.getElementById('polaroidGalleryLeft');
const polaroidGalleryRight = document.getElementById('polaroidGalleryRight');
const polaroidGalleryOverflow = document.getElementById('polaroidGalleryOverflow');
const bgMusic = document.getElementById('bgMusic');

// ===== Auto-play Background Music =====
// Try to play music on page load, with user interaction fallback
document.addEventListener('DOMContentLoaded', () => {
    bgMusic.volume = 0.5; // Set volume to 50%
    bgMusic.play().catch(() => {
        // If autoplay is blocked, play on first user interaction
        document.body.addEventListener('click', () => {
            bgMusic.play();
        }, { once: true });
    });
});

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
    
    // Shrink the No button with minimum size cap
    currentScale *= 0.82; // Gentler shrink factor
    currentScale = Math.max(0.35, currentScale); // Minimum 35%
    noBtn.style.transform = `scale(${currentScale})`;
    noBtn.style.opacity = Math.max(0.5, currentScale);
    
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
    
    // Determine container based on index and screen size
    let container;
    const isMobile = window.innerWidth <= 768;
    
    if (index < 8) {
        if (isMobile) {
            // All photos go to left column on mobile
            container = polaroidGalleryLeft;
        } else {
            // Desktop: Photos 0-3 go LEFT (2x2), Photos 4-7 go RIGHT (2x2)
            container = (index < 4) ? polaroidGalleryLeft : polaroidGalleryRight;
        }
    } else {
        // Photos 9-12 go in overflow container below
        container = polaroidGalleryOverflow;
    }
    
    polaroid.innerHTML = `
        <img src="${polaroidData.image}" alt="Our memory ${index + 1}" onerror="this.src='https://via.placeholder.com/200x180/B8D4E3/4A4A4A?text=photo${index + 1}'">
        <p class="polaroid-caption">${polaroidData.message}</p>
    `;
    
    container.appendChild(polaroid);
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
