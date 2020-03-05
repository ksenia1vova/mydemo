
document.getElementById('userProfile').onclick=function (){
    toogleActiveLink("userProfile"); // делает текст нажатой ссылки жирным (css класс "active")
    showUserProfile();
};
document.getElementById('baseAccounts').onclick=function (){
    toogleActiveLink("baseAccounts");
    showBaseAccount();
};
document.getElementById('btnEnter').onclick=function (){
    toogleActiveLink("btnEnter");
    showLoginForm();
};
document.getElementById('sysOut').onclick=function (){
    toogleActiveLink("sysOut");
    sysLogout();
};
document.getElementById('addUser').onclick=function (){
    toogleActiveLink("addUser");
    showAddUserForm();
};
function toogleActiveLink(elementId){
    let activeElement = document.getElementById(elementId);
    let passiveElements = document.getElementsByClassName('nav-link');
    for(let i = 0;i < passiveElements.length; i++){
        if(activeElement === passiveElements[i]){
            passiveElements[i].classList.add("active");
        }else{
            if(passiveElements[i].classList.contains('active')){
                passiveElements[i].classList.remove('active');
            }
        }
    }
}
function showAddUserForm(){
    document.getElementById('content').innerHTML=
             `<div class="container">
            <div id="content" class="w-100 d-flex justify-content-center"> 
                <div class="card w-50">
                <div class="card-body">
                  <h5 class="card-title w-100 text-center">Зарегистрировать пользователя</h5>
                  <p class="card-text d-flex justify-content-end">Имя пользователя: <input class="w-50 ml-5" type="text" id="firstname"></p>
                  <p class="card-text d-flex justify-content-end">Фамилия пользователя: <input class="w-50 ml-5" type="text" id="lastname"></p>
                  <p class="card-text d-flex justify-content-end">Телефон пользователя: <input class="w-50 ml-5" type="text" id="phone"></p>
                  <p class="card-text d-flex justify-content-end">Логин: <input class="w-50 ml-5" type="text" id="login"></p>
                  <p class="card-text d-flex justify-content-end">Пароль: <input class="w-50 ml-5" type="text" id="password"></p>
                  <a href="#" id="btnAddUser" class="btn btn-primary w-100">Зарегистрировать польователя</a>
                </div>
              </div>
              `;
    document.getElementById('btnAddUser').onclick=function(){
        createUser();
    }
}
//Events
function showLoginForm(){
    document.getElementById('content').innerHTML='form showLoginForm()';
}
function showUserProfile(){
    document.getElementById('content').innerHTML='form showUserProfile()';
}
function showBaseAccount(){
    document.getElementById('content').innerHTML='form showBaseAccount()';
}
function sysLogout(){
    document.getElementById('content').innerHTML='form sysLogout()';
}

// functions
function createUser(){
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let phone = document.getElementById('phone').value;
    let login = document.getElementById('login').value;
    let password = document.getElementById('password').value;
    let user = {
        "firstname": firstname,
        "lastname": lastname,
        "phone": phone,
        "login": login,
        "password": password,
        
    }
    postHttp('addUser', user)
            .then(function(response){
                document.getElementById('info').innerHTML='Пользователь добавлен';
    });
}
function postHttp(url,data){
    return fetch(url,{
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        credentials: 'include',
                        body: JSON.stringify(data)
                    })
          .then(status)  
          .then(json)  
          .catch(function(error) { //срабатывает при ошибке пришедшей с сервера
            console.log('Request failed', error);  
          });
}
function status(response) {  
  if (response.status >= 200 && response.status < 300) {  
    return Promise.resolve(response)  
  } else {  
    return Promise.reject(new Error(response.statusText))  
  }  
}

// Получает ответ в формате Json и формирует из него js объект
function json(response) {  
  return response.json();
};