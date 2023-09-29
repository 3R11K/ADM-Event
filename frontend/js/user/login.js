document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("entrar").onclick = function() {
        document.body.innerHTML += `<div class="overlay" id="loadingOverlay">
                                        <span class="loader"></span>
                                    </div>`;
    
        // Pegar dados do form
        let email = document.getElementById("email").value;
        let RG = document.getElementById("rg").value;
        console.log(RG);
    
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
                    alert("Email ou RG incorretos");
                    //recarregar a página
                    window.location.href = "/";
                }
            })
        }
    }
    
});
