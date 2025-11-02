// smooth scroll
document.getElementById("scrollToAbout").onclick = () => {
  document.querySelector("#about").scrollIntoView({behavior:"smooth"});
};

// === HERO TYPING EFFECT ===
document.addEventListener("DOMContentLoaded", () => {
  const typingEl = document.getElementById("typing");
  if (!typingEl) return;

  // Kalimat-kalimat yang akan diketik
  const texts = [
    "Transforming data into insights through design and innovation.",
    "I'm interested in design and AI technology.",
    "Listening to music, podcasts and watching movies are my hobbies."
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];
    const displayedText = currentText.substring(0, charIndex);
    typingEl.textContent = displayedText;

    if (!isDeleting && charIndex < currentText.length) {
      charIndex++;
      setTimeout(type, 70); // kecepatan ngetik
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(type, 40); // kecepatan hapus
    } else {
      if (!isDeleting) {
        // Tunggu sebentar sebelum mulai hapus
        isDeleting = true;
        setTimeout(type, 1200);
      } else {
        // Lanjut ke teks berikutnya
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
      }
    }
  }

  type();
});

// === MODAL GALLERY + MULTI-IMAGE CAROUSEL ===
document.addEventListener("DOMContentLoaded", () => {
  const thumbs = document.querySelectorAll(".thumb");
  if (!thumbs.length) return;

  // Buat modal (popup)
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      <button class="modal-prev">&#10094;</button>
      <img id="modalImg" src="" alt="">
      <button class="modal-next">&#10095;</button>
      <p id="modalCaption"></p>
    </div>
  `;
  
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("#modalImg");
  const modalCaption = modal.querySelector("#modalCaption");
  const modalClose = modal.querySelector(".modal-close");
  const modalPrev = modal.querySelector(".modal-prev");
  const modalNext = modal.querySelector(".modal-next");

  let galleries = [];     // semua gambar dalam galeri aktif
  let currentIndex = 0;

  // Tampilkan gambar berdasarkan index
  const showImage = (index) => {
    const total = galleries.length;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    currentIndex = index;

    modalImg.src = galleries[index].src;
    modalCaption.textContent = galleries[index].title || "";
  };

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollProgress = Math.min(scrollTop / docHeight, 1);

  // ubah variabel CSS sesuai posisi scroll
  document.documentElement.style.setProperty("--bg-darkness", scrollProgress);
});

  // Klik thumbnail → buka modal dengan galeri
  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const galleryData = thumb.dataset.gallery;
      try {
        galleries = galleryData ? JSON.parse(galleryData) : [{
          src: thumb.dataset.src,
          title: thumb.dataset.title || ""
        }];
      } catch (e) {
        galleries = [{
          src: thumb.dataset.src,
          title: thumb.dataset.title || ""
        }];
      }

      currentIndex = 0;
      showImage(currentIndex);
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  // Navigasi tombol
  modalPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });

  modalNext.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  // Tutup modal
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
  
  // Navigasi keyboard
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex") {
      if (e.key === "ArrowLeft") showImage(currentIndex - 1);
      if (e.key === "ArrowRight") showImage(currentIndex + 1);
      if (e.key === "Escape") {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    }
  });
});

// === CARD MODAL ===
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  if (!cards.length) {
    console.error("⚠️ Tidak ditemukan elemen .card di halaman!");
    return;
  }

  // Buat modal global (hanya satu di seluruh halaman)
  const modal = document.createElement("div");
  modal.className = "card-modal";
  modal.innerHTML = `
    <div class="card-modal-content">
      <button class="card-modal-close">&times;</button>
      <img src="" alt="">
      <h3 class="card-modal-title"></h3>
      <p class="card-modal-desc"></p>
    </div>`;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("img");
  const modalTitle = modal.querySelector(".card-modal-title");
  const modalDesc = modal.querySelector(".card-modal-desc");
  const modalClose = modal.querySelector(".card-modal-close");

  // Klik card → buka modal
  cards.forEach(card => {
    card.addEventListener("click", () => {
      modalImg.src = card.dataset.img || "";
      modalTitle.textContent = card.dataset.title || "Untitled Experience";
      modalDesc.textContent = card.dataset.desc || "";
      modal.style.display = "flex";
      document.body.style.overflow = "hidden"; // 🔒 biar background nggak ikut scroll
    });
  });

  // Klik tombol close → tutup modal
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // 🔓 aktifkan scroll lagi
  });

  // Klik area luar modal → tutup
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});

// toggle dark mode
document.getElementById("darkModeToggle").onclick = ()=>{
  document.body.classList.toggle("dark-mode");
};


// animate skill bars
window.addEventListener("scroll", ()=>{
  document.querySelectorAll(".bar").forEach(bar=>{
    const rect = bar.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100){
      const val = bar.dataset.value || 80;
      bar.querySelector("div").style.width = val + "%";
    }
  });
});

// mock contact form
document.getElementById("contactForm").addEventListener("submit", e=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  console.log("Form sent:", data);
  alert("Pesan terkirim (mock). Terima kasih, "+data.name+"!");
  e.target.reset();
});

// tampilkan dots sesuai nilai skill
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".dots").forEach(dots => {
    const value = parseInt(dots.dataset.value) || 0;
    const count = 10; // jumlah titik
    for (let i = 1; i <= count; i++) {
      const dot = document.createElement("span");
      if (i <= Math.round(value / 10)) dot.classList.add("active");
      dots.appendChild(dot);
    }
  });

  // yang buat toggle menu
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const menuItems = document.getElementById("menuItems");

  console.log("✅ Script aktif");

  menuToggle.addEventListener("click", function () {
    console.log("🟢 Tombol ditekan");
    menuItems.classList.toggle("active");
  });
});

});

