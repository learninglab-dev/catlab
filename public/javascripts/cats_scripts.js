console.log("cats_scripts");




$('#rating_slider').on('change', function(){
    $('#rating').text($('#rating_slider').val());
});

$('#rating').on('keyup', function(){
    $('#rating_slider').val($('#rating').val());
});



$("#enter").click(function(){
  var posting = {catId: $("#catId").val(), loadTs: Date.now(), rating: $("#rating_slider").val()};
  console.log("just clicked");
  console.log(JSON.stringify(posting, null, 5));
  $.post('/catvote', posting);

})
