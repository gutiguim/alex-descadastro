$(document).ready(function(){
    getUsersFromFirebase();
});

function getUsersFromFirebase() {
        // Create a root reference
        var ref = firebase.storage();
        var storageRef = ref.ref();
    
        storageRef.child("Ativos/").listAll().then(function(res) {
            res.items.forEach(function(itemRef) {
                fillUserList(itemRef);
            });
            console.log(userList)
        }).catch(function(error) {
            console.log(error);
        });
        
        var storageRef2 = ref.ref();
    
        storageRef2.child("Inativos/").listAll().then(function(res) {
            res.items.forEach(function(itemRef) {
                fillUserListInactives(itemRef);
            });
            console.log(userListInactive);
        }).catch(function(error) {
            console.log(error);
        });
}

var userList = [];
var userListInactive = []
var select = document.getElementById("list");
var select_inactives = document.getElementById("list_inactive");

function fillUserListInactives(data) {
    userListInactive = [];
    // console.log(data);
    userList.push({
        name: data.location.path,
        value: data.location.path
    })

    var option = document.createElement("OPTION"),
    txt = document.createTextNode(data.location.path);
    option.appendChild(txt);
    option.setAttribute("value",data.location.path);
    select_inactives.insertBefore(option,select_inactives.lastChild)

}

function fillUserList(data) {
    userList = [];
    // console.log(data);
    userList.push({
        name: data.location.path,
        value: data.location.path
    })

    var option = document.createElement("OPTION"),
    txt = document.createTextNode(data.location.path);
    option.appendChild(txt);
    option.setAttribute("value",data.location.path);
    select.insertBefore(option,select.lastChild)

}

function showOnScreen(data) {
    var usuario = data;
    var jsonString = JSON.stringify(usuario, undefined, 2);
    alert(jsonString);
}

function showData() {
    var selected = select.options[select.selectedIndex];

    // Create a reference with an initial file path and name
    var storage = firebase.storage();
    var pathReference = storage.ref(selected.value);
    pathReference.getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'
      
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            var blob = xhr.response;

            const reader = new FileReader();
            reader.addEventListener('loadend', () => {
                showOnScreen(JSON.parse(reader.result));
            })
            reader.readAsText(blob);
        };
        xhr.open('GET', 'https://cors-anywhere.herokuapp.com/' + url);
        xhr.send();
      
      }).catch(function(error) {
        // Handle any errors
      });
}

function showDataActivate() {
    var selected = select_inactives.options[select_inactives.selectedIndex];

    // Create a reference with an initial file path and name
    var storage = firebase.storage();
    var pathReference = storage.ref(selected.value);
    pathReference.getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'
      
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            var blob = xhr.response;

            const reader = new FileReader();
            reader.addEventListener('loadend', () => {
                showOnScreen(JSON.parse(reader.result));
            })
            reader.readAsText(blob);
        };
        xhr.open('GET', 'https://cors-anywhere.herokuapp.com/' + url);
        xhr.send();
      
      }).catch(function(error) {
        // Handle any errors
      });
}


function sendData() {
    var selected = select.options[select.selectedIndex];

    // Create a reference with an initial file path and name
    var storage = firebase.storage();
    var pathReference = storage.ref(selected.value);
    pathReference.getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'
      
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            var blob = xhr.response;
            console.log(blob)
            console.log(xhr.response)

            const reader = new FileReader();
            reader.addEventListener('loadend', () => {
                deactivate(JSON.parse(reader.result));
                // console.log(JSON.parse(reader.result));
                pathReference.delete().then(function() {
                    console.log("Deletado da lista de ativos");
                    getUsersFromFirebase();
                }).catch(function(error) {
                    console.log("Erro ao deletar");
                });
            })
            reader.readAsText(blob);
        };
        xhr.open('GET', 'https://cors-anywhere.herokuapp.com/' + url);
        xhr.send();
      
      }).catch(function(error) {
        // Handle any errors
      });
}

