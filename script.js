const photos = [
  {
    url: "https://cdn.discordapp.com/attachments/1340708357618794536/1512654508461920438/IMG_3250.jpeg?ex=6a24e0ca&is=6a238f4a&hm=899068d99c18262031d44d611b13c7d0cbdf957465cb270da0c7582e0bce4e93&",
    caption: "เมื่อก่อนก็ชอบจับแก้มนะ แต่ตอนนี้เอ่อออ ไม่รู้ๆ"
  },
  {
    url: "https://cdn.discordapp.com/attachments/1340708357618794536/1512654509049118860/IMG_4611.jpeg?ex=6a24e0ca&is=6a238f4a&hm=f9273cf94e443aeb29a09aae1159369f379c4ee0b235a6470408c8e49136623a&",
    caption: "คนจ๋วยย ทำอะไรก็จ๋วยยย น่าร๊ากกกกก"
  },
  {
    url: "https://cdn.discordapp.com/attachments/1340708357618794536/1512654509615353867/IMG_4955.jpeg?ex=6a24e0ca&is=6a238f4a&hm=33196caaeedb25e553c067def56ac4928da2ebaa95d04d219d7805a273690dcb&",
    caption: "เส้าาา อยากไปเที่ยว ไปไหนด้วยกันน"
  },
  {
    url: "https://cdn.discordapp.com/attachments/1340708357618794536/1512654510269661305/6479C0E9-3D94-4322-95EA-EEA158F99FA1.jpeg?ex=6a24e0cb&is=6a238f4b&hm=ac63d12470f49f2c3a39457c34e6085ea6ae1ec2e140a2bbcc0f475616cfba74&",
    caption: "วันคบวันแรกกก คบอะไรก่อนปิดเทอมว้าาา"
  },
  {
    url: "https://cdn.discordapp.com/attachments/1340708357618794536/1512654511188082738/IMG_5088.jpeg?ex=6a24e0cb&is=6a238f4b&hm=12d92f5db22421d30d198305b50c731cbc4c88fe8c6ca7a9f1e2298e304bbdd3&",
    caption: "ภาพเราาา ในวันทัมด้าาาา"
  },
  {
    url: "https://cdn.discordapp.com/attachments/1340708357618794536/1512654512370880683/IMG_5165.jpeg?ex=6a24e0cb&is=6a238f4b&hm=b9abc6b357a12b4811acaa59ff735d082b8ab16a9aaf67acd6e5b81c4d7f6227&",
    caption: "อันนี้ภาพคนจ๋วยที่เราถ่ายเองงง ออกจะเริ่ดด!"
  }
];

// แก้เพลงและรูปปกตรงนี้ ลิงก์เพลงจะไม่แสดงบนหน้าเว็บ
const songConfig = {
  title: "Hold Me Down",
  caption: "เอ่อออ เพลงนี้ฟังแล้วนึกถึงน้องตลอดเรยยย",
  url: "https://cdn.discordapp.com/attachments/1340708357618794536/1512643781646745700/Hold_Me_Down.mp3?ex=6a24d6cd&is=6a23854d&hm=cbda405f9cdccfd7de9cf35d9072b31cf920e9556220fe68c347bf7dfe2e9191&",
  cover: "https://cdn-images.dzcdn.net/images/cover/282e45bef1995c2c6f2901e34c4ab560/1900x1900-000000-80-0-0.jpg"
};

const sweetNotes = [
  {
    label: "ก ไก่",
    message: "ชั้นคิดถึงเธอมากกกกก อยากเจอกันตลอดเรยยย เอามายี่สิบบ"
  },
  {
    label: "ข ไข่",
    message: "ป้ะะ เดี๋ยวเลาเลี้ยงหนมมม"
  },
  {
    label: "ฃ ฃวด",
    message: "ไว้ไปดูหนังกันนน สักวันนุงง"
  },
  {
    label: "ค ควาย",
    message: "เอ้อออ ไว้ไปซื้ออะไรอิสกัน หม่าล่าไรงี้"
  },
  {
    label: "ฅ ฅน",
    message: "ไปโฟโต้บูสต์กันเต๊อะะะ"
  },
  {
    label: "ฆ ระฆัง",
    message: "มีความสุขเย้อๆน้าาา สุขสันต์ครบรอบ 1 ปีนะจ๊ะะะ"
  }
];

const galleryGrid = document.querySelector("#galleryGrid");
const audioPlayer = document.querySelector("#audioPlayer");
const songCover = document.querySelector("#songCover");
const songTitle = document.querySelector("#songTitle");
const songCaption = document.querySelector("#songCaption");
const playPauseBtn = document.querySelector("#playPauseBtn");
const playIcon = document.querySelector("#playIcon");
const pauseIcon = document.querySelector("#pauseIcon");
const volumeSlider = document.querySelector("#volumeSlider");
const songStatus = document.querySelector("#songStatus");
const disc = document.querySelector("#disc");
const cursorGlow = document.querySelector(".cursor-glow");
const spinWheelBtn = document.querySelector("#spinWheelBtn");
const wishWheel = document.querySelector("#wishWheel");
const wishText = document.querySelector("#wishText");
const surpriseBtn = document.querySelector("#surpriseBtn");
const floatingHeart = document.querySelector("#floatingHeart");
const progressFill = document.querySelector("#progressFill");
const progressThumb = document.querySelector("#progressThumb");
const progressTrack = document.querySelector("#progressTrack");
const progressContainer = document.querySelector("#progressContainer");
const currentTimeEl = document.querySelector("#currentTime");
const durationTimeEl = document.querySelector("#durationTime");
const waveformContainer = document.querySelector("#waveformContainer");
const volIconBtn = document.querySelector("#volIconBtn");
let wheelRotation = 0;
let isWheelSpinning = false;
let isSeeking = false;
let savedVolume = 0.7;

function renderGallery() {
  galleryGrid.innerHTML = photos
    .map((photo) => `
      <figure class="photo-card">
        <img src="${photo.url}" alt="${photo.caption}" loading="lazy">
        <figcaption>${photo.caption}</figcaption>
      </figure>
    `)
    .join("");
}

function renderWishWheel() {
  wishWheel.innerHTML = sweetNotes
    .map((note, index) => `<span style="--i: ${index}">${note.label}</span>`)
    .join("");
}

function renderWaveform() {
  const barsContainer = waveformContainer.querySelector(".waveform-bars");
  const barCount = 45;
  let barsHTML = "";
  for (let i = 0; i < barCount; i++) {
    const minH = randomBetween(10, 30);
    const maxH = randomBetween(50, 95);
    const speed = randomBetween(400, 900);
    barsHTML += `<div class="waveform-bar" style="height:${minH}%;--wave-min:${minH}%;--wave-max:${maxH}%;--wave-speed:${Math.round(speed)}ms"></div>`;
  }
  barsContainer.innerHTML = barsHTML;
}

function createHeart(x = window.innerWidth - 50, y = window.innerHeight - 50) {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.35 ? "♡" : "♥";
  heart.style.left = `${x + randomBetween(-28, 28)}px`;
  heart.style.top = `${y + randomBetween(-18, 18)}px`;
  heart.style.fontSize = `${randomBetween(18, 34)}px`;
  document.body.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}

function createSparkle() {
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.style.left = `${randomBetween(8, window.innerWidth - 8)}px`;
  sparkle.style.top = `${randomBetween(80, window.innerHeight - 8)}px`;
  sparkle.style.animationDuration = `${randomBetween(1100, 2200)}ms`;
  document.body.appendChild(sparkle);
  sparkle.addEventListener("animationend", () => sparkle.remove());
}

function burstHearts(x, y, amount = 16) {
  for (let i = 0; i < amount; i += 1) {
    window.setTimeout(() => createHeart(x, y), i * 35);
  }
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function formatTime(seconds) {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function updatePlayerState() {
  const isPlaying = !audioPlayer.paused;
  playIcon.style.display = isPlaying ? "none" : "block";
  pauseIcon.style.display = isPlaying ? "block" : "none";
  disc.classList.toggle("playing", isPlaying);
  songStatus.textContent = isPlaying ? "กำลังเล่นเพลงของเรา ♪" : "หยุดเพลงไว้ก่อน";

  // Toggle waveform animation
  const bars = waveformContainer.querySelectorAll(".waveform-bar");
  bars.forEach((bar) => {
    bar.classList.toggle("active", isPlaying);
  });
}

function updateProgress() {
  if (isSeeking) return;
  const current = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  if (isNaN(duration) || duration === 0) return;

  const percent = (current / duration) * 100;
  progressFill.style.width = `${percent}%`;
  progressThumb.style.left = `${percent}%`;
  currentTimeEl.textContent = formatTime(current);
  durationTimeEl.textContent = formatTime(duration);
}

function seekTo(event) {
  const rect = progressTrack.getBoundingClientRect();
  const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
  const percent = x / rect.width;
  const duration = audioPlayer.duration;
  if (!isNaN(duration) && duration > 0) {
    audioPlayer.currentTime = percent * duration;
    progressFill.style.width = `${percent * 100}%`;
    progressThumb.style.left = `${percent * 100}%`;
  }
}

function setupSong() {
  songTitle.textContent = songConfig.title;
  songCaption.textContent = songConfig.caption;
  songCover.src = songConfig.cover;

  if (!songConfig.url) {
    songStatus.textContent = "ยังไม่ได้ใส่ลิงก์เพลง";
    playPauseBtn.disabled = true;
    return;
  }

  audioPlayer.src = songConfig.url;
  audioPlayer.volume = volumeSlider.value;
  songStatus.textContent = "พร้อมเล่นเพลง";
}

async function togglePlay() {
  if (!songConfig.url) {
    songStatus.textContent = "ใส่ลิงก์เพลงใน script.js ก่อนนะ";
    return;
  }

  try {
    if (audioPlayer.paused) {
      await audioPlayer.play();
      burstHearts(window.innerWidth - 70, window.innerHeight - 80, 8);
    } else {
      audioPlayer.pause();
    }
    updatePlayerState();
  } catch (error) {
    songStatus.textContent = "ลิงก์นี้เล่นไม่ได้ ลองใช้ลิงก์ไฟล์ .mp3 โดยตรง";
  }
}

function toggleMute() {
  if (audioPlayer.volume > 0) {
    savedVolume = audioPlayer.volume;
    audioPlayer.volume = 0;
    volumeSlider.value = 0;
  } else {
    audioPlayer.volume = savedVolume;
    volumeSlider.value = savedVolume;
  }
}

function spinWishWheel() {
  if (isWheelSpinning) return;

  isWheelSpinning = true;
  spinWheelBtn.disabled = true;
  wishText.textContent = "กำลังหมุน...";

  const selectedIndex = Math.floor(Math.random() * sweetNotes.length);
  const segmentAngle = 360 / sweetNotes.length;
  const targetAngle = 360 - (selectedIndex * segmentAngle + segmentAngle / 2);
  const nextFullTurn = Math.ceil(wheelRotation / 360) * 360;
  wheelRotation = nextFullTurn + 360 * 5 + targetAngle;
  wishWheel.style.transform = `rotate(${wheelRotation}deg)`;

  window.setTimeout(() => {
    wishText.textContent = sweetNotes[selectedIndex].message;
    burstHearts(window.innerWidth / 2, window.innerHeight * 0.72, 14);
    spinWheelBtn.disabled = false;
    isWheelSpinning = false;
  }, 3100);
}

// Initialize
renderGallery();
renderWishWheel();
renderWaveform();
setupSong();

// Autoplay — try immediately, fallback to first user interaction
async function tryAutoplay() {
  if (!songConfig.url) return;
  try {
    await audioPlayer.play();
    updatePlayerState();
  } catch {
    // Browser blocked autoplay — play on first interaction
    const startOnInteraction = async () => {
      try {
        await audioPlayer.play();
        updatePlayerState();
      } catch {}
      document.removeEventListener("click", startOnInteraction);
      document.removeEventListener("touchstart", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
    };
    document.addEventListener("click", startOnInteraction, { once: false });
    document.addEventListener("touchstart", startOnInteraction, { once: false });
    document.addEventListener("keydown", startOnInteraction, { once: false });
    songStatus.textContent = "แตะหน้าจอเพื่อเริ่มเพลง ♪";
  }
}
tryAutoplay();

// Cursor glow
document.addEventListener("pointermove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

// Click to create hearts
document.addEventListener("click", (event) => {
  if (event.target.closest("button, a, input, .progress-bar")) return;
  createHeart(event.clientX, event.clientY);
});

// Music player events
playPauseBtn.addEventListener("click", togglePlay);
audioPlayer.addEventListener("play", updatePlayerState);
audioPlayer.addEventListener("pause", updatePlayerState);
audioPlayer.addEventListener("ended", updatePlayerState);
audioPlayer.addEventListener("timeupdate", updateProgress);
audioPlayer.addEventListener("loadedmetadata", () => {
  durationTimeEl.textContent = formatTime(audioPlayer.duration);
});

// Volume control
volumeSlider.addEventListener("input", () => {
  audioPlayer.volume = volumeSlider.value;
});

volIconBtn.addEventListener("click", toggleMute);

// Progress bar seeking
progressTrack.addEventListener("click", seekTo);

progressTrack.addEventListener("mousedown", (event) => {
  isSeeking = true;
  progressContainer.classList.add("active");
  seekTo(event);

  const onMove = (e) => seekTo(e);
  const onUp = () => {
    isSeeking = false;
    progressContainer.classList.remove("active");
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
  };

  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUp);
});

// Wheel spin
spinWheelBtn.addEventListener("click", spinWishWheel);

// Hearts on buttons
[surpriseBtn, floatingHeart].forEach((button) => {
  button.addEventListener("click", (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 22);
  });
});

// Memory cards
document.querySelectorAll(".memory-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".memory-card").forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    const rect = card.getBoundingClientRect();
    burstHearts(rect.left + rect.width / 2, rect.top + 40, 8);
  });
});

// Sparkles
window.setInterval(createSparkle, 900);
