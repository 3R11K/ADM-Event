document.addEventListener("DOMContentLoaded", function(event) {
    //botão sair
    document.getElementById("sair").onclick = function(event){
        event.preventDefault();
        //faz logout
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "/api/logout", false);
        xmlhttp.onreadystatechange = function(){
            //console.log("Requisição pronta");
            if (this.readyState == 4 && this.status == 200) { 
                //desloga               
                window.location.href = "/";
            }
            else{
                console.log("Erro ao fazer logout");
            }
        }
        xmlhttp.send();
    };
});