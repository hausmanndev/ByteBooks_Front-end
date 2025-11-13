// Captura elementos da página
const campoBusca = document.getElementById('buscar');
const generoFiltros = document.querySelectorAll('input[name="genero"]');
const precoFiltros = document.querySelectorAll('input[name="preco"]');
const produtos = document.querySelectorAll('.product-card');

// Função principal de filtragem
function filtrar() {
  const busca = campoBusca.value.toLowerCase();
  const generoSelecionado = [...generoFiltros].find(f => f.checked)?.value || '';
  const precoSelecionado = [...precoFiltros].find(f => f.checked)?.value || '';

  produtos.forEach(produto => {
    const nome = produto.dataset.nome.toLowerCase();
    const genero = produto.dataset.genero;
    const preco = parseFloat(produto.dataset.preco);

    const nomeOK = nome.includes(busca);
    const generoOK = generoSelecionado ? genero === generoSelecionado : true;
    let precoOK = true;

    if (precoSelecionado) {
      const [min, max] = precoSelecionado.split('-').map(Number);
      precoOK = preco >= min && preco <= max;
    }

    // Mostra ou esconde o card conforme os filtros
    if (nomeOK && generoOK && precoOK) {
      produto.classList.remove('invisivel');
    } else {
      produto.classList.add('invisivel');
    }
  });
}

// Eventos
campoBusca.addEventListener('input', filtrar);
generoFiltros.forEach(f => f.addEventListener('change', filtrar));
precoFiltros.forEach(f => f.addEventListener('change', filtrar));

//POP UP 
// ====== POPUP (DETALHES DO LIVRO) ======

const popup = document.getElementById('popup');
const popupImg = document.getElementById('popupImg');
const popupTitulo = document.getElementById('popupTitulo');
const popupDescricao = document.getElementById('popupDescricao');
const popupPreco = document.getElementById('popupPreco');
const fecharPopup = document.getElementById('fecharPopup');

// Captura todos os botões de detalhes
const botoesDetalhes = document.querySelectorAll('.btn-details');

// Quando clicar em "Detalhes"
botoesDetalhes.forEach(botao => {
  botao.addEventListener('click', () => {
    const card = botao.closest('.product-card');

    // Pega os dados do card
    const nome = card.dataset.nome;
    const descricao = card.dataset.descricao;
    const imagem = card.dataset.imagem;
    const preco = parseFloat(card.dataset.preco).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    // Preenche o popup
    popupTitulo.textContent = nome;
    popupDescricao.textContent = descricao;
    popupImg.src = imagem;
    popupPreco.textContent = preco;

    // Mostra o popup
    popup.style.display = 'flex';
  });
});

// Botão para fechar
fecharPopup.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Fecha clicando fora do conteúdo
window.addEventListener('click', (e) => {
  if (e.target === popup) popup.style.display = 'none';
});
