let token=getCookie("mine");
let axiosConfigGET = {
    headers: {
        'Authorization': "Bearer "+token
    }
  };
const usuarios = new CRUD(window.ApiURL,'',axiosConfigGET);

const addTodosToDOM = todos => {
  window.usuarioslistado=JSON.stringify(todos)
  UsuariosTable =  $("#Usuarios").DataTable( {
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
                    data= '<button type="button" data-id="'+row.id+'" class="btn btn-success btn-xs" data-toggle="modal" data-target="#modal-edit"><i class="far fa-edit" title="Editar"></i></button>'  
                    data=data+'<button type="button" data-id="'+row.id+'" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#modal-pwd"><i class="fas fa-lock" title="Cambiar clave"></i></button>'
                    if (row.erasable == true){
                     data= data +'<button type="button" class="btn btn-danger btn-xs" data-toggle="modal" data-id="'+row.id+'" data-target="#modal-delete"><i class="far fa-times-circle" title="Eliminar"></i></button>'  
                    } 
                    return data;
                }
              },
              { data: "username" },
              { data: "locked" },
              { data: "enabled" },
              { data: "passwordExpired" },
              { data: "erasable" }
        ]
} );
};
const main = async () => {
        addTodosToDOM(await usuarios.getList('admin/usuarios'));
};
var mostrado = main();

$(document).ready(function (e) {
  
    $('#modal-edit').on('show.bs.modal', function(e) { 
       var modulos= [
        "USUARIOS",
        "TEXTOS_FIJOS",
        "PREGUNTAS_FRECUENTES",
        "BANNERS",
        "NOTICIAS",
        "DIRECTORIO",
        "PROCESOS",
        "SEGUROS",
        "SOCIOCOMERCIAL"
      ];
      $.each(modulos, function(index, value) {
        $('#modal-edit').find('#D-'+value+'').prop('checked', true);
      });
       var id = $(e.relatedTarget).data().id;
       var userlist = JSON.parse(window.usuarioslistado)
       $.each(userlist, function(i,item){
        if (id == userlist[i].id) {
          $('#modal-edit').find('#loginM').val(userlist[i].username);
          $('#modal-edit').find('input[name="customSwitchMLocked"]').prop('checked', userlist[i].locked);
          $('#modal-edit').find('input[name="customSwitchMEnable"]').prop('checked', userlist[i].enabled);
          $('#modal-edit').find('input[name="customSwitchMExpired"]').prop('checked', userlist[i].passwordExpired);
          $('#modal-edit').find('input[name="customSwitchMErasable"]').prop('checked', userlist[i].erasable);
          $.each(userlist[i].modulosAdmin, function(index, value) {
            $('#modal-edit').find('#S-'+value+'').prop('checked', true);
          });
        }
        
          })
      
    });
  });
  const insertuser = async function makePostRequest() {
    let token = getCookie("mine")
    var val1 = document.getElementById('loginADD').value;
    var val2 = document.getElementById('clave1').value;
    let paramsINSERT = {
      username: val1,
      password: val2
    }
    let axiosConfigINSERT = {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    console.log (paramsINSERT)
    usuarios.params = paramsINSERT;
    usuarios.config = axiosConfigINSERT;
    await usuarios.postaction('register');  
    $("#modal-add").modal('hide');
    UsuariosTable.destroy();
    const listadoupdated = async () => {
      addTodosToDOM(await usuarios.getList('admin/usuarios'));
    };
    var listado = listadoupdated();
};



$('#modal-delete').on('show.bs.modal', function(e) { 
  var id = $(e.relatedTarget).data().id;
  var userlist = JSON.parse(window.usuarioslistado)
       $.each(userlist, function(i,item){
        if (id == userlist[i].id) {
          $("#usuario").html("Con nombre de usuario "+userlist[i].username);
          document.getElementById('UserIDToDel').value=userlist[i].id
        }
       })
});

$('#modal-pwd').on('show.bs.modal', function(e) { 
  var id = $(e.relatedTarget).data().id;
  var userlist = JSON.parse(window.usuarioslistado)
       $.each(userlist, function(i,item){
        if (id == userlist[i].id) {
          //$("#usuarioPWD").html("Con nombre de usuario "+userlist[i].username);
          $("#usuarioPWD").append(" del usuario "+userlist[i].username);
          document.getElementById('UserIDToPWD').value=userlist[i].id
        }
       })
});

const pwduser = async function makePutRequest() {
  let token = getCookie("mine")
  var IdUserPWD = document.getElementById('UserIDToPWD').value;
  var val1 = document.getElementById('pwd1').value;
  var val2 = document.getElementById('pwd2').value;
  let axiosConfigPWD = {
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  usuarios.params = '';
  usuarios.config = axiosConfigPWD;
  var path='admin/cambiarClave?userId='+IdUserPWD+'&oldPassword='+val1+'&newPassword='+val2
  await usuarios.putaction(path);  
  $("#modal-pwd").modal('hide');
  $("#info").append("Clave actualizada");
  $('#modal-info').modal('show');
};

const deletetuser = async function makeDeleteRequest() {
  let token = getCookie("mine")
  var IdUser= document.getElementById('UserIDToDel').value;
  let axiosConfigINSERT = {
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  usuarios.config = axiosConfigINSERT;
  var path='admin/usuario?userId='+IdUser
  await usuarios.deleteuser(path);
  $("#modal-delete").modal('hide');
  UsuariosTable.destroy();
    const listadoupdated = async () => {
      addTodosToDOM(await usuarios.getList('admin/usuarios'));
    };
    var listado = listadoupdated();
};