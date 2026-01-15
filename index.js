/* ===============================
   Online Music Museum - JavaScript
   =============================== */

/* Smooth scroll for internal links (Home page hero) */
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

/* Highlight active navigation link */
const navLinks = document.querySelectorAll("nav a");
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.style.color = "#ff9800";
    }
});

/* Simple image hover effect (Museum feel) */
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.05)";
        card.style.transition = "0.3s";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
    });
});

/* Gallery image click preview */
const galleryImages = document.querySelectorAll(".gallery img");

galleryImages.forEach(img => {
    img.addEventListener("click", () => {
        const preview = document.createElement("div");
        preview.style.position = "fixed";
        preview.style.top = "0";
        preview.style.left = "0";
        preview.style.width = "100%";
        preview.style.height = "100%";
        preview.style.background = "rgba(0,0,0,0.8)";
        preview.style.display = "flex";
        preview.style.alignItems = "center";
        preview.style.justifyContent = "center";
        preview.style.zIndex = "1000";

        const fullImg = document.createElement("img");
        fullImg.src = img.src;
        fullImg.style.maxWidth = "90%";
        fullImg.style.maxHeight = "90%";
        fullImg.style.borderRadius = "10px";

        preview.appendChild(fullImg);
        document.body.appendChild(preview);

        preview.addEventListener("click", () => {
            preview.remove();
        });
    });
});

/* Scroll-to-top button (auto-create) */
const scrollBtn = document.createElement("button");
scrollBtn.innerText = "↑";
scrollBtn.style.position = "fixed";
scrollBtn.style.bottom = "20px";
scrollBtn.style.right = "20px";
scrollBtn.style.padding = "10px 15px";
scrollBtn.style.fontSize = "18px";
scrollBtn.style.border = "none";
scrollBtn.style.borderRadius = "50%";
scrollBtn.style.background = "#ff9800";
scrollBtn.style.color = "#fff";
scrollBtn.style.cursor = "pointer";
scrollBtn.style.display = "none";

document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ========= Active nav item =========
(function markActiveNav(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach(a=>{
    const href = a.getAttribute("href");
    if ((path === "" && href.endsWith("index.html")) || href.endsWith(path)){
      a.classList.add("active");
    }
  });
})();

