class CRUD {
    constructor(url,params,config) {
      this.url = url;
      this.params=params;
      this.config=config;
    }

    async getList(path) {
      try {
          let res = await axios.get(this.url+path,this.config);
          return res.data; 
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
        };
    }; 
    async authaction(path) {
      try {
          console.log(this.params)
          let res = await axios.post(this.url+path,this.params,this.config);
          var token=res.data["jwttoken"]
          console.log(res.data)
          expireCookie ("mine")
          setCookie ("mine",token,5,"/")
          window.location.replace("inside.html");
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
          window.location.replace("noauth.html");
        };
    }; 
    async putaction(path) {
      try {
          console.log(this.params)
          let res = await axios.put(this.url+path,this.params,this.config);
          let dataUPDATE = res.data 
          return dataUPDATE;
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
          window.location.replace("noauth.html");
        };
    }; 
};


