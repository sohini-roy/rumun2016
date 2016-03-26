

/*var ele = document.getElementById('contact-form');
if(ele.addEventListener){
    ele.addEventListener("submit", callback, false);  //Modern browsers
}else if(ele.attachEvent){
    ele.attachEvent('onsubmit', callback);            //Old IE
}*/
$("#contact-form").submit(function(e){
    var form = $(this);
    $.ajax({
         url   : form.attr('action'),
         type  : form.attr('method'),
         data  : form.serialize(), // data to be submitted
         success: function(data){
           if(data.err){
             console.log(data.msg);
           }else{
             $('#contact-form').trigger("reset");
             console.log("Successfully sent mail");
           }
         }
    });
    return false;
 });
