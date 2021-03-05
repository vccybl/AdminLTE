const getSocioComercial = async function makeGetRequest() {
    try {
        let token=getCookie("mine")
        //alert (token)
        let axiosConfigGET = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
        let res = await axios.get('http://localhost:8080/api/admin/seccion/elemento/list/SOCIOCOMERCIAL',axiosConfigGET);
        //console.log (res.data)
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

const createTR = (item,index) => {
    var tableRef = document.getElementById('news').getElementsByTagName('tbody')[0];
    var newRow   = tableRef.insertRow();

    // Append a text node to the cell
   
    for (var j = 0; j < 6; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      // Insert a cell in the row at index 0  
      var newCell  = newRow.insertCell(j);
      switch(j) {
        case 0:
          var cellText = document.createTextNode('Acciones');
          break;
        case 1:
          var cellText = document.createTextNode(item.id);
          break;
        case 2:
          var cellText = document.createTextNode(item.titulo);
          break;
        case 3:
          var cellText = document.createTextNode(item.texto);
          break;
        case 4:
          var cellText = document.createTextNode(item.imagen);
          break;
        case 5:
          var texto="<div class=\"custom-control custom-switch custom-switch-off-danger custom-switch-on-success\"><input type=\"checkbox\" class=\"custom-control-input\" id=\"customSwitch1\" checked><label class=\"custom-control-label\" for=\"customSwitch1\"></label></div>"
          var cellText = document.createTextNode(texto);
          break;
        default:
          // code block
      }                  
      if (j == 0) newCell.innerHTML='<button type="button" data-id="'+item.id+'" class="btn btn-success btn-xs" data-toggle="modal" data-target="#modal-edit"><i class="far fa-edit"></i></button><button type="button" class="btn btn-danger btn-xs" data-toggle="modal" data-target="#modal-delete"><i class="far fa-times-circle" title="Eliminar"></i></button>'                
      else if (j == 5)  newCell.innerHTML='<div class=\"custom-control custom-switch custom-switch-off-danger custom-switch-on-success\"><input type=\"checkbox\" class=\"custom-control-input\" id=\"customSwitch1\" checked><label class=\"custom-control-label\" for=\"customSwitch1\"></label></div>'
      else newCell.appendChild(cellText); 
    }
   // Add some text to the new cells:
    return
  };

const addTodosToDOM = todos => {
      $("#SocioComercial").DataTable( {
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
                  { data: "type",
                    render : function(data, type, row,meta) {
                        data= '<button type="button" data-id="'+row.id+'" class="btn btn-success btn-xs" data-toggle="modal" data-target="#modal-edit"><i class="far fa-edit"></i></button><button type="button" class="btn btn-danger btn-xs" data-toggle="modal" data-target="#modal-delete"><i class="far fa-times-circle" title="Eliminar"></i></button>'  
                        return data;
                    }
                  },
                  { data: "id"},
                  { data: "nombre" },
                  { data: "enlace" },
                  { data: "icono" }
            ]
    } );
};


const main = async () => {
        addTodosToDOM(await getSocioComercial());
};

var mostrado = main();
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

