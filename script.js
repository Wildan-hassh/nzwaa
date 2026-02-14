const images = [
  { src: "IMG/1.jpg", text: "Tiap detik bersamamu adalah bagian favorit dalam hariku." },
  { src: "IMG/2.jpg", text: "Terima kasih sudah menjadi alasan di balik senyumku." },
  { src: "IMG/3.jpg", text: "Duniaku terasa jauh lebih indah sejak ada kamu." },
  { src: "IMG/4.jpg", text: "Mungkin aku bukan orang yang sempurna..." },
  { src: "IMG/5.jpg", text: "Tapi cintaku padamu akan selalu tulus." },
  { src: "IMG/15.jpg", text: "Jangan pernah bosan ya, tetaplah jadi kamu." },
  { src: "IMG/14.jpg", text: "Satu hal yang pasti, aku sangat beruntung memilikimu." }
];

let currentIndex = 0;
let typingTimeout, autoNextTimeout;

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const dynamicBg = document.getElementById("dynamicBg");
const captionElement = document.getElementById("typewriterCaption");
const photoContainer = document.getElementById("photoContainer");
const finalTrigger = document.getElementById("finalTrigger");

function startApp(e) {
  e.stopPropagation();
  document.getElementById("introOverlay").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("introOverlay").style.visibility = "hidden";
    modal.style.display = "flex";
    updateModal();
  }, 1000);
  document.getElementById("myAudio").play();
}

function updateModal() {
  clearTimeout(autoNextTimeout);
  modalImg.classList.remove("fade-in");
  modalImg.style.opacity = "0";
  
  setTimeout(() => {
    // Update foto depan & background blur
    modalImg.src = images[currentIndex].src;
    dynamicBg.style.backgroundImage = `url('${images[currentIndex].src}')`;
    
    void modalImg.offsetWidth; 
    modalImg.classList.add("fade-in");
    typeWriterCaption(images[currentIndex].text);
  }, 600);
}

function typeWriterCaption(text) {
  clearTimeout(typingTimeout);
  captionElement.innerHTML = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      captionElement.innerHTML += text.charAt(i);
      i++;
      typingTimeout = setTimeout(type, 70);
    } else {
      if (currentIndex < images.length - 1) {
        autoNextTimeout = setTimeout(nextImage, 3000);
      } else {
        setTimeout(showFinalSurprise, 4000);
      }
    }
  }
  type();
}

function nextImage() { currentIndex++; updateModal(); }

function showFinalSurprise() {
  photoContainer.style.opacity = "0";
  setTimeout(() => {
    photoContainer.style.display = "none";
    finalTrigger.style.display = "block";
    dynamicBg.style.filter = "blur(30px) brightness(0.3)"; // Makin gelap di akhir
  }, 2000);
}

function highlightText() {
  const overlay = document.getElementById("messageOverlay");
  const textElement = document.getElementById("typewriterText");
  const fullText = "Terima kasih sudah menjadi bagian terindah dalam ceritaku.\n\nKamu adalah alasan di balik senyum yang tidak bisa kujelaskan, dan hadirmu membuat segalanya terasa jauh lebih berarti.\n\nAku sangat bersyukur memilikimu.\nSemoga kita selalu bersama, selamanya. ❤️";
  
  finalTrigger.style.display = "none";
  overlay.style.display = "flex";
  createSnow();

  let i = 0;
  function typeMsg() {
    if (i < fullText.length) {
      textElement.innerHTML += fullText.charAt(i) === "\n" ? "<br>" : fullText.charAt(i);
      i++;
      setTimeout(typeMsg, 60);
    }
  }
  typeMsg();
}

function createSnow() {
  const container = document.getElementById("snow-container");
  for (let i = 0; i < 40; i++) {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.innerHTML = "❄";
    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
    snowflake.style.opacity = Math.random();
    container.appendChild(snowflake);
  }
}

function closeMessage() { document.getElementById("messageOverlay").style.display = "none"; }

function createLove(e) {
  const love = document.createElement("div");
  love.className = "love-click";
  love.innerHTML = "❤️";
  const x = e.clientX || (e.touches && e.touches[0].clientX);
  const y = e.clientY || (e.touches && e.touches[0].clientY);
  love.style.left = x + "px";
  love.style.top = y + "px";
  document.body.appendChild(love);
  setTimeout(() => love.remove(), 1200);

}
