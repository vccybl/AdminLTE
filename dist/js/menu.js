var page=''
var value_id = ''
$.each([ "inside","banner","faq","insurance","news","office","partners","process","textos", "user" ], function( index, value ) {
 page = value +".html"
 value_id = value +"_menu"
 
 if ($.inArray(page, window.location.pathname.split("/")) != -1) {
   
   $('li[id=' + value_id + ']').addClass("menu-open");
   $('li[id=' + value_id + '] > a').addClass("active");
 }
});