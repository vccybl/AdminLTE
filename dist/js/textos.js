let token=getCookie("mine");

let axiosConfigGET = {
    headers: {
        'Authorization': "Bearer "+token
    }
  };
const textosfijos = new CRUD(window.ApiURL,'',axiosConfigGET);

const addTodosToDOM = todos => {
      if (localStorage.getItem('camino') == 'HOME/BANNER' ) {
        $('#titulo_bienvenida').val(todos["parrafo"]["titulo"]);
        $("#texto_bienvenida").html(todos["parrafo"]["texto"]);                   
        $(".note-editable").append(todos["parrafo"]["texto"]); //add text to summernote
      }
      //alert (localStorage.getItem('camino'))  
      if (localStorage.getItem('camino') == 'ACERCA_DE/QUIENES_SOMOS') {
        $('#titulo_about').val(todos["parrafoIcono"]["titulo"]);
        $("#texto_about").html(todos["parrafoIcono"]["texto"]);                   
        $(".note-editable").append(todos["parrafoIcono"]["texto"]); //add text to summernote
      } 
      if (localStorage.getItem('camino') == 'ACERCA_DE/COORDENADAS') {
        $('#titulo_coordenadas').val(todos["parrafo"]["titulo"]);
        $("#texto_coordenadas").html(todos["parrafo"]["texto"]);                   
        $(".note-editable").append(todos["parrafo"]["texto"]); //add text to summernote
      } 
      if (localStorage.getItem('camino') == 'ACERCA_DE/ORGANIGRAMA') {
        $('#titulo_organigrama').val(todos["organigrama"]["titulo"]);
        //$('#img_organigrama').attr("href", window.WebURL+'img/'+todos["organigrama"]["imagen"])
        $("#texto_organigrama").html(todos["organigrama"]["texto"]);                   
        $(".note-editable").append(todos["organigrama"]["texto"]); //add text to summernote
      }
      if (localStorage.getItem('camino') == 'MERCADO_ASEGURADOR/MERCADO_ASEGURADOR') {
        $('#titulo_mac').val(todos["noticia"]["titulo"]);
        $("#texto_mac").html(todos["noticia"]["texto"]);                   
        $(".note-editable").append(todos["noticia"]["texto"]); //add text to summernote
      }      

};

const main = async (path) => {
  addTodosToDOM(await textosfijos.getList('admin/seccion/'+path));
};

$(".btn-tool").button().click(function(){
    var id = $(this).attr('id');
    localStorage.setItem('camino', id);
    var textos=main(id);
}); 

const updatetextosfijos = async function makePutRequest() {
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
    textosfijos.params = paramsUPDATE;
    textosfijos.config = axiosConfigUPDATE;
    await textosfijos.putaction('admin/seccion/elemento/update');  
};