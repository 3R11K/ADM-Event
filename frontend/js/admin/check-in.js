let userId = 0;
let email = "";
let name = "";
let RG = "";

document.addEventListener('DOMContentLoaded', function () {
  const scannerElement = document.getElementById('scanner');

  // Crie um scanner Instascan na camera traseira
  const scanner = new Instascan.Scanner({ video: scannerElement });

  // Defina uma função para lidar com os resultados dos scans
  scanner.addListener('scan', function (content) {
    content = JSON.parse(content);
    document.getElementById('inName').innerHTML = content.name;
    document.getElementById('inRG').innerHTML = content.RG;

    userId = content.userID;
    email = content.email;
    name = content.name;
    RG = content.RG;

  });

  // Inicie a câmera traseira e comece a scanear
  Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) { 
      //alertar nomes das cameras
      let rearCamera = cameras.find(camera => camera.name.includes('rear') || camera.name.includes('back') || camera.name.includes('traseira') || camera.name.includes('tras') || camera.name.includes('trás') || camera.name.includes('traseiro') || camera.name.includes('trasero') || camera.name.includes('trás') || camera.name.includes('Traseira'));

      // Se não encontrar uma câmera traseira, use a primeira câmera disponível
      if (!rearCamera) {
        rearCamera = cameras[0];
      }
      if (rearCamera) {
        scannerElement.classList.add('flip-camera');
      }

      // Inicie o scanner com a câmera traseira
      scanner.start(rearCamera);
    } else {
      console.error('Nenhuma câmera encontrada.');
    }
  }).catch(function (error) {
    console.error(error);
  });

  document.getElementById("home").onclick = function() {
    // Redirecionando para a nova rota
    window.location.href = "/home-adm";
  };

  document.getElementById("confirmar").onclick = function() {
    checkIn();
    alert("botão clicado")
  }
});

function checkIn() {
  if(userId != 0, email != "", name != "", RG != "") {
    let data = {
      userID: userId,
      email: email,
      name: name,
      RG: RG
    }

    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "/api/check-in", false);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.onreadystatechange = function() {
      if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        alert("Check-in realizado com sucesso!");
        window.location.href = "/home-adm";
      }else if(xmlHttp.readyState == 4 && xmlHttp.status == 400) {
        alert("Erro ao realizar check-in!");
        window.location.href = "/home-adm";
      }
    }
    xmlHttp.send(JSON.stringify(data));

  }
}