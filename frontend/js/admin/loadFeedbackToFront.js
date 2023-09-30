console.log("feedbacks.js loaded"); 

document.addEventListener("DOMContentLoaded", function(event) {

  document.getElementById("home").onclick = function() {
    // Redirecionando para a nova rota
    window.location.href = "/home-adm";
  };

  console.log("load feedbacks")
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "/api/load-feedbacks", true);
  xmlhttp.onreadystatechange = () => {
    document.getElementById("loadingOverlay").style.display = "none";
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      const feedbacks = JSON.parse(xmlhttp.response);
      const numFeedbacks = Object.keys(feedbacks).length;

      if(numFeedbacks > 3){
        document.getElementById("comentarios").style.overflowY = "scroll";
      }

      if (numFeedbacks === 0) {
        document.getElementById("comentarios").innerHTML = "<p>Não há feedbacks</p>";
      }
      else{
        for (const key in feedbacks) {
            if (feedbacks.hasOwnProperty(key)) {
                const comment = feedbacks[key];
                let newComment = `<div id="nome">${key}</div>
                                  <div id="feedback">
                                      <pr>${comment}</pr>
                                  </div>`
                newComment += '<style>#feedback { margin-bottom: 1vh; overflow-x: auto;}</style>';
                document.getElementById("comentarios").innerHTML += newComment;
            }
        }
    }
    }else if(xmlhttp.readyState == 4 && xmlhttp.status == 400){
      alert(xmlhttp.responseText);
    }
  }
  xmlhttp.send();

});
