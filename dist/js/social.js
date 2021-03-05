const redes = async function makeGetRequest() {
    try {
        let token=getCookie("mine")
        let axiosConfigGET = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
        let res = await axios.get('http://localhost:8080/api/admin/seccion/elemento/list/REDSOCIAL',axiosConfigGET);
        let data = res.data;
        return data; 
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

const addTodosToDOM = todos => {
    if (Array.isArray(todos) && todos.length > 0) {
        document.getElementById('facebook_config').value=todos["0"]["enlace"]
        document.getElementById('twitter_config').value=todos["1"]["enlace"]
        document.getElementById('youtube_config').value=todos["2"]["enlace"]
        document.getElementById('linkedin_config').value=todos["3"]["enlace"]
        document.getElementById('whatsapp_config').value=todos["4"]["enlace"]
        document.getElementById('telegram_config').value=todos["5"]["enlace"]
        document.getElementById('apklis_config').value=todos["6"]["enlace"]
        document.getElementById('googleplay_config').value=todos["7"]["enlace"]
      }
      document.getElementsByName('infored[]').value=JSON.stringify(todos)
      localStorage.setItem('listado', JSON.stringify(todos));
      
};

const updateredes = async function makePutRequest() {
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
    const infoupdate = JSON.parse(localStorage.getItem('listado'));
    var str = infoupdate[selectedValue]["tipo"]
    var nombre = str.toLowerCase()
    var newlink = document.getElementById(nombre + '_config').value;
    let paramsGET = {
      id: infoupdate[selectedValue]["id"],
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
    console.log (paramsGET)
    let resUPDATE = await axios.put('http://localhost:8080/api/admin/seccion/elemento/update', paramsGET, axiosConfigGET)
    let dataUPDATE = resUPDATE.data 
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