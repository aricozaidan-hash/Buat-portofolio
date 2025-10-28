// smooth scroll
document.getElementById("scrollToAbout").onclick = () => {
  document.querySelector("#about").scrollIntoView({behavior:"smooth"});
};

// modal gallery
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const caption = document.getElementById("modalCaption");
document.querySelectorAll(".thumb").forEach(t => {
  t.onclick = () => {
    modal.style.display = "flex";
    modalImg.src = t.dataset.src;
    caption.textContent = t.dataset.title;
  };
});
document.getElementById("modalClose").onclick = () => modal.style.display = "none";

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
