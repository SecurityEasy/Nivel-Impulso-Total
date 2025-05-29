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

fetch("https://script.google.com/macros/s/AKfycbwdUXgKYdj2M6qBU12dd3f2hslZsekVZFmhfcnb584LbCPIdl3BlF5ILjjwOQz3njf_/exec?check=" + token)
  .then(res => res.text())
  .then(res => {
    if (res === "YA_USADO") {
      girado = true;
      alert("Este token ya fue utilizado. No puedes girar la ruleta más de una vez.");
      spinButton.disabled = true;
    }
  });
