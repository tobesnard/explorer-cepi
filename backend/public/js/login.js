$('#profils button').click(function(e){
    $('#profils button').css('opacity','1')
    $('#profils button').show()
    $('#profils button').not(e.target).animate({
        opacity: "0"
      }, 1000, function() {
        $('#profils button').not(e.target).hide('slow')
        $('#reset button').css('opacity','1')
        $('#logins').show()
      });
      
})

$('#reset button').click(function(e){
    $('#logins').hide()
    $('#profils button').show()
    $('#profils button').animate({ 
        opacity: "1"
        }, 1000, function() {
            $('#reset button').css('opacity',0)
    });
})

// $("form#logins button[type='submit']").click(function(e){
//     e.preventDefault();
//     document.location.href="html/explorer.html"


// })