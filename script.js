const PASSWORD = "Shreya Saradhi"; // 🔐 change this if you want

const chat = document.getElementById("chat");
const lockScreen = document.getElementById("lock-screen");
const unlockBtn = document.getElementById("unlock");
const error = document.getElementById("error");
const hint = document.getElementById("hint");
const bg = document.getElementById("bg");

/* 💬 YOUR TEXT */
const messages = [
  "Shreya,",
  "I made this for you.",
  "It is not perfect, but i hope you love it.",
  "I made this to make sure you're not alone.",
  "I made this so you can go through this whenever you feel alone, sad, or missing me,",
  "And i just wanna tell you something.",
  "I thought a normal text wont make it so special, so I wanted to make a memory for ourselves.",
  "Yes I used AI to make this as i dont know CSS and JS,",
  "But yet I did HTML myself and some part of CSS too.",
  "I gave you my word that ill never leave you,",
  "Not until i have the ability to breathe",
  "And you changed me a lot that when I see myself, I dont feel unworthy anymore",
  "and Iam happy from the bottom of my heart.",
  "and whenever i see you, i feel so happy, so damn much.",
  "Idk why im crying while typing this, tears breaking out.",
  "im so happy and so damn comfortable around you",
  "and i want you till my last breath and want to see you with these eyes till they burn into ashes.",
  "No matter who stays and who dont, i just want you and hope you will be with me forever.",
  "Im trying my best to be a better man for you, might take time but i will become that man one day.",
  "I Love you and You'll never leave from my thoughts, NEVER.",
  "Here are few memories:"
];

/* 🖼️ MEMORY IMAGES */
const memoryImages = [
  "image1.png",
  "image2.png",
  "image3.png",
  "image4.png",
  "image5.png",
  "image6.png",
  "image7.png",
  "image8.png",
  "image9.png",
  "image10.png"
];

let index = 0;
let imageIndex = 0;
let showingImages = false;

/* 🔓 Unlock */
unlockBtn.onclick = () => {
  const value = document.getElementById("password").value;
  if (value === PASSWORD) {
    lockScreen.style.display = "none";
    chat.classList.remove("hidden");
    hint.classList.remove("hidden");
    bg.style.opacity = "1";
  } else {
    error.style.display = "block";
  }
};

/* Typing dots */
function showTyping() {
  const t = document.createElement("div");
  t.className = "typing";
  t.innerHTML = "<span></span><span></span><span></span>";
  chat.appendChild(t);
  chat.scrollTop = chat.scrollHeight;
  return t;
}

/* Add message */
function addMessage() {
  if (index >= messages.length) {
    startMemories();
    return;
  }

  const typing = showTyping();
  setTimeout(() => {
    typing.remove();

    const msg = document.createElement("div");
    msg.className = "message";
    msg.textContent = messages[index];
    chat.appendChild(msg);

    chat.scrollTop = chat.scrollHeight;
    index++;
  }, 900);
}

/* 🌠 Start image memories */
function startMemories() {
  showingImages = true;
  hint.textContent = "tap to continue";
  showNextImage();
}

/* Show images one by one */
function showNextImage() {
  if (imageIndex >= memoryImages.length) {
    lockAgain();
    return;
  }

  const img = document.createElement("img");
  img.src = memoryImages[imageIndex];
  img.className = "chat-image";

  chat.appendChild(img);
  chat.scrollTop = chat.scrollHeight;

  imageIndex++;
}

/* 🤍 Hearts */
function spawnHeart(x, y) {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = ["🤍","💖","💗"][Math.floor(Math.random()*3)];
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1500);
}

/* 🔒 Lock again */
function lockAgain() {
  hint.textContent = "come back when you miss me";
  setTimeout(() => {
    chat.innerHTML = "";
    index = 0;
    imageIndex = 0;
    showingImages = false;
    bg.style.opacity = "0";
    lockScreen.style.display = "flex";
    hint.classList.add("hidden");
  }, 2000);
}

/* 📱 Tap */
document.body.addEventListener("click", (e) => {
  if (lockScreen.style.display !== "none") return;

  spawnHeart(e.clientX, e.clientY);

  if (showingImages) {
    showNextImage();
  } else {
    addMessage();
  }

  if (navigator.vibrate) navigator.vibrate(20);
});

/* 🌠 Stars (unchanged) */
const starsContainer = document.getElementById("stars");
const STAR_COUNT = 40;
const stars = [];

function createStars() {
  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.top = Math.random() * window.innerHeight + "px";
    starsContainer.appendChild(star);
    stars.push(star);
  }
}

function moveStars(dx, dy) {
  stars.forEach((star, i) => {
    const depth = (i % 5 + 1) * 2;
    star.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
  });
}

window.addEventListener("deviceorientation", (e) => {
  moveStars(e.gamma / 30, e.beta / 30);
});

window.addEventListener("mousemove", (e) => {
  moveStars(
    (e.clientX / window.innerWidth - 0.5) * 4,
    (e.clientY / window.innerHeight - 0.5) * 4
  );
});

createStars();