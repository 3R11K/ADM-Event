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

  document.getElementById("home").onclick = function() {
    // Redirecionando para a nova rota
    window.location.href = "/home";
  };
})

