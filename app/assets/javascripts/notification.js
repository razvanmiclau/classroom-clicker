$(document).ready(function(){
  // Notifications
  setTimeout(function(){
    $('.notice-container').fadeOut('slow', function() {
      $(this).remove();
    })
  }, 2500);

  $('#notice').hide();
});
