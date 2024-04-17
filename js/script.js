$(document).ready(function() {
    var botao = $('.click1');
    var dropDown = $('.dropdown-menu');    
   
       botao.on('click', function(event){
           dropDown.stop(true,true).slideToggle();
           event.stopPropagation();
       });
   });