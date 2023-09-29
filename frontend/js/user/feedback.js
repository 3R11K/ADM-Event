document.addEventListener('DOMContentLoaded', function() {

    document.getElementById("home").onclick = function() {
        // Redirecionando para a nova rota
        window.location.href = "/home";
    };


    document.getElementById("enviar").onclick = function() {
        console.log("enviando feedback");
        let feedback = document.getElementById("texto_1").value;
    
        if (feedback !== "") {
            // Enviar dados para o backend
            fetch('/api/add-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ feedback: feedback})
            }).then((res) =>{
                console.log(res);
                if (res.status === 200) {
                    alert("Feedback enviado com sucesso");
                    window.location.href = "/home";
                }
            })
        }
    }
    
});