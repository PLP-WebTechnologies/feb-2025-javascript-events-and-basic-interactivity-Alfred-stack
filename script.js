// --- Event Handling Section ---

const magicBtn = document.getElementById('magic-btn');
const magicMsg = document.getElementById('magic-msg');
let longPressTimer = null;

// Button click: changes text and color
magicBtn.addEventListener('click', () => {
    magicMsg.textContent = "You clicked the button! 🎈";
    magicBtn.style.background = "#c0392b";
    magicBtn.style.color = "#fff";
    magicBtn.classList.add('animated');
    setTimeout(() => magicBtn.classList.remove('animated'), 400);
});

// Hover effect: changes color
magicBtn.addEventListener('mouseenter', () => {
    magicMsg.textContent = "You're hovering over the button! 👋";
    magicBtn.style.background = "#388e7d";
});
magicBtn.addEventListener('mouseleave', () => {
    magicMsg.textContent = "Try clicking, hovering, double-clicking, or holding the button!";
    magicBtn.style.background = "#52ab98";
    magicBtn.style.color = "#fff";
});

// Keypress detection
const keyArea = document.getElementById('keypress-area');
const keyOutput = document.getElementById('key-output');
keyArea.addEventListener('keydown', (e) => {
    keyOutput.textContent = `You pressed: "${e.key}"`;
});
keyArea.addEventListener('blur', () => {
    keyOutput.textContent = "";
});

// Bonus: Double-click
magicBtn.addEventListener('dblclick', () => {
    magicMsg.textContent = "Double-click detected! 🎉 Secret unlocked!";
    magicBtn.style.background = "#f39c12";
    magicBtn.style.color = "#222";
});

// Bonus: Long press (press and hold for 1s)
magicBtn.addEventListener('mousedown', () => {
    longPressTimer = setTimeout(() => {
        magicMsg.textContent = "Long press detected! 🔒";
        magicBtn.style.background = "#8e44ad";
        magicBtn.style.color = "#fff";
    }, 1000);
});
magicBtn.addEventListener('mouseup', () => clearTimeout(longPressTimer));
magicBtn.addEventListener('mouseleave', () => clearTimeout(longPressTimer));

// --- Image Gallery Section ---
const imgList = [
    "https://picsum.photos/id/1015/300/200",
    "https://picsum.photos/id/1025/300/200",
    "https://picsum.photos/id/1035/300/200",
    "https://picsum.photos/id/1045/300/200"
];
let imgIndex = 0;
const galleryImg = document.getElementById('gallery-img');
document.getElementById('prev-img').addEventListener('click', () => {
    imgIndex = (imgIndex - 1 + imgList.length) % imgList.length;
    updateGalleryImg();
});
document.getElementById('next-img').addEventListener('click', () => {
    imgIndex = (imgIndex + 1) % imgList.length;
    updateGalleryImg();
});
function updateGalleryImg() {
    galleryImg.src = imgList[imgIndex];
    galleryImg.classList.add('active');
    setTimeout(() => galleryImg.classList.remove('active'), 400);
}

// --- Tabs Section ---
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        tabContents.forEach(content => {
            content.style.display = (content.id === tab.dataset.tab) ? 'block' : 'none';
        });
    });
});

// --- Form Validation Section ---
const form = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const emailFeedback = document.getElementById('email-feedback');
const passFeedback = document.getElementById('password-feedback');
const formSuccess = document.getElementById('form-success');

function validateEmail(email) {
    // Simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePassword(password) {
    return password.length >= 8;
}

// Real-time feedback
emailInput.addEventListener('input', () => {
    if (!emailInput.value) {
        emailFeedback.textContent = "Email is required.";
        emailFeedback.className = "feedback invalid";
    } else if (!validateEmail(emailInput.value)) {
        emailFeedback.textContent = "Invalid email format.";
        emailFeedback.className = "feedback invalid";
    } else {
        emailFeedback.textContent = "Looks good!";
        emailFeedback.className = "feedback valid";
    }
});

passInput.addEventListener('input', () => {
    if (!passInput.value) {
        passFeedback.textContent = "Password is required.";
        passFeedback.className = "feedback invalid";
    } else if (!validatePassword(passInput.value)) {
        passFeedback.textContent = "Password must be at least 8 characters.";
        passFeedback.className = "feedback invalid";
    } else {
        passFeedback.textContent = "Strong password!";
        passFeedback.className = "feedback valid";
    }
});

// On submit
form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    // Email validation
    if (!emailInput.value) {
        emailFeedback.textContent = "Email is required.";
        emailFeedback.className = "feedback invalid";
        valid = false;
    } else if (!validateEmail(emailInput.value)) {
        emailFeedback.textContent = "Invalid email format.";
        emailFeedback.className = "feedback invalid";
        valid = false;
    }
    // Password validation
    if (!passInput.value) {
        passFeedback.textContent = "Password is required.";
        passFeedback.className = "feedback invalid";
        valid = false;
    } else if (!validatePassword(passInput.value)) {
        passFeedback.textContent = "Password must be at least 8 characters.";
        passFeedback.className = "feedback invalid";
        valid = false;
    }
    if (valid) {
        formSuccess.textContent = "Sign up successful! 🎉";
        form.reset();
        emailFeedback.textContent = "";
        passFeedback.textContent = "";
        setTimeout(() => formSuccess.textContent = "", 3000);
    } else {
        formSuccess.textContent = "";
    }
});
