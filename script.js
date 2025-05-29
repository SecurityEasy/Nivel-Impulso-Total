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

const token = new URLSearchParams(window.location.search).get("token");
let girado = false;

// ✅ URL NUEVA DE APPS SCRIPT
const endpoint = "https://script.google.com/macros/s/AKfycbwdUXgKYdj2M6qBU12dd3f2hslZsekVZFmhfcnb584LbCPIdl3BlF5ILjjwOQz3njf_/exec";

// Verifica si ya se usó el token
fetch(endpoint + "?check=" + token)
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
  const randomIndex = Math.floor(Math.random() * premios.length);
  const degreesPerPrize = 360 / premios.length;
  const rotation = 360 * 5 + randomIndex * degreesPerPrize + degreesPerPrize / 2;

  const duration = 5000;
  const start = performance.now();

  const animate = (time) => {
    let progress = (time - start) / duration;
    if (progress > 1) progress = 1;

    angle = rotation * progress;

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
      const finalAngle = (angle % 360 + 360) % 360;
      const index = Math.floor((premios.length - (finalAngle / (360 / premios.length))) % premios.length);
      const premio = premios[index];
      resultado.textContent = "¡Felicidades! Ganaste: " + premio;

      // Registrar el premio en Apps Script
      fetch(`${endpoint}?token=${token}&premio=${encodeURIComponent(premio)}`)
        .then(response => response.text())
.then(data => {
  console.log("✅ Premio registrado: ", data);
  girado = true;
  spinButton.disabled = true;

  // ✅ MENSAJE FLOTANTE DE ÉXITO
  const notif = document.createElement("div");
  notif.textContent = "✅ ¡Gracias por participar! Tu premio fue registrado exitosamente 🎁";
  Object.assign(notif.style, {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#28a745",
    color: "white",
    padding: "16px 24px",
    borderRadius: "10px",
    fontSize: "1.1rem",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
    zIndex: "999999",
    opacity: "1",
    transition: "opacity 0.5s ease"
  });
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.style.opacity = "0";
    setTimeout(() => notif.remove(), 500);
  }, 6000);
})

  requestAnimationFrame(animate);
};

resizeCanvas();
drawWheel();

window.addEventListener("resize", () => {
  resizeCanvas();
  drawWheel();
});

spinButton.addEventListener("click", () => {
  if (!isSpinning) {
    spinWheel();
  }
});
