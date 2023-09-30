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
            alert("Erro ao carregar QR Code");
        }
    }
    xmlhttp.send();

    //botão download convertendo base64 para imagem
    document.getElementById("download").onclick = function(event) {
        event.preventDefault(); // Impede o comportamento padrão do link
    
        // Selecionar a imagem pelo ID
        const imagem = document.getElementById('yourQR'); // Substitua 'id-da-imagem' pelo ID real da sua imagem
    
        // Obter o URL da imagem
        const urlDaImagem = imagem.src;
    
        // Criar um link de download
        const linkDeDownload = document.createElement('a');
        linkDeDownload.href = urlDaImagem;
    
        // Definir o nome do arquivo de download (opcional)
        linkDeDownload.download = 'qrCodeSEAUPP.jpg'; // Substitua 'nome-da-imagem.jpg' pelo nome desejado
        linkDeDownload.setAttribute('target', '_blank');
    
        // Disparar o clique para iniciar o download
        linkDeDownload.click();
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
