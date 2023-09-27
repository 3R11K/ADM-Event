console.log("feedbacks.js loaded"); 

document.addEventListener("DOMContentLoaded", function(event) {

  document.getElementById("home").onclick = function() {
    // Redirecionando para a nova rota
    window.location.href = "/home-adm";
  };

  console.log("load feedbacks")
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "/api/load-feedbacks", true);
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //log nas respostas
      console.log(xmlhttp.responseText);
    }else if(xmlhttp.readyState == 4 && xmlhttp.status == 400){
      alert(xmlhttp.responseText);
    }
  }

});
