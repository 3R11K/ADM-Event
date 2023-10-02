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
    content = decodeURIComponent(escape(content));

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
      let rearCamera = cameras.find(camera => camera.name.includes('rear') || camera.name.includes('back'));

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
    loading()
    checkOut();
  }

  //funçoes checkout em massa
  aleatorySecurity();

  document.getElementById("checkout").addEventListener("click", function() {
      console.log('openPasswordModal() called');
      document.getElementById('passwordModal').style.width = '50vw';
      document.getElementById('passwordModal').style.paddingRight = '10px';
      document.getElementById('passwordModal').style.paddingLeft = '10px';
      document.getElementById('passwordModal').style.border = '#55C02B solid 4px';
      document.getElementById('overlay').style.display = 'flex'; 
  });

  document.getElementById("cancelar").onclick = () => {
      cancel();
  };

  document.getElementById("continuar").onclick = () => {
      loading()
      checkPassword();
  }
});

function checkOut() {
  if(userId != 0, email != "", name != "", RG != "") {
    let data = {
      userID: userId,
      email: email,
      name: name,
      RG: RG
    }

    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "/api/check-out", false);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.onreadystatechange = function() {
      loaded()
      if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        alert("checkout realizado com sucesso!");
        window.location.href = "/home-adm";
      }else if(xmlHttp.readyState == 4 && xmlHttp.status == 400) {
        alert("Erro ao realizar checkout!");
        window.location.href = "/home-adm";
      }
    }
    xmlHttp.send(JSON.stringify(data));

  }
}


function openPasswordModal() {
  console.log('openPasswordModal() called');
  document.getElementById('passwordModal').style.width = '50vw';
  document.getElementById('passwordModal').style.paddingRight = '10px';
  document.getElementById('passwordModal').style.paddingLeft = '10px';
  document.getElementById('passwordModal').style.border = '#55C02B solid 4px';
  document.getElementById('overlay').style.display = 'flex'; 
}
//senha com 5 digitos
function aleatorySecurity() {
  security = Math.floor(Math.random() * 90000) + 10000;
  document.getElementById('security').innerHTML += security;
}

function cancel() {
  document.getElementById('passwordModal').style.width = '0';
  document.getElementById('passwordModal').style.paddingRight = '0';
  document.getElementById('passwordModal').style.paddingLeft = '0';
  document.getElementById('passwordModal').style.border = 'none';
  document.getElementById('overlay').style.display = 'none';
}

function checkPassword() {
  let password = document.getElementById('senha').value;
  if(password == security) {
      document.getElementById('passwordModal').style.width = '0';
      document.getElementById('passwordModal').style.paddingRight = '0';
      document.getElementById('passwordModal').style.paddingLeft = '0';
      document.getElementById('passwordModal').style.border = 'none';
      document.getElementById('overlay').style.display = 'none';
      const xml = new XMLHttpRequest();
      console.log("entrei");
      xml.open("GET", "/api/check-out-all", true);
      xml.onreadystatechange = function() {
        loaded()
        if(xml.readyState == 4 && xml.status == 200) {
          alert("Check-out em massa realizado com sucesso!");
          window.location.href = "/home-adm";
        }else if(xml.readyState == 4 && xml.status == 400) {
          alert("Erro ao realizar check-out!");
          window.location.href = "/home-adm";
        }else if(xml.readyState == 4 && xml.status == 500) {
          alert("Erro ao realizar check-out!");
          window.location.href = "/home-adm";
        }else if(xml.readyState == 4 && xml.status == 404) {
          alert("Erro ao realizar check-out!");
          window.location.href = "/home-adm";
        }
    }
    xml.send();
  } else {
      alert('Senha incorreta');
  }
}

function loading() {
  document.getElementById('loadingOverlay').style.display = 'flex';
}

function loaded() {
  document.getElementById('loadingOverlay').style.display = 'none';
}