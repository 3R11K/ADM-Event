document.addEventListener('DOMContentLoaded', function () {

  //carregar dados do usuario
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "/api/profile", true);
  //quando a requisição estiver pronta
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //resposta para objeto
      const response = JSON.parse(this.responseText);
      //preenche os campos
      console.log(response);
      document.getElementById("nome").innerHTML +="<h5>"+ response.name +"</h5>";
      document.getElementById("email").innerHTML +="<h5>"+ response.email+"</h5>";
      document.getElementById("curso").innerHTML +="<h5>"+ response.curso+"</h5>";
      document.getElementById("minicurso_1").innerHTML +="<h5>"+ response.miniCursos.dia1+"</h5>";
      document.getElementById("minicurso_2").innerHTML +="<h5>"+ response.miniCursos.dia2+"</h5>";
      //remover o overlay de carregamento e loading
      document.getElementById("loadingOverlay").remove();
    }
  };
  xmlhttp.send();


  //rota home
  document.getElementById("home").onclick = function() {
    // Redirecionando para a nova rota
    window.location.href = "/home";
  };
})
