$('.answers.index').ready(function(){
    $('#choices-form input[type=submit]').on('click', function(){
      var button_value = $(this).val();
      console.log(button_value);
      $('#choices-form input[type=text]').val(button_value);
    });
    $('#binary-choice-form input[type=submit]').on('click', function(){
      var button_value = $(this).val();
      console.log(button_value);
      $('#binary-choice-form input[type=text]').val(button_value);
    });
});
