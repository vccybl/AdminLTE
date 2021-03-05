const auth = async function makePostRequest() {
  const login = document.querySelector('#Email1').value;
  const pwd = document.querySelector('#PassWord1').value;
    var params = {
        username: login,
        password: pwd
      };
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
      };
      try {
        let res = await axios.post('http://localhost:8080/api/authenticate', params,axiosConfig);
        const data = res.data;
        var token=res.data["jwttoken"]
	    	//alert ('TOKEN: '+token)
        expireCookie ("mine")
		    //alert ("MINE COOKIE"+getCookie("mine"))
        setCookie ("mine",token,5,"/")
       // alert ("MINE COOKIE after"+getCookie("mine"))
        
        window.location.replace("inside.html");
        //return (data);
      } 
   catch(error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
    expireCookie ("mine")
    window.location.replace("/noauth.html");

  };
}


