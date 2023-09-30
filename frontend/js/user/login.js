document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("entrar").onclick = function() {
        
    
        // Pegar dados do form
        let email = document.getElementById("email").value.trim();
        let RG = document.getElementById("rg").value.trim();

        console.log(RG);
        document.body.innerHTML += `<div class="overlay" id="loadingOverlay">
                                        <span class="loader"></span>
                                    </div>`;
        if (email !== "" && RG !== "") {
            // Enviar dados para o backend
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: RG })
            }).then((res) =>{
                console.log(res);
                if (res.status === 200) {
                    // Redirecionar para a página de login
                    window.location.href = "/home";
                } else {
                    // Exibir mensagem de erro
                    //texto da resposta
                    alert("Email ou RG incorretos \n" + res.statusText);
                    //recarregar a página
                    window.location.href = "/";
                }
            })
        }
    }
    
});
