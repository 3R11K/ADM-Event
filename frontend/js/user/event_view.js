document.addEventListener("DOMContentLoaded", function() {
    const feedback = document.getElementById("feedback")
    const certificado = document.getElementById("certificado")

    //verificar se pode pegar certificado e feedback
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/api/event", true);
    xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            console.log("ok")
        }else if(this.readyState == 4 && this.status == 400){
            feedback.style.display = "none"
            certificado.style.display = "none"
        }
    };
    xmlhttp.send();
});