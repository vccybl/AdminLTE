var page=''
var value_id = ''
var mainbar_id = ''
$.each([ "inside","banner","faq","insurance","news","office","partners","process","textos", "user" ], function( index, value ) {
 page = value +".html"
 value_id = value +"_menu"
 mainbar_id = value +"_mainbar"
 //console.log (page)
 if ($.inArray(page, window.location.pathname.split("/")) != -1) {
   
   $('li[id=' + value_id + ']').addClass("menu-open");
   $('li[id=' + value_id + '] > a').addClass("active");
   $('li[id=' + mainbar_id + ']').addClass("open");
   $('li[id=' + mainbar_id + '] > a').addClass("active");
 }
});