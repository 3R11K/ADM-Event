let user = ""

document.addEventListener("DOMContentLoaded", function() {
  const xml = new XMLHttpRequest()
  document.getElementById("home").onclick = function() {
    // Redirecionando para a nova rota
    window.location.href = "/home";
  };
  xml.open("GET", "/api/download/certificado", true)
  xml.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      const data = JSON.parse(this.responseText)

      user = data.userName

      const userName = data.userName
      const RG = data.RG
      const dia = new Date().getDate()

      document.getElementById("name").innerHTML = userName
      document.getElementById("rg").innerHTML = RG
      document.getElementById("dia").innerHTML = dia
    }else if(this.status == 400){
      window.location.href = "/home"
    }
  }
  xml.send()

  document.getElementById("certificado").onclick = function() {
    const divParaConverter = document.getElementById('imgCertificado');

// Use html2canvas para criar uma imagem a partir da div
    html2canvas(divParaConverter).then(function (canvas) {
      // O resultado é um elemento canvas que contém a imagem
      // Agora você pode criar uma URL da imagem e disponibilizá-la para download
      const imgData = canvas.toDataURL('image/png');

      // Crie um elemento de link para download
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `CertificadoSEAUPP-${user}.png`; // Nome do arquivo de imagem

      // Simule um clique no link para iniciar o download
      link.click();
      });
  }
});

