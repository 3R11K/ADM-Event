let security = 0;

document.addEventListener('DOMContentLoaded', () => {
    aleatorySecurity();

    document.getElementById("encerrar").onclick = () => {
        openPasswordModal();
    };

    document.getElementById("cancelar").onclick = () => {
        cancel();
    };

    document.getElementById("confirmar").onclick = () => {
        checkPassword();
    }
});

function openPasswordModal() {
    document.getElementById('passwordModal').style.width = '50vw';
    document.getElementById('passwordModal').style.paddingRight = '10px';
    document.getElementById('passwordModal').style.paddingLeft = '10px';
    document.getElementById('passwordModal').style.border = '#55C02B solid 4px';
    document.getElementById('overlay').style.display = 'flex'; 
}
//senha com 5 digitos
function aleatorySecurity() {
    security = Math.floor(Math.random() * 90000) + 10000;
    document.getElementById('security').innerHTML += security;
}

function cancel() {
    document.getElementById('passwordModal').style.width = '0';
    document.getElementById('passwordModal').style.paddingRight = '0';
    document.getElementById('passwordModal').style.paddingLeft = '0';
    document.getElementById('passwordModal').style.border = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function checkPassword() {
    let password = document.getElementById('senha').value;
    if(password == security) {
        document.getElementById('passwordModal').style.width = '0';
        document.getElementById('passwordModal').style.paddingRight = '0';
        document.getElementById('passwordModal').style.paddingLeft = '0';
        document.getElementById('passwordModal').style.border = 'none';
        document.getElementById('overlay').style.display = 'none';
        
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "/api/finish-event", true);
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 202) {
                alert('Evento encerrado com sucesso');
                window.location.href = '/home-adm';
            }else if(this.readyState == 4 && this.status == 400){
                alert('Erro ao encerrar evento');
            }
        };
        xmlhttp.send();

        
    } else {
        alert('Senha incorreta');
    }
}