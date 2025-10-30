// smooth scroll
document.getElementById("scrollToAbout").onclick = () => {
  document.querySelector("#about").scrollIntoView({behavior:"smooth"});
};

// modal gallery
document.addEventListener("DOMContentLoaded", () => {
  const thumbs = document.querySelectorAll(".thumb");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");
  const modalClose = document.getElementById("modalClose");

  // Klik gambar kecil → buka modal
  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      const imgSrc = thumb.dataset.src;
      const title = thumb.dataset.title;

      modalImg.src = imgSrc;
      modalCaption.textContent = title;
      modal.style.display = "flex";
    });
  });

  // Tombol close
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Klik area luar gambar → tutup modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});


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
