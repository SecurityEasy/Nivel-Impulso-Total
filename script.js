
const premios = [
  "Envío Gratis DHL ó 10 Sims Telcel",
  "1 Renovación Anual",
  "2 Renovaciones Anuales",
  "1 ET200N + 5 Sims Telcel",
  "1 R83 + 5 Sims Telcel"
];

const colors = ["#f77f00", "#fcbf49", "#eae2b7", "#90e0ef", "#d62828"];

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spin");
const resultado = document.getElementById("resultado");

const token = new URLSearchParams(window.location.search).get("token");
let girado = localStorage.getItem("giro_" + token);

const drawWheel = () => {
  const numPremios = premios.length;
  const arc = (2 * Math.PI) / numPremios;

  for (let i = 0; i < numPremios; i++) {
    const angle = i * arc;
    ctx.beginPath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, angle, angle + arc);
    ctx.fill();

    ctx.save();
    ctx.fillStyle = "#000";
    ctx.translate(250, 250);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.font = "16px Arial";
    ctx.fillText(premios[i], 240, 10);
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
    ctx.translate(250, 250);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-250, -250);
    drawWheel();
    ctx.restore();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isSpinning = false;
      const premio = premios[randomIndex];
      resultado.textContent = "¡Felicidades! Ganaste: " + premio;

      localStorage.setItem("giro_" + token, true);

      // Enviar al Web App
      fetch("https://script.google.com/macros/s/AKfycby40xDc5j_S72PdeS-jwoh64_ZSdACLswAnCNJAuLTqu-VFrs7CIl55rkeUU0Yu93tU/exec?token=" + token + "&premio=" + encodeURIComponent(premio));
    }
  };

  requestAnimationFrame(animate);
};

drawWheel();
spinButton.addEventListener("click", () => {
  if (!isSpinning) {
    spinWheel();
  }
});
