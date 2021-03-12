const auth = async () => {
  const login = document.querySelector('#Email1').value;
  const pwd = document.querySelector('#PassWord1').value;
    let params = {
        username: login,
        password: pwd
      };
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
      };
  const crudAction = new CRUD(window.ApiURL,params,axiosConfig);    
  await crudAction.authaction('authenticate');
};
