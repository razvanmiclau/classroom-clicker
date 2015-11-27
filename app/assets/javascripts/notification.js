$(document).ready(function(){
  setTimeout(function(){
    $('.notice-container').fadeOut('slow', function() {
      $(this).remove();
    })
  }, 2500);

  $('#notice').hide();
});
