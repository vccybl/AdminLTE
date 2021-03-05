let token=getCookie("mine");
//alert (window.ApiURL);
let axiosConfigGET = {
    headers: {
        'Authorization': "Bearer "+token
    }
  };
const usuarios = new CRUD(window.ApiURL,'',axiosConfigGET);
addTodosToDOM = async () => {
  $('#User').DataTable( {
          pageLength: 5,
          language: {
                    url: "/dist/js/Spanish.json"
                },
           responsive: true,
           processing: true,
           data : todos,
           columns: [
              { data: "type",
                render : function(data, type, row, meta) {
                    data= '<button type="button" data-id="'+row.id+'" class="btn btn-success btn-xs" data-toggle="modal" data-target="#modal-edit"><i class="far fa-edit"></i></button><button type="button" class="btn btn-danger btn-xs" data-toggle="modal" data-target="#modal-delete"><i class="far fa-times-circle" title="Eliminar"></i></button>'  
                    return data;
                }
              },
              { data: "id"},
              { data: "username" },
              { data: "locked" },
              { data: "enabled" },
              { data: "passwordExpired" },
              { data: "erasable" }
        ]
});
}
const main = async () => {
        addTodosToDOM(await usuarios.getList('admin/usuarios'));
};
//console.log(await usuarios.getList('admin/usuarios'));