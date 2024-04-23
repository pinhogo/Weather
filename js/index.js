function toggleBackground(event, element) {
    event.preventDefault(); // ÀLterar depois
    
    var links = document.querySelectorAll('.proxDays a'); // Selecionar todos os links
  
    // Remover a classe "clicked" de todos os elementos
    links.forEach(function(link) {
      link.classList.remove('clicked');
    });
    
    // Adicionar a classe "clicked" apenas ao elemento clicado
    element.classList.add('clicked');
  }

  function DataAtual() {
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = meses[dataAtual.getMonth()];
    const ano = dataAtual.getFullYear();

    let day = `${dia} de ${mes} de ${ano}`;

    // Atualize o conteúdo do elemento com ID "atualday" com a data atual
    document.getElementById("atualday").textContent = day;
}

document.addEventListener('DOMContentLoaded', function() {
  DataAtual();
});
  