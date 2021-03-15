//API url definition
window.ApiURL='http://localhost:8080/api/'
window.WebURL='http://localhost:3000/'
function setCookie(cname,cvalue,exdays,path) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path="+path +";samesite=strict";
	  //alert ("COOKIE VALUE: "+cname + "=" + cvalue + ";" + expires + ";path="+path +";samesite=strict")
  }
  
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
  	//alert ("LIST  COOKIES: "+ ca)
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  function expireCookie(cname) {
    document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;secure;samesite=strict";
  }
  function checkCookie() {
    var valcookie=getCookie("mine");
    //alert (valcookie)
    if (valcookie == "") {
        window.location.replace("noauth.html");
    }
  }

  const chunksParser = body => {
    return body
      .replace(/^(\w{1,3})\r\n/, "") // replace header chunks info 
      .replace(/\r\n(\w{1,3})\r\n/, "") // replace in-body chunks info
      .replace(/(\r\n0\r\n\r\n)$/, ""); // replace end chunks info
  };




