document.addEventListener("DOMContentLoaded", function() {
  const xml = new XMLHttpRequest()
  xml.open("GET", "/api/event", true)
  xml.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      console.log("evento")
    }else{
      window.location.href = "/home"
    }
  }
  xml.send()

  document.getElementById("home").onclick = function() {
    // Redirecionando para a nova rota
    window.location.href = "/home";
  };
  xml.open("GET", "/api/download/certificado", true)
  xml.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      const data = JSON.parse(this.responseText)

      const userName = data.userName
      const RG = data.RG
      const dia = new Date().getDate()

      document.getElementById("name").innerHTML = userName
      document.getElementById("rg").innerHTML = RG
      document.getElementById("dia").innerHTML = dia
    }else{
      window.location.href = "/home"
    }
  }

});

