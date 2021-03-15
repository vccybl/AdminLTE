const getNoticias = async function makeGetRequest() {
    try {
        let token=getCookie("mine")
        //alert (token)
        let axiosConfigGET = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
        let res = await axios.get('http://localhost:8080/api/admin/seccion/elemento/list/NOTICIA',axiosConfigGET);
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
      window.noticiaslistado=JSON.stringify(todos)
      //console.log (todos)
      $("#News").DataTable( {
              pageLength: 5,
              language: {
                        url: "/dist/js/Spanish.json"
                    },
               responsive: true,
               processing: true,
               data : todos,
               initComplete: function () {
                this.api().columns().every( function () {
                    var column = this;
                    var select = $('<select class="custom-select custom-select-sm form-control form-control-sm">><option value=""></option></select>')
                        .appendTo( $(column.header()).empty() )
                        .on( 'change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );
     
                            column
                                .search( val ? '^'+val+'$' : '', true, false )
                                .draw();
                        } );
     
                    column.data().unique().sort().each( function ( d, j ) {
                        select.append( '<option value="'+d+'">'+d+'</option>' )
                    } );
                } );
            },
               columns: [
                  { data: "id",
                    render : function(data, type, row,meta) {
                        data= '<button type="button" data-id="'+row.id+'" class="btn btn-success btn-xs" data-toggle="modal" data-target="#modal-edit"><i class="far fa-edit"></i></button><button type="button" class="btn btn-danger btn-xs" data-toggle="modal" data-target="#modal-delete"><i class="far fa-times-circle" title="Eliminar"></i></button>'  
                        return data;
                    }
                  },
                  { data: "id" },
                  { data: "titulo" },
                  { data: "texto" },
                  { data: "imagen" }
            ]
    } );
};



const updatenoticias = async () => {
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
    alert ("aqui")
    console.log(resUPDATE.data)
    console.log(`Status: ${resUPDATE.status}`)
    console.log(`Server: ${resUPDATE.headers.server}`)
    console.log(`Date: ${resUPDATE.headers.date}`)
    console.log(resUPDATE.data)
    //alert(JSON.stringify(dataUPDATE))
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

const main = async () => {
  addTodosToDOM(await getNoticias());
};
var resultado=main();