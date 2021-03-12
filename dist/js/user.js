let token=getCookie("mine");
console.log(token)
let axiosConfigGET = {
    headers: {
        'Authorization': "Bearer "+token
    }
  };
const usuarios = new CRUD(window.ApiURL,'',axiosConfigGET);

const addTodosToDOM = todos => {
  window.usuarioslistado=JSON.stringify(todos)
  $("#Usuarios").DataTable( {
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
       var id = $(e.relatedTarget).data().id;
       var userlist = JSON.parse(window.usuarioslistado)
       $.each(userlist, function(i,item){
        if (id == userlist[i].id) {
          $('#modal-edit').find('#titulo').val(userlist[i].titulo);
          $('#modal-edit').find('#textoCompleto').html(userlist[i].texto);
          $('#modal-edit').find('.note-editable').append(userlist[i].texto);
        }
        
          })
      
    });
  });
