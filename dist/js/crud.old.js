class CRUD {
    constructor(url,params,config) {
      this.url = url;
      this.params=params;
      this.config=config;
    }
  
    async _doInitialize(path,action) {
      switch(action) {
        case 'list':
          this.response = await axios.get(this.url+path,this.config);
          break;
        case 'insert'||'update'||'delete':
          this.response = await axios.put(this.url+path,this.params,this.config);
          break;
        case 'auth':
          this.response = await axios.post(this.url+path+this.params);
          break;
        case 'deleteuser':
          this.response = await axios.post(this.url+path+this.params);
          break;
        default:
          // code block
      }                  
    }
  
    async _initialize(path,action) {
      // prevent concurrent calls firing initialization more than once
      try {
        this.initializationPromise = this._doInitialize(path,action);
        return this.initializationPromise;
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
    }
  
     async getList(path) {
        await this._initialize(path,"list");
        console.log (this.response.data)
        return this.response.data;
      }
  
   
    update = async () => {
        try {
          const rbs = document.querySelectorAll('input[name="r3"]');
                  let selectedValue;
                  for (const rb of rbs) {
                      if (rb.checked) {
                          selectedValue = rb.value;
                          break;
                      }
                  }
          let token = getCookie("mine")
          var infoupdate = JSON.parse(document.getElementsByName('infonews').value);
          var str = infoupdate[selectedValue]["tipo"]
          var nombre = str.toLowerCase()
          var newlink = document.getElementById(nombre + '_config').value
          let paramsGET = {
            id: infoupdate[selectedValue]['id'],
            enlace: newlink,
            icono: infoupdate[selectedValue]["icono"],
            tipo: infoupdate[selectedValue]["tipo"],
            type: infoupdate[selectedValue]["type"]
          }
          let axiosConfigGET = {
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
          //console.log(JSON.stringify(paramsGET))
          //alert (JSON.stringify(paramsGET))
          let resUPDATE = await axios.post('http://localhost:8080/api/admin/seccion/elemento/update', paramsGET, axiosConfigGET)
          let dataUPDATE = resUPDATE.data
          const body = chunksParser(dataUPDATE);
          return dataUPDATE; 
        }
        catch (error1) {
          console.log('Error', error1.message)
          if (error1.response) {
            console.log(error1.response.status)
            console.log(error1.response.headers)
          } else if (error1.request) {
            console.log(error1.request)
          } else {
            console.log('Error', error1.message)
          }
          console.log(error1.config)
        };
      };
      delete = async (id) =>  {
        axios.delete(this.BASE_URL + "/characters/" + id)
          .then((response) => {
            console.log("deleted: ", response);
          })
          .catch();
      }
      insert  = async  (data) =>  {
        axios
          .post(this.BASE_URL + "/characters/", data)
          .then((response) => {
            // console.log("created: ", response)
          })
          .catch(error => {
            console.log(error);
          });
      }  
  };
