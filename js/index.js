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
  