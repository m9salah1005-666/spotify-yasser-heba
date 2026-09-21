// ==============================
// WEDDING COUNTDOWN
// ==============================

const weddingDate = new Date("2026-10-01T19:00:00+03:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = String(days).padStart(2, "0");
  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
  document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ==============================
// LIKE HEART BUTTON
// ==============================

const heartBtn = document.getElementById("heartBtn");

heartBtn.addEventListener("click", () => {
  heartBtn.classList.toggle("liked");
  heartBtn.innerText = heartBtn.classList.contains("liked") ? "♥" : "♡";
});


// ==============================
// REAL AUDIO PLAYER & CONTROLS
// ==============================

const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.getElementById("progressContainer");
const currentTimeEl = document.getElementById("currentTime");
const totalDurationEl = document.getElementById("totalDuration");

// تحويل الثواني إلى صيغة دقائق:ثواني
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// زر التشغيل والإيقاف
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "Ⅱ";
  } else {
    audio.pause();
    playBtn.innerText = "▶";
  }
});

// تحديث الشريط والوقت أثناء تشغيل الأغنية
audio.addEventListener("timeupdate", () => {
  const current = audio.currentTime;
  const duration = audio.duration || 210; // مدة افتراضية 3:30 (210 ثانية) إذا لم يحمل الملف بعد
  
  const progressPercent = (current / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  currentTimeEl.innerText = formatTime(current);
});

// قراءة المدة الفعلية للأغنية عند تحميل الملف
audio.addEventListener("loadedmetadata", () => {
  totalDurationEl.innerText = formatTime(audio.duration);
});

// إرجاع الأغنية 10 ثواني للخلف
prevBtn.addEventListener("click", () => {
  audio.currentTime = Math.max(0, audio.currentTime - 10);
});

// تقديم الأغنية 10 ثواني للأمام
nextBtn.addEventListener("click", () => {
  audio.currentTime = Math.min(audio.duration || 210, audio.currentTime + 10);
});

// إمكانية الضغط على أي نقطة في شريط التقدم للذهاب إليها
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration || 210;
  audio.currentTime = (clickX / width) * duration;
});

// عند انتهاء الأغنية
audio.addEventListener("ended", () => {
  playBtn.innerText = "▶";
  progressBar.style.width = "0%";
  currentTimeEl.innerText = "0:00";
});


// ==============================
// SAVE DETAILS
// ==============================

function saveDetails() {
  const details = `Yasser & Heba Wedding
Thursday, 01 October 2026
7:00 PM — 11:00 PM
Gaudinia Hall, Abbassia`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(details);
    alert("Wedding details copied ♡");
  } else {
    alert(details);
  }
}