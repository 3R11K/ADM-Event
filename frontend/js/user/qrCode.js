document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM completamente carregado e analisado");
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/api/qrCodeGet", false);
    //quando a requisição estiver pronta
    xmlhttp.onreadystatechange = function(){
        console.log("Requisição pronta");
        if (this.readyState == 4 && this.status == 200) {
            //resposta para objeto
            const response = JSON.parse(this.responseText);
            //preenche os campos
            console.log(response);
            document.getElementById("yourQR").src = response.url;
            //remover o overlay de carregamento e loading
            document.getElementById("loadingOverlay").remove();
        }
        else{
            console.log("Erro ao carregar QR Code");
        }
    }
    xmlhttp.send();

    //botão download convertendo base64 para imagem
    document.getElementById("downloadQR").onclick = function(event){

        event.preventDefault();
        
        xmlhttp.open("GET", "/api/qrCodeGet", false);
    
        // Quando a requisição estiver pronta
        xmlhttp.onreadystatechange = function(){
            console.log("Requisição pronta");
            if (this.readyState == 4 && this.status == 200) {
                // Resposta para objeto
                const response = JSON.parse(this.responseText);
    
                var imageUrl = response.url; // Renomeie a variável para imageUrl
    
                console.log(imageUrl);
    
                // Crie um elemento "a" para o download
                var a = document.createElement("a");
    
                // Converta a imagem base64 em um blob
                var blob = dataURItoBlob(imageUrl); // Use imageUrl aqui
    
                // Crie uma URL para o blob
                var blobUrl = window.URL.createObjectURL(blob); // Renomeie a variável para blobUrl
    
                // Defina os atributos do elemento "a"
                a.href = blobUrl;
                a.download = "imagem.png"; // Nome do arquivo que será baixado
                    
                // Simule um clique no elemento "a" para iniciar o download
                a.click();
                    
                // Libere a URL do blob após o download
                window.URL.revokeObjectURL(blobUrl);
            }
            else{
                console.log("Erro ao BAIXAR QR Code");
            }
        }
        xmlhttp.send();
    }

    document.getElementById("home").onclick = function() {
        // Redirecionando para a nova rota
        window.location.href = "/home";
    };
});

// Function to convert a data URI to a Blob
function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}
