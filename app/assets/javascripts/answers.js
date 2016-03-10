// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var data = [];
var colours = ['red', 'green', 'orange', 'blue', 'light-blue'];

$(document).ready(function(){
  $('#choices-form input[type=submit]').on('click', function(){
    var button_value = $(this).val();
    console.log(button_value);
    $('#choices-form input[type=text]').val(button_value);
  });

  $('.toggle-fullscreen').on('click', function(){
    var targetElement = $('.screen')[0];
    if(screenfull.enabled){
      screenfull.toggle(targetElement);
    }
  });

  colours.sort(pickRandom);
  $('.answer-card').each(function(i){
    $(this).addClass(colours[i]);
  });

  $('#binary-choice-form input[type=submit]').on('click', function(){
    var button_value = $(this).val();
    console.log(button_value);
    $('#binary-choice-form input[type=text]').val(button_value);
  });
});

function pickRandom(){
  return Math.round(Math.random());
}

function randomColor(){
  var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

function createObjectArray(wordsArray){
  var objectArray = [];
  var copyArray = wordsArray.slice(0);

  for(var i=0; i<wordsArray.length;i++){
    var counter = 0;
    for(var w=0; w<copyArray.length;w++){
      if(wordsArray[i] == copyArray[w]){
        counter++;
        delete copyArray[w];
      }
    }
    if(counter > 0){
      var obj = new Object();
      obj.text = wordsArray[i];
      obj.weight = counter;
      objectArray.push(obj);
    }
  }
  return objectArray;
}

function drawWordCloud() {
  var words = $.ajax({
    url: '/questions/' + question_id + '/words',
    dataType: 'json',
    async: false
  }).responseText;
  /*
    word_array = [
      {text: "word1", weight: 15},
      {text: "word2", weight: 20}
    ]
  */
  var parsed = JSON.parse(words);
  var arr = [];

  for(var element in parsed){
    arr.push(parsed[element]);
  }
  var word_array = createObjectArray(arr);
  // console.log(JSON.stringify(word_array));

  $("#cloud").jQCloud(word_array ,{
    autoResize: true,
    colors: ["cornflowerblue",
			"olivedrab",
			"orange",
			"tomato",
			"crimson",
			"purple",
			"turquoise",
			"forestgreen",
			"navy",
			"gray"
		],
    fontSize: {
      from: 0.1,
      to: 0.04
    }
  });

  $('#cloud').jQCloud('update', word_array);

}

setInterval(get_data,2000);