// ========= Gallery modal logic =========
const instrumentData = {
  "guitar": {
    title: "Guitar",
    types: [
      { name:"Acoustic Guitar", img:"https://placehold.co/600x400?text=Acoustic+Guitar", desc:"Steel-string acoustic, versatile for folk and pop." },
      { name:"Electric Guitar", img:"https://placehold.co/600x400?text=Electric+Guitar", desc:"Magnetic pickups and amps define rock & blues." },
      { name:"Classical Guitar", img:"https://placehold.co/600x400?text=Classical+Guitar", desc:"Nylon strings, warm tone for classical/Latin." }
    ]
  },
  "piano": {
    title: "Piano",
    types: [
      { name:"Grand", img:"https://placehold.co/600x400?text=Grand+Piano", desc:"Concert instrument with rich resonance." },
      { name:"Upright", img:"https://placehold.co/600x400?text=Upright+Piano", desc:"Space-saving home/studio favorite." },
      { name:"Digital", img:"https://placehold.co/600x400?text=Digital+Piano", desc:"Lightweight, sampled tones & MIDI." }
    ]
  },
  "violin": {
    title: "Violin",
    types: [
      { name:"Baroque Violin", img:"https://placehold.co/600x400?text=Baroque+Violin", desc:"Gut strings & historical setup." },
      { name:"Modern Violin", img:"https://placehold.co/600x400?text=Modern+Violin", desc:"Standard orchestral instrument today." },
      { name:"Electric Violin", img:"https://placehold.co/600x400?text=Electric+Violin", desc:"Amplified and effects-ready." }
    ]
  },
  "cello": {
    title: "Cello",
    types: [
      { name:"Baroque Cello", img:"https://placehold.co/600x400?text=Baroque+Cello", desc:"Historic tuning and bow." },
      { name:"Modern Cello", img:"https://placehold.co/600x400?text=Modern+Cello", desc:"Core of string sections." },
      { name:"Electric Cello", img:"https://placehold.co/600x400?text=Electric+Cello", desc:"Slim body, amplified." }
    ]
  },
  "flute": {
    title: "Flute",
    types: [
      { name:"Concert Flute", img:"https://placehold.co/600x400?text=Concert+Flute", desc:"Silver Boehm-system." },
      { name:"Alto Flute", img:"https://placehold.co/600x400?text=Alto+Flute", desc:"Lower, mellow tone." },
      { name:"Bass Flute", img:"https://placehold.co/600x400?text=Bass+Flute", desc:"Deep, breathy register." }
    ]
  },
  "clarinet": {
    title: "Clarinet",
    types: [
      { name:"B♭ Clarinet", img:"https://placehold.co/600x400?text=Bb+Clarinet", desc:"Standard orchestral." },
      { name:"Bass Clarinet", img:"https://placehold.co/600x400?text=Bass+Clarinet", desc:"Rich low end." },
      { name:"E♭ Clarinet", img:"https://placehold.co/600x400?text=Eb+Clarinet", desc:"Bright & agile." }
    ]
  },
  "saxophone": {
    title: "Saxophone",
    types: [
      { name:"Alto Sax", img:"https://placehold.co/600x400?text=Alto+Sax", desc:"Popular for jazz." },
      { name:"Tenor Sax", img:"https://placehold.co/600x400?text=Tenor+Sax", desc:"Warm, robust voice." },
      { name:"Soprano Sax", img:"https://placehold.co/600x400?text=Soprano+Sax", desc:"Bright, piercing." }
    ]
  },
  "trumpet": {
    title: "Trumpet",
    types: [
      { name:"B♭ Trumpet", img:"https://placehold.co/600x400?text=Bb+Trumpet", desc:"Band & jazz standard." },
      { name:"Piccolo Trumpet", img:"https://placehold.co/600x400?text=Piccolo+Trumpet", desc:"High Baroque parts." },
      { name:"Flugelhorn", img:"https://placehold.co/600x400?text=Flugelhorn", desc:"Mellow trumpet cousin." }
    ]
  },
  "trombone": {
    title: "Trombone",
    types: [
      { name:"Tenor Trombone", img:"https://placehold.co/600x400?text=Tenor+Trombone", desc:"Most common." },
      { name:"Bass Trombone", img:"https://placehold.co/600x400?text=Bass+Trombone", desc:"Lower range." },
      { name:"Valve Trombone", img:"https://placehold.co/600x400?text=Valve+Trombone", desc:"Valved variant." }
    ]
  },
  "french-horn": {
    title: "French Horn",
    types: [
      { name:"Double Horn", img:"https://placehold.co/600x400?text=Double+Horn", desc:"F/B♭ combo." },
      { name:"Single Horn", img:"https://placehold.co/600x400?text=Single+Horn", desc:"Lighter for students." },
      { name:"Vienna Horn", img:"https://placehold.co/600x400?text=Vienna+Horn", desc:"Pumpenvalve tradition." }
    ]
  },
  "tuba": {
    title: "Tuba",
    types: [
      { name:"BB♭ Tuba", img:"https://placehold.co/600x400?text=BBb+Tuba", desc:"Bands & marching." },
      { name:"CC Tuba", img:"https://placehold.co/600x400?text=CC+Tuba", desc:"Orchestral favorite." },
      { name:"E♭/F Tuba", img:"https://placehold.co/600x400?text=Eb%2FF+Tuba", desc:"Solo & chamber." }
    ]
  },
  "drum-kit": {
    title: "Drum Kit",
    types: [
      { name:"Acoustic Kit", img:"https://placehold.co/600x400?text=Acoustic+Drum+Kit", desc:"Wood shells, cymbals." },
      { name:"Electronic Kit", img:"https://placehold.co/600x400?text=Electronic+Drums", desc:"Pads & modules." },
      { name:"Jazz Kit", img:"https://placehold.co/600x400?text=Jazz+Kit", desc:"Smaller, tuned high." }
    ]
  },
  "djembe": {
    title: "Djembe",
    types: [
      { name:"Mali style", img:"https://placehold.co/600x400?text=Djembe+Mali", desc:"Rounded bowl, crisp tone." },
      { name:"Guinea style", img:"https://placehold.co/600x400?text=Djembe+Guinea", desc:"Thicker shells, bassy." },
      { name:"Mini djembe", img:"https://placehold.co/600x400?text=Mini+Djembe", desc:"Portable practice." }
    ]
  },
  "talking-drum": {
    title: "Talking Drum",
    types: [
      { name:"Iya-ilu", img:"https://placehold.co/600x400?text=Talking+Drum+Iya-ilu", desc:"Lead drum (Yoruba)." },
      { name:"Gangan", img:"https://placehold.co/600x400?text=Gangan", desc:"Hourglass pressure drum." },
      { name:"Omele", img:"https://placehold.co/600x400?text=Omele", desc:"Smaller supporting drums." }
    ]
  },
  "kora": {
    title: "Kora",
    types: [
      { name:"21-string", img:"https://placehold.co/600x400?text=Kora+21-string", desc:"Mande tradition." },
      { name:"22-string", img:"https://placehold.co/600x400?text=Kora+22-string", desc:"Modern variants." },
      { name:"Electric Kora", img:"https://placehold.co/600x400?text=Electric+Kora", desc:"Amplified design." }
    ]
  },
  "balafon": {
    title: "Balafon",
    types: [
      { name:"Diatonic", img:"https://placehold.co/600x400?text=Balafon+Diatonic", desc:"Traditional tuning." },
      { name:"Chromatic", img:"https://placehold.co/600x400?text=Balafon+Chromatic", desc:"Expanded notes." },
      { name:"Bass Balafon", img:"https://placehold.co/600x400?text=Bass+Balafon", desc:"Lower register." }
    ]
  },
  "atumpan": {
    title: "Atumpan",
    types: [
      { name:"Male Drum", img:"https://placehold.co/600x400?text=Atumpan+Male", desc:"Lower pitch." },
      { name:"Female Drum", img:"https://placehold.co/600x400?text=Atumpan+Female", desc:"Higher pitch." },
      { name:"Ceremonial", img:"https://placehold.co/600x400?text=Atumpan+Ceremonial", desc:"Decorated pair." }
    ]
  },
  "seperewa": {
    title: "Seperewa",
    types: [
      { name:"10-string", img:"https://placehold.co/600x400?text=Seperewa+10", desc:"Akan harp-lute." },
      { name:"12-string", img:"https://placehold.co/600x400?text=Seperewa+12", desc:"Extended range." },
      { name:"Electric", img:"https://placehold.co/600x400?text=Electric+Seperewa", desc:"Modern amplified." }
    ]
  },
  "sitar": {
    title: "Sitar",
    types: [
      { name:"Kharaj Pancham", img:"https://placehold.co/600x400?text=Sitar+KP", desc:"Bass strings style." },
      { name:"Vilayat Khan style", img:"https://placehold.co/600x400?text=Sitar+Gayaki", desc:"Melodic emphasis." },
      { name:"Bass Sitar", img:"https://placehold.co/600x400?text=Bass+Sitar", desc:"Lower tuning." }
    ]
  },
  "organ": {
    title: "Organ",
    types: [
      { name:"Pipe Organ", img:"https://placehold.co/600x400?text=Pipe+Organ", desc:"Acoustic pipes." },
      { name:"Hammond", img:"https://placehold.co/600x400?text=Hammond+Organ", desc:"Tonewheels & Leslie." },
      { name:"Digital Organ", img:"https://placehold.co/600x400?text=Digital+Organ", desc:"Sampled/Modeled." }
    ]
  },
  "kalimba": {
    title: "Kalimba (Mbira)",
    types: [
      { name:"Treble", img:"https://placehold.co/600x400?text=Kalimba+Treble", desc:"Bright tone." },
      { name:"Alto", img:"https://placehold.co/600x400?text=Kalimba+Alto", desc:"Warmer voice." },
      { name:"Chromatic", img:"https://placehold.co/600x400?text=Chromatic+Kalimba", desc:"Accidentals added." }
    ]
  }
}; // 20 instruments

function qs(sel, root=document){ return root.querySelector(sel); }
function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

function openModalFor(instrumentKey){
  const data = instrumentData[instrumentKey];
  if(!data) return;

  const modal = qs("#typesModal");
  qs(".panel-title", modal).textContent = data.title + " — Types";
  const wrap = qs(".types", modal);
  wrap.innerHTML = "";
  data.types.forEach(t=>{
    const div = document.createElement("div");
    div.className = "card type-card";
    div.innerHTML = `
      <img src="${t.img}" alt="${t.name}">
      <div class="body">
        <h3>${t.name}</h3>
        <p>${t.desc}</p>
      </div>
    `;
    wrap.appendChild(div);
  });
  modal.classList.add("open");
}

document.addEventListener("click", (e)=>{
  const card = e.target.closest("[data-instrument]");
  if(card){ openModalFor(card.dataset.instrument); }
  if(e.target.matches(".modal, .close-btn")){ qs("#typesModal")?.classList.remove("open"); }
});
