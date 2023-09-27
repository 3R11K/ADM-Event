document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("entrar").onclick = (event) => {
        
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        document.body.innerHTML += `<div class="overlay" id="loadingOverlay">
                                        <span class="loader"></span>
                                    </div>`;

        if (email == "" || senha == "") {
            alert("Preencha todos os campos!");
        }else{
            const data = {
                email: email,
                password: senha
            }
            console.log(JSON.stringify(data));

            // Enviar dados para o backend
            const xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "/api/admin/login", true);
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            xmlhttp.onreadystatechange = () => {
                console.log("entrou")
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    window.location.href = "/home-adm";
                }else if(xmlhttp.readyState == 4 && xmlhttp.status == 400){
                    alert(xmlhttp.responseText);
                }
            }
            xmlhttp.send(JSON.stringify(data));
        }
    }
});