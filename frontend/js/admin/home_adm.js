// Funções onclick para os botões da home do adm
document.addEventListener("DOMContentLoaded", function() {
  feedbackButton();
  document.getElementById("feedbacks").onclick = function() {
      // Redirecionando para a nova rota
      window.location.href = "/view-feedbacks";
    };
    document.getElementById("checkout").onclick = function() {
      // Redirecionando para a nova rota
      window.location.href = "/valid-checkout";
    };
    document.getElementById("check-in").onclick = function() {
      // Redirecionando para a nova rota
      window.location.href = "/valid-checkin";
    };
});

// Função para verificar se o feedback está ativo
function feedbackButton() {
  // Fazendo uma requisição GET para a rota /check-feedback
  fetch("/api/check-feedback")
    .then((res) => {
      // Se a resposta for 200, o feedback está ativo
      if (res.status === 200) {
        
        // Então, mude o texto do botão para "Finalizar evento"
        console.log("Feedback ativo");
      }else{
        document.getElementById("feedbacks").remove()
      }
    })
    .catch((err) => {
      // Se a requisição falhar, mostre o erro no console
      console.error(err);
    });
}