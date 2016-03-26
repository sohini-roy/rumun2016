

/*var ele = document.getElementById('contact-form');
if(ele.addEventListener){
    ele.addEventListener("submit", callback, false);  //Modern browsers
}else if(ele.attachEvent){
    ele.attachEvent('onsubmit', callback);            //Old IE
}*/
$("#contact-form").submit(function(e){
    var form = $(this);
    $.ajax({
         url   : '/sendmail',
         type  : 'post',
         data  : form.serialize(), // data to be submitted
         success: function(data){
           if(data.err){
             console.log(data.msg);
             Materialize.toast('There was some problem. Please try again later', 4000);
           }else{
             $('#contact-form').trigger("reset");
             $('#contact-form').find('.btn-large').removeClass();
             $('#contact-form').find('button').addClass('btn-large');
             $('#contact-form').find('button').addClass('disabled');
             console.log("Successfully sent mail");
             Materialize.toast('Message Succesfully Sent', 4000);
           }
         }
    });
    return false;
 });
