<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hot Sale Security Easy – Nivel Impulso Total</title>
  <link rel="stylesheet" href="style.css" />
  <style>
    body {
      margin: 0;
      background-color: #111;
      color: white;
      font-family: 'Arial', sans-serif;
      text-align: center;
    }
    h1 {
      color: #ff3b3b;
      margin-bottom: 0.3em;
    }
    .instrucciones {
      margin-top: 0;
      font-size: 1rem;
      color: #e2e2e2;
    }
    .banner {
      max-width: 300px;
      margin: 10px auto 0;
      display: block;
    }
    .wheel-container {
      position: relative;
      display: inline-block;
      margin: 10px auto;
    }
    #wheel {
      background-color: transparent;
      border-radius: 50%;
      box-shadow: 0 0 20px rgba(255,255,255,0.2);
    }
    .logo {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 80px;
      height: 80px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
    }
    .pointer {
      position: absolute;
      top: 50%;
      right: -70px;
      width: 200px;
      height: auto;
      transform: translateY(-50%) rotate(-10deg);
    }
    #spin {
      margin-top: 30px;
      padding: 12px 30px;
      background-color: #f78f1e;
      color: white;
      border: none;
      border-radius: 25px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    #spin:hover {
      background-color: #ffb347;
    }
    #resultado {
      font-size: 1.2em;
      margin-top: 20px;
      color: #ffffff;
    }
  </style>
</head>
<body>
  <img src="assets/HOTSALE.png" alt="Hot Sale Banner" class="banner" />

  <h1>¡Gira la Security Ruleta y gana grandes premios!</h1>
  <p class="instrucciones">
    Recuerda que sólo podrás girar la ruleta una vez, tu premio nos llegará en automático, ¡mucha suerte!
  </p>

  <div class="wheel-container">
    <canvas id="wheel" width="500" height="500"></canvas>
    <img src="assets/logo.png" alt="Logo Security Easy" class="logo" />
    <img src="assets/fuego.png" alt="Pointer" class="pointer" />
  </div>

  <button id="spin">GIRAR</button>
  <p id="resultado"></p>

  <script src="script.js"></script>
</body>
</html>

