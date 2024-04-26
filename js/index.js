function toggleBackground(event, element) {
  
    
    var links = document.querySelectorAll('.proxDays div'); // Selecionar todos os links
  
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
    const dias = [
        "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
        "Quinta-feira", "Sexta-feira", "Sábado"
    ];

    const dataAtual = new Date();
      //dataAtual.setDate(dataAtual.getDate() + 1);
      NextDay(dataAtual)
    const dia = dataAtual.getDate();
    const diaSemana = dias[dataAtual.getDay()];
    const mes = meses[dataAtual.getMonth()];
    const ano = dataAtual.getFullYear();

    let day = `${diaSemana}, ${dia} de ${mes} de ${ano}`;

    // Atualize o conteúdo do elemento com ID "atualday" com a data atual
    document.getElementById("atualday").textContent = day;
}

document.addEventListener('DOMContentLoaded', function() {
  DataAtual();
});

function NextDay(data) {
  
  var proxDay = data.getDay() + 1; // Retorna um número de 0 (domingo) a 6 (sábado)
  
  var dayElement = document.querySelector('.proxDays .day' + proxDay);
  
  // Verifica se o elemento do dia da semana atual existe
  if (dayElement) {
    // Adiciona a classe "clicked" ao elemento do dia da semana atual
    dayElement.classList.add('clicked');
  }
}



  