document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("qrcode").onclick = function() {
    // Redirecionando para a nova rota
    window.location.href = "/qrCode";
  };

// Obtém uma referência para o botão
var downloadButton = document.getElementById("dados");

// Adiciona um ouvinte de evento de clique ao botão
downloadButton.addEventListener("click", function() {
  // URL do arquivo PDF no servidor local
  var pdfUrl = "api/download/cronograma"; // Use a rota local do seu servidor

  // Cria um elemento de link temporário
  var link = document.createElement("a");
  link.href = pdfUrl;

  // Define o atributo "download" para indicar que é um download
  link.setAttribute("download", "cronograma.pdf");

  // Aciona o clique no elemento de link
  link.click();
});


  document.getElementById("perfil").onclick = function() {
    // Redirecionando para a nova rota
    window.location.href = "/profile";
  };
  document.getElementById("feedback").onclick = function() {
    // Redirecionando para a nova rota
    window.location.href = "/feedback";
  };

  document.getElementById("certificado").onclick = function() {
    window.location.href = "/certificado";
  }
});


  