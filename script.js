const premios = [
  "Envío DHL\nó 10 Sims Telcel",
  "1 Renovación\nAnual",
  "2 Renovaciones\nAnuales",
  "1 ET200N\n+ 5 Sims Telcel",
  "1 R83\n+ 5 Sims Telcel"
];

const colors = ["#c62828", "#f78f1e", "#fce8d5", "#c62828", "#f78f1e"];

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spin");
const resultado = document.getElementById("resultado");
const fuego = document.querySelector(".fuego");

const token = new URLSearchParams(window.location.search).get("token");
let girado = false;

const endpoint = "https://script.google.com/macros/s/AKfycbwdUXgKYdj2M6qBU12dd3f2hslZsekVZFmhfcnb584LbCPIdl3BlF5ILjjwOQz3njf_/exec";

fetch(`${endpoint}?check=${token}`)
  .then(res => res.text())
  .then(res => {
    if (res === "YA_USADO") {
      girado = true;
      alert("Este token ya fue utilizado. No puedes girar la ruleta más de una vez.");
      spinButton.disabled = true;
    }
  });

let canvasSize = 500;

const resizeCanvas = () => {
  canvasSize = Math.min(window.innerWidth * 0.9, 500);
  canvas.width = canvasSize;
  canvas.height = canvasSize;
};

const drawWheel = () => {
  const numPremios = premios.length;
  const arc = (2 * Math.PI) / numPremios;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = canvas.width / 2;

  for (let i = 0; i < numPremios; i++) {
    const angle = i * arc;
    ctx.beginPath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, angle, angle + arc);
    ctx.fill();

    ctx.save();
    ctx.fillStyle = "#000";
    ctx.translate(cx, cy);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.font = `${canvasSize * 0.045}px Arial`;
    const lines = premios[i].split("\n");
    for (let j = 0; j < lines.length; j++) {
      ctx.fillText(lines[j], radius - 10, (j - 0.5) * 20);
    }
    ctx.restore();
  }
};

let angle = 0;
let isSpinning = false;

const spinWheel = () => {
  if (!token) {
    alert("No tienes un token válido.");
    return;
  }
  if (girado) {
    alert("Ya has girado la ruleta.");
    return;
  }

  isSpinning = true;
  const fixedIndex = premios.findIndex(p => p.includes("1 Renovación"));
  const degreesPerPrize = 360 / premios.length;
  const pointerOffset = 90;
  const rotation = 360 * 5 + (360 - (fixedIndex * degreesPerPrize + degreesPerPrize / 2)) + pointerOffset;

  const duration = 5000;
  const start = performance.now();

  const animate = (time) => {
    let progress = (time - start) / duration;
    if (progress > 1) progress = 1;

    angle = rotation * progress;

    fuego.style.transform = `translateX(-50%) rotate(${angle}deg)`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    drawWheel();
    ctx.restore();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isSpinning = false;
      const premio = premios[fixedIndex];
      resultado.textContent = "¡Felicidades! Ganaste: " + premio;

      fetch(`${endpoint}?token=${token}&premio=${encodeURIComponent(premio)}`)
        .then(res => res.text())
        .then(data => {
          girado = true;
          spinButton.disabled = true;
        });
    }
  };

  requestAnimationFrame(animate);
};

resizeCanvas();
drawWheel();

window.addEventListener("resize", () => {
  resizeCanvas();
  drawWheel();
});

spinButton.addEventListener("click", () => {
  if (!isSpinning) spinWheel();
});