function sendDataActivate() {
    var selected = select_inactives.options[select_inactives.selectedIndex];

    // Create a reference with an initial file path and name
    var storage = firebase.storage();
    var pathReference = storage.ref(selected.value);
    pathReference.getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'
      
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            var blob = xhr.response;
            console.log(blob)
            console.log(xhr.response)

            const reader = new FileReader();
            reader.addEventListener('loadend', () => {
                activate(JSON.parse(reader.result));
                // console.log(JSON.parse(reader.result));
                pathReference.delete().then(function() {
                    console.log("Deletado da lista de inativos");
                    getUsersFromFirebase();
                }).catch(function(error) {
                    console.log("Erro ao deletar");
                });
            })
            reader.readAsText(blob);
        };
        xhr.open('GET', 'https://cors-anywhere.herokuapp.com/' + url);
        xhr.send();
      
      }).catch(function(error) {
        // Handle any errors
      });
}

function deactivate (data) {
    console.log(data);
    var usuario = data;
    usuario.StatusBeneficiario = "I";
    var jsonString = JSON.stringify(usuario, undefined, 2);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://cors-anywhere.herokuapp.com/http://lifemanager.nextplus.com.br:9095/lifemanagerapi/lmapi/cadastro', true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.setRequestHeader('Authorization', 'Bearer ' + '2J94aB1OlhmksPMH3-qOrMywa_Dqrywm8Nla14UP4lPwK3pQgPtGvxyPnOvLvPmTWvKUkocOb-Y7oy6-CCPZ262DM-lv9NHOAP1x_9uMftvLb4NPODCNkR9hTT_GqKjAH3_etZjf7QCBNJdC5Q6dY_T-rdXUeaMEUzFAdIW5dRNEr1AAV34CohYQJ1BG1JNItx9Kf5Xb9iOHN-iRvv-zz3eekMcWiIQ8MJE_V02B1Q2BvR7hRVW0zh_0hOCq5Vn5tlqQMPT_VL1cpQhFWcfwjLRenNDXfHsOlA6TaxeL3rWE-tOZsjk_DmCz3wAvlSlw');
    xhr.send(jsonString);
    // alert("Sucesso");

    // Create a root reference
    var ref = firebase.storage();
    var storageRef = ref.ref();

    var marcaDependente = '';
    if (usuario.BeneficiarioTitular == "") {
        marcaDependente = "_TITULAR";
    } else {
        marcaDependente = "_DEPENDENTE_DO_" + usuario.BeneficiarioTitular;
    }

    storageRef.child('Inativos/' + usuario.Nome + '_' + usuario.DataNascimento + marcaDependente).putString(jsonString, firebase.storage.StringFormat.RAW).then(function(snapshot) {
        console.log('Uploaded string');
    }).catch(function(error) {
        console.log(error);
    });

}

function activate (data) {
    console.log(data);
    var usuario = data;
    usuario.StatusBeneficiario = "I";
    var jsonString = JSON.stringify(usuario, undefined, 2);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://cors-anywhere.herokuapp.com/http://lifemanager.nextplus.com.br:9095/lifemanagerapi/lmapi/cadastro', true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.setRequestHeader('Authorization', 'Bearer ' + '2J94aB1OlhmksPMH3-qOrMywa_Dqrywm8Nla14UP4lPwK3pQgPtGvxyPnOvLvPmTWvKUkocOb-Y7oy6-CCPZ262DM-lv9NHOAP1x_9uMftvLb4NPODCNkR9hTT_GqKjAH3_etZjf7QCBNJdC5Q6dY_T-rdXUeaMEUzFAdIW5dRNEr1AAV34CohYQJ1BG1JNItx9Kf5Xb9iOHN-iRvv-zz3eekMcWiIQ8MJE_V02B1Q2BvR7hRVW0zh_0hOCq5Vn5tlqQMPT_VL1cpQhFWcfwjLRenNDXfHsOlA6TaxeL3rWE-tOZsjk_DmCz3wAvlSlw');
    xhr.send(jsonString);
    // alert("Sucesso");

    // Create a root reference
    var ref = firebase.storage();
    var storageRef = ref.ref();

    var marcaDependente = '';
    if (usuario.BeneficiarioTitular == "") {
        marcaDependente = "_TITULAR";
    } else {
        marcaDependente = "_DEPENDENTE_DO_" + usuario.BeneficiarioTitular;
    }

    storageRef.child('Ativos/' + usuario.Nome + '_' + usuario.DataNascimento + marcaDependente).putString(jsonString, firebase.storage.StringFormat.RAW).then(function(snapshot) {
        console.log('Uploaded string');
    }).catch(function(error) {
        console.log(error);
    });

}