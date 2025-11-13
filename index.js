document.getElementById("form-cadastro").addEventListener("submit", function(e) {
    e.preventDefault(); // impede o envio padrão

    // Pega os valores digitados
    const nome = encodeURIComponent(document.getElementById("nome").value);
    const email = encodeURIComponent(document.getElementById("email").value);

    // Redireciona para a página de cadastro com os dados na URL
    window.location.href = `cadastro.html?nome=${nome}&email=${email}`;
});
