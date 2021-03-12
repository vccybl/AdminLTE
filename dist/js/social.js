let token=getCookie("mine");

let axiosConfigGET = {
    headers: {
        'Authorization': "Bearer "+token
    }
  };
const redes = new CRUD(window.ApiURL,'',axiosConfigGET);

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

const main = async () => {
  addTodosToDOM(await redes.getList('admin/seccion/elemento/list/REDSOCIAL'));
};
var network=main();


const updateredes = async function makePutRequest() {
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
    let paramsUPDATE = {
      id: infoupdate[selectedValue]["id"],
      enlace: newlink,
      icono: infoupdate[selectedValue]["icono"],
      tipo: infoupdate[selectedValue]["tipo"],
      type: infoupdate[selectedValue]["type"]
    }
    let axiosConfigUPDATE = {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    redes.params = paramsUPDATE;
    redes.config = axiosConfigUPDATE;
    await redes.putaction('admin/seccion/elemento/update');  
};