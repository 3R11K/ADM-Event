document.addEventListener("DOMContentLoaded", function() {
    const feedback = document.getElementById("feedback")
    const certificado = document.getElementById("certificado")

    //verificar se pode pegar certificado e feedback
    const xml = new XMLHttpRequest()
    xml.open("GET", "/api/event", true)
    xml.onreadystatechange = function(){
        console.log(xml.responseText)
        if(xml.status == 200){
            console.log("ok")
        }else{
            feedback.remove()
            certificado.remove()
        }
    }
    xml.send()
});