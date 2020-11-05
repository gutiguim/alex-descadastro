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
    xhr.setRequestHeader('Authorization', 'Bearer ' + 'c_JARVQxQncnxpwpfU2xjSA7y_09M35qMIZRugWztIwMe1B-PL8n3PILQW88LbD7APCsnlQMSOmL9N_fDDtOIhKfnDwMF9kOdF-eDnRQZFgId0QPwHek83fa5CEK0Js6z8RgJZjcLN1QYKtPRN79SdUNu5WovwMPP9ysHn3m186d7Ht1fLxjAkLzQkzrPJHey7jvzpqKww_1Zz3eaVsTJrn4DDZ_pS2yodeObxrXBlFA217Vvuj4l2w_Nw58m6mb45vWZsHXtw_h7fT2IMbTsDJIH01mHIhMlL0KtA6HIX9lG7QHaI9C2BOn9-W3fJ3I');
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
    xhr.setRequestHeader('Authorization', 'Bearer ' + 'c_JARVQxQncnxpwpfU2xjSA7y_09M35qMIZRugWztIwMe1B-PL8n3PILQW88LbD7APCsnlQMSOmL9N_fDDtOIhKfnDwMF9kOdF-eDnRQZFgId0QPwHek83fa5CEK0Js6z8RgJZjcLN1QYKtPRN79SdUNu5WovwMPP9ysHn3m186d7Ht1fLxjAkLzQkzrPJHey7jvzpqKww_1Zz3eaVsTJrn4DDZ_pS2yodeObxrXBlFA217Vvuj4l2w_Nw58m6mb45vWZsHXtw_h7fT2IMbTsDJIH01mHIhMlL0KtA6HIX9lG7QHaI9C2BOn9-W3fJ3I');
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



var teste = [
    {
      "Nome": "Eduardo Eger",
      "IdentificacaoPessoa": "00008914958",
      "DataNascimento": "28-08-1977",
      "Email": "eduardoeger@hotmail.com",
      "TelefoneCelular": "48996025739",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Valentina S Eckschmidt",
      "IdentificacaoPessoa": "00120978279",
      "BeneficiarioTitular": "11997045800",
      "DataNascimento": "04-05-2000",
      "Email": "dragon.valen@hotmail.com",
      "TelefoneCelular": "48996110229",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "MONICA FERREIRA",
      "IdentificacaoPessoa": "00342962981",
      "BeneficiarioTitular": "03222295964",
      "DataNascimento": "30-01-1979",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Jaqueline Coutinho Padilha",
      "IdentificacaoPessoa": "00452650038",
      "BeneficiarioTitular": "02532346035",
      "DataNascimento": "16-10-1984",
      "Email": "jaquelinepadilha646@gmail.com",
      "TelefoneCelular": "54996237951",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "MAICON MARTINELLI MARINHO",
      "IdentificacaoPessoa": "00427682924",
      "DataNascimento": "11-02-1981",
      "Email": "MAICON@JOVEMPANFLORIPA.COM.BR",
      "TelefoneCelular": "48984879627",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "José Adroaldo Siqueira Scheleider",
      "IdentificacaoPessoa": "00368086950",
      "BeneficiarioTitular": "52737675987",
      "DataNascimento": "19-01-1962",
      "Email": "helena_adroaldo@hotmail.com",
      "TelefoneCelular": "41995947143",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "SUELI HIROKO HIRAGAMI",
      "IdentificacaoPessoa": "00604853963",
      "BeneficiarioTitular": "48188999920",
      "DataNascimento": "26-03-1981",
      "Email": "hirokohiragami@hotmail.com",
      "TelefoneCelular": "48999583035",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Francis França Apratto",
      "IdentificacaoPessoa": "00740127977",
      "BeneficiarioTitular": "01888208929",
      "DataNascimento": "02-07-1985",
      "Email": "coordenador.pse@gmail.com",
      "TelefoneCelular": "48996695137",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Remor Laudelino Borges",
      "IdentificacaoPessoa": "00937312991",
      "DataNascimento": "29-01-1944",
      "Email": "remorlborges@gmai.com",
      "TelefoneCelular": "48988189127",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Giselle Costa da Silva",
      "IdentificacaoPessoa": "00764249959",
      "BeneficiarioTitular": "02170684999",
      "DataNascimento": "11-05-1981",
      "Email": "gisellecs@hotmail.com",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "VALERIA DE ALMEIDA SANTOS NOGUEIRA",
      "IdentificacaoPessoa": "00606614290",
      "BeneficiarioTitular": "85714143272",
      "DataNascimento": "06-12-1989",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "ALEXSANDRA SILVA GAIA",
      "IdentificacaoPessoa": "01012012",
      "BeneficiarioTitular": "85714143272",
      "DataNascimento": "01-01-2012",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Daniel Marildo da Silva",
      "IdentificacaoPessoa": "00758734948",
      "DataNascimento": "14-04-1983",
      "Email": "danielmarildo@gmail.com",
      "TelefoneCelular": "48984025669",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Edgar Martins junior",
      "IdentificacaoPessoa": "00579818926",
      "DataNascimento": "19-05-1980",
      "Email": "jrmartins@hotmail.com",
      "TelefoneCelular": "48999331177",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Elitania Maria da Silva marreiro",
      "IdentificacaoPessoa": "01853426393",
      "DataNascimento": "18-02-1987",
      "Email": "elitania500@gmail.com",
      "TelefoneCelular": "8586590177",
      "CorporateId": "39",
      "CodigoContrato": "58",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Silvana godois padilha",
      "IdentificacaoPessoa": "01115541013",
      "DataNascimento": "05-08-1978",
      "Email": "nanypadilhaneg@gmail.com",
      "TelefoneCelular": "54996068811",
      "CorporateId": "39",
      "CodigoContrato": "58",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Maykel de Jesus Silva",
      "IdentificacaoPessoa": "02170684999",
      "DataNascimento": "31-10-1977",
      "Email": "mkljs@hotmail.com",
      "TelefoneCelular": "48988078229",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "NELSI BLAN DE OLIVEIRA",
      "IdentificacaoPessoa": "01661322921",
      "BeneficiarioTitular": "06548883969",
      "DataNascimento": "23-03-1953",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "RICARDO DORVAL MACEDO",
      "IdentificacaoPessoa": "01683142900",
      "DataNascimento": "04-10-1977",
      "Email": "ricamacedo@hotmail.com",
      "TelefoneCelular": "48999489856",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Richard  Soares Hoy",
      "IdentificacaoPessoa": "02035422078",
      "BeneficiarioTitular": "02482402000",
      "DataNascimento": "23-12-1990",
      "Email": "richardsoareshoy@gmail.com",
      "TelefoneCelular": "48991156826",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Nelson Batista",
      "IdentificacaoPessoa": "01268873810",
      "DataNascimento": "17-12-1959",
      "Email": "nbatista1959@uol.com.br",
      "TelefoneCelular": "11985255741",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Patricia Barni",
      "IdentificacaoPessoa": "01682842940",
      "DataNascimento": "29-11-1974",
      "Email": "patriciabarni7@gmail.com",
      "TelefoneCelular": "48984049605",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "ADRIANA ROSA DE SOUZA",
      "IdentificacaoPessoa": "02079603990",
      "DataNascimento": "22-12-1975",
      "Email": "adrianarosadesouza@bol.com.br",
      "TelefoneCelular": "49999372663",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Simone Rosa Souza Michelon",
      "IdentificacaoPessoa": "02232463958",
      "BeneficiarioTitular": "02079603990",
      "DataNascimento": "24-10-1977",
      "Email": "simonemichelon24@yahoo.com.br",
      "TelefoneCelular": "49991978500",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "João Francisco Soriano Miranda",
      "IdentificacaoPessoa": "02192590032",
      "BeneficiarioTitular": "02532346035",
      "DataNascimento": "09-03-1985",
      "Email": "fofis.miranda@gmail.com",
      "TelefoneCelular": "54999642579",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Clair coelho blasius",
      "IdentificacaoPessoa": "02139175999",
      "BeneficiarioTitular": "62771590972",
      "DataNascimento": "10-03-1967",
      "Email": "",
      "TelefoneCelular": "46991121752",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "HELLEN FRASSETTO DE QUEVEDO",
      "IdentificacaoPessoa": "02458436986",
      "BeneficiarioTitular": "00427682924",
      "DataNascimento": "26-11-1979",
      "Email": "hellenq@gmail.com",
      "TelefoneCelular": "48999577222",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Mirko Colombo",
      "IdentificacaoPessoa": "01342633911",
      "BeneficiarioTitular": "00937312991",
      "DataNascimento": "25-10-1987",
      "Email": "mirko.colombo1987@gmail.com",
      "TelefoneCelular": "48991442510",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Maria Carolina Guglielmi Borges",
      "IdentificacaoPessoa": "02309754960",
      "BeneficiarioTitular": "00937312991",
      "DataNascimento": "12-08-1979",
      "Email": "mcaca@hotmail.com",
      "TelefoneCelular": "48991671208",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Karine Claudine Jeronimo Azevedo",
      "IdentificacaoPessoa": "01719914940",
      "BeneficiarioTitular": "09683772978",
      "DataNascimento": "26-07-1975",
      "Email": "kjeronimo75@yahoo.com.br",
      "TelefoneCelular": "47996408828",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Helton César Ferreira Silva",
      "IdentificacaoPessoa": "03872478311",
      "DataNascimento": "03-04-1989",
      "Email": "helton.cesar89@hotmail.com",
      "TelefoneCelular": "11941363513",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "KARINA DE ALMEIDA TRINDADE",
      "IdentificacaoPessoa": "03620288267",
      "BeneficiarioTitular": "49093045253",
      "DataNascimento": "31-03-1996",
      "Email": "karinatrindade063@gmail.com",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "DENIZE DE ALMEIDA TRINDADE",
      "IdentificacaoPessoa": "02941859250",
      "BeneficiarioTitular": "49093045253",
      "DataNascimento": "12-02-1995",
      "Email": "denize.trindadeal@gmail.com",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "FABIO DA SILVA",
      "IdentificacaoPessoa": "03222295964",
      "DataNascimento": "28-10-1980",
      "Email": "fmonica7401@gmail.com",
      "TelefoneCelular": "48996210754",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "LEONARDO DOS SANTOS TRINDADE",
      "IdentificacaoPessoa": "04334069258",
      "BeneficiarioTitular": "70386013268",
      "DataNascimento": "16-01-2004",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Marilene Ribeiro Da Silva",
      "IdentificacaoPessoa": "04002683885",
      "BeneficiarioTitular": "85792608849",
      "DataNascimento": "01-01-1990",
      "Email": "marilene58yahoo.com.br",
      "TelefoneCelular": "84994108324",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Jamaika Eliana Broering Barni",
      "IdentificacaoPessoa": "03560027993",
      "BeneficiarioTitular": "59422483972",
      "DataNascimento": "06-07-1975",
      "Email": "jamaikabroering@gmail.com",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "PATRICIA ALVES DE JESUS",
      "IdentificacaoPessoa": "03624585967",
      "BeneficiarioTitular": "01683142900",
      "DataNascimento": "30-08-1978",
      "Email": "pathy.aj@hotmail.com",
      "TelefoneCelular": "48988135294",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "KAMILA DOS SANTOS RIBEIRO",
      "IdentificacaoPessoa": "02482402000",
      "DataNascimento": "19-02-1991",
      "Email": "kamilasribeiro09@gmail.com",
      "TelefoneCelular": "51982602923",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Adelir Terezinha de Oliveira",
      "IdentificacaoPessoa": "03281562990",
      "BeneficiarioTitular": "72854391934",
      "DataNascimento": "02-01-1972",
      "Email": "vitoriaborguessanpatricio@gmail.com",
      "TelefoneCelular": "48988244355",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Vinissius Duarte Gonçalves",
      "IdentificacaoPessoa": "02593347074",
      "DataNascimento": "10-10-1991",
      "Email": "vini_alegrete@hotmail.com",
      "TelefoneCelular": "48991792641",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Sabrina Maria da Silva",
      "IdentificacaoPessoa": "04004621925",
      "BeneficiarioTitular": "02593347074",
      "DataNascimento": "29-05-1982",
      "Email": "sabrinamariasassa@gmail.com",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Tiago Celuppi",
      "IdentificacaoPessoa": "02552793967",
      "DataNascimento": "12-02-1980",
      "Email": "tiago@tecel.com.br",
      "TelefoneCelular": "41999153424",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Fernanda Emeri Mokfa Matitz Celuppi",
      "IdentificacaoPessoa": "02978434945",
      "BeneficiarioTitular": "02552793967",
      "DataNascimento": "20-09-1980",
      "Email": "fernanda@tecel.com.br",
      "TelefoneCelular": "41999153484",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Valmiro Luis Reginaldo",
      "IdentificacaoPessoa": "02752052901",
      "BeneficiarioTitular": "08411889980",
      "DataNascimento": "09-04-1979",
      "Email": "artistico@demais.fm.br",
      "TelefoneCelular": "47991045090",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Gabriel dos Santos Cooper",
      "IdentificacaoPessoa": "04306283909",
      "BeneficiarioTitular": "53618190930",
      "DataNascimento": "05-08-1999",
      "Email": "gabrieldossantoscooper@gmail.com",
      "TelefoneCelular": "41988250559",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Letícia Padilha Bertele",
      "IdentificacaoPessoa": "02532346035",
      "DataNascimento": "06-08-2000",
      "Email": "letipadilha360@gmail.com",
      "TelefoneCelular": "54999672644",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Luís Gustavo Padilha Miranda",
      "IdentificacaoPessoa": "03758970032",
      "BeneficiarioTitular": "02532346035",
      "DataNascimento": "16-10-1984",
      "Email": "luisgustavopadilhamiranda@gmail.com",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Doracy Falcetti",
      "IdentificacaoPessoa": "02739490801",
      "BeneficiarioTitular": "14527819828",
      "DataNascimento": "06-06-1930",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Maria Gomes Steppan",
      "IdentificacaoPessoa": "03761646976",
      "BeneficiarioTitular": "16621263953",
      "DataNascimento": "17-09-1946",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Adriel Mateus do Nascimento Carrera",
      "IdentificacaoPessoa": "03835882279",
      "BeneficiarioTitular": "62771590972",
      "DataNascimento": "07-07-1999",
      "Email": "",
      "TelefoneCelular": "47992542226",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Lucas Matheus Pereira da Rosa",
      "IdentificacaoPessoa": "03278555090",
      "DataNascimento": "30-06-1995",
      "Email": "lucasdarosa95@gmail.com",
      "TelefoneCelular": "49988172487",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Sara Camera da Costa",
      "IdentificacaoPessoa": "03498639030",
      "BeneficiarioTitular": "03278555090",
      "DataNascimento": "15-03-1998",
      "Email": "saracamera@live.com",
      "TelefoneCelular": "49991626787",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Laura Beatriz Perin",
      "IdentificacaoPessoa": "02626690996",
      "DataNascimento": "03-03-1975",
      "Email": "lauraperin2018@gmail.com",
      "TelefoneCelular": "48996471104",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Diogo Rangel Pruchneski",
      "IdentificacaoPessoa": "02971078957",
      "BeneficiarioTitular": "82247447104",
      "DataNascimento": "18-05-1980",
      "Email": "pruch@gmail.com",
      "TelefoneCelular": "48984123590",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Jackson Cesar Pini de Sousa",
      "IdentificacaoPessoa": "03031389980",
      "DataNascimento": "14-11-1980",
      "Email": "jacksonpini14@gmail.com",
      "TelefoneCelular": "48984821789",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Anna Carolina Souza Santos de Paula Eckschmidt",
      "IdentificacaoPessoa": "03616743923",
      "DataNascimento": "11-10-1981",
      "Email": "anna_ssp@hotmail.com",
      "TelefoneCelular": "48999336883",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Bismarck de Paula Filho",
      "IdentificacaoPessoa": "03090914387",
      "BeneficiarioTitular": "03616743923",
      "DataNascimento": "17-04-1952",
      "Email": "bpfilho@gmail.com",
      "TelefoneCelular": "4891918940",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "ANNA CAROLINA GONÇALVES DE JESUS",
      "IdentificacaoPessoa": "03476276503",
      "DataNascimento": "14-06-1990",
      "Email": "goncalves_anna@hotmail.com",
      "TelefoneCelular": "77988585624",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "VITOR CANGUSSU DE SOUZA MARQUES",
      "IdentificacaoPessoa": "03131361573",
      "DataNascimento": "02-03-1994",
      "Email": "cangussuvitor@gmail.com",
      "TelefoneCelular": "77981121044",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "LARISSA MOTA VAZ",
      "IdentificacaoPessoa": "04566620573",
      "DataNascimento": "16-08-1995",
      "Email": "lari-vaz@hotmail.com",
      "TelefoneCelular": "75991390353",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Allan Rubens Pissuto Cavalieri",
      "IdentificacaoPessoa": "03013515112",
      "BeneficiarioTitular": "25625288836",
      "DataNascimento": "14-06-1994",
      "Email": "cavalieriallan@gmail.com",
      "TelefoneCelular": "11988537304",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "MARLON ALISSON CORRÊA",
      "IdentificacaoPessoa": "05491302686",
      "DataNascimento": "22-02-1982",
      "Email": "marlon.a.correa@gmail.com",
      "TelefoneCelular": "3188464140",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "RENATA LORRAINE SILVA BARBOSA CORRÊA",
      "IdentificacaoPessoa": "11393295614",
      "BeneficiarioTitular": "05491302686",
      "DataNascimento": "11-08-1995",
      "Email": "renata.correa1122@gmail.com",
      "TelefoneCelular": "3188464140",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Astrid Eckschmidt",
      "IdentificacaoPessoa": "10614174848",
      "BeneficiarioTitular": "11997045800",
      "DataNascimento": "30-06-1943",
      "Email": "alex.econsciente@gmail.com",
      "TelefoneCelular": "48996071792",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Manoella Cardoso Guglielmi Borges",
      "IdentificacaoPessoa": "07486709988",
      "BeneficiarioTitular": "48188999920",
      "DataNascimento": "04-12-1996",
      "Email": "manoellacgborges@gmail.com",
      "TelefoneCelular": "48988407174",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "MARLON ALISSON CORRÊA",
      "IdentificacaoPessoa": "0549102686",
      "DataNascimento": "22-02-1982",
      "Email": "marlon.a.correa@gmail.com",
      "TelefoneCelular": "3188464140",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Henrique Rutigliane Weiller",
      "IdentificacaoPessoa": "09447941907",
      "BeneficiarioTitular": "01888208929",
      "DataNascimento": "23-05-2005",
      "Email": "",
      "TelefoneCelular": "47999341521",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Thiago Antônio Lopes Cardoso",
      "IdentificacaoPessoa": "05747224913",
      "BeneficiarioTitular": "79623603991",
      "DataNascimento": "07-11-1985",
      "Email": "weber3e@hotmail.com",
      "TelefoneCelular": "48984648132",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Thays de Figueiredo Silva",
      "IdentificacaoPessoa": "11405271426",
      "DataNascimento": "01-07-2000",
      "Email": "silvathays15@yahoo.com",
      "TelefoneCelular": "81998608903",
      "CorporateId": "39",
      "CodigoContrato": "58",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Vincenzo Zanini",
      "IdentificacaoPessoa": "05867220176",
      "BeneficiarioTitular": "49749064100",
      "DataNascimento": "26-03-1998",
      "Email": "zaninivincenzo98@gmail.com",
      "TelefoneCelular": "48999032777",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "TALITA BIANCA SANTOS PINHEIRO",
      "IdentificacaoPessoa": "06122587265",
      "BeneficiarioTitular": "85714143272",
      "DataNascimento": "19-10-2006",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "NADIA BLAN DE OLIVEIRA",
      "IdentificacaoPessoa": "06548883969",
      "DataNascimento": "25-01-1987",
      "Email": "nadiablan67@gmail.com",
      "TelefoneCelular": "48996211861",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "IVAN BLAN DE SOUZA",
      "IdentificacaoPessoa": "10711375909",
      "BeneficiarioTitular": "06548883969",
      "DataNascimento": "26-06-2004",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "CAROLINA DE JESUS DE ALMEIDA TRINDADE",
      "IdentificacaoPessoa": "06653432211",
      "BeneficiarioTitular": "49093045253",
      "DataNascimento": "10-10-2004",
      "Email": "dejesuscarolinatrindade@gmail.com",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "NAYANA CONCEIÇÃO ALMEIDA DA PAIXÃO",
      "IdentificacaoPessoa": "04794262280",
      "BeneficiarioTitular": "65607635287",
      "DataNascimento": "05-12-1997",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Alfredo de Lima Figueiroa",
      "IdentificacaoPessoa": "08456810444",
      "DataNascimento": "19-07-1953",
      "Email": "alfredo.figueiroa@gmail.com",
      "TelefoneCelular": "81996012412",
      "CorporateId": "39",
      "CodigoContrato": "58",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Morgana Costa da Silva",
      "IdentificacaoPessoa": "08531789923",
      "BeneficiarioTitular": "00008914958",
      "DataNascimento": "06-12-1992",
      "Email": "morganacoosta.92@gmail.com",
      "TelefoneCelular": "48996025739",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Gustavo Eger",
      "IdentificacaoPessoa": "09655637905",
      "BeneficiarioTitular": "00008914958",
      "DataNascimento": "20-04-1996",
      "Email": "gustavo_eger@hotmail.com",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Aurilene ribeiro rodrigues da silva",
      "IdentificacaoPessoa": "10224485440",
      "BeneficiarioTitular": "85792608849",
      "DataNascimento": "15-02-1964",
      "Email": "aurimonterodrigues@gmail.com",
      "TelefoneCelular": "84996669500",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Ana Soares  Dantas Ribeiro",
      "IdentificacaoPessoa": "05977689438",
      "BeneficiarioTitular": "85792608849",
      "DataNascimento": "28-06-1941",
      "Email": "marilene58@Yahoo.com.br",
      "TelefoneCelular": "84994108334",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Rita de Cassia Nicola R. Lelis",
      "IdentificacaoPessoa": "06514107893",
      "DataNascimento": "22-05-1965",
      "Email": "rita.lelis@hotmail.com",
      "TelefoneCelular": "19998127699",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Maria Luiza Barni",
      "IdentificacaoPessoa": "10231180926",
      "BeneficiarioTitular": "59422483972",
      "DataNascimento": "16-06-2004",
      "Email": "marialuizabarni10@gmail.com",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Ana Beatriz Barni",
      "IdentificacaoPessoa": "10231150938",
      "BeneficiarioTitular": "59422483972",
      "DataNascimento": "09-10-2000",
      "Email": "anabeatrizbarni@hotmail.com",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "VINICIUS NASCIMENTO MACEDO",
      "IdentificacaoPessoa": "09135764929",
      "BeneficiarioTitular": "01683142900",
      "DataNascimento": "10-09-2000",
      "Email": "vinimacedo00@hotmail.com",
      "TelefoneCelular": "48988126155",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Arine Oliveira Gonzaga",
      "IdentificacaoPessoa": "08003199662",
      "DataNascimento": "03-01-1984",
      "Email": "arineolgonzaga@gmail.com",
      "TelefoneCelular": "48999404719",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Carlos Luan de Oliveira dos Santos",
      "IdentificacaoPessoa": "06977187948",
      "BeneficiarioTitular": "72854391934",
      "DataNascimento": "21-10-1990",
      "Email": "vitoriaborguessanpatricio@gmail.com",
      "TelefoneCelular": "48988052106",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Silvana Corrêa Costa",
      "IdentificacaoPessoa": "06923797292",
      "BeneficiarioTitular": "71632905949",
      "DataNascimento": "11-09-1968",
      "Email": "sylvanaccm@yahoo.com.br",
      "TelefoneCelular": "49991091016",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Julio Cesar Costa Macedo",
      "IdentificacaoPessoa": "06760744993",
      "BeneficiarioTitular": "71632905949",
      "DataNascimento": "15-07-1997",
      "Email": "",
      "TelefoneCelular": "49991273005",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Luana Gabriele Leal Melo",
      "IdentificacaoPessoa": "05757009209",
      "BeneficiarioTitular": "71632905949",
      "DataNascimento": "14-02-2000",
      "Email": "luanagabrielelealmelo@gmail.com",
      "TelefoneCelular": "49991893167",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Amabile zay",
      "IdentificacaoPessoa": "102593347074",
      "BeneficiarioTitular": "02593347074",
      "DataNascimento": "10-08-2011",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Luísa Helena Mariano da Silva",
      "IdentificacaoPessoa": "07078574818",
      "BeneficiarioTitular": "01268873810",
      "DataNascimento": "12-03-1964",
      "Email": "lhmariano@terra.com.br",
      "TelefoneCelular": "11985229639",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Ana Luiza Souza de Oliveira",
      "IdentificacaoPessoa": "10168773902",
      "BeneficiarioTitular": "02079603990",
      "DataNascimento": "08-06-2011",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Letícia Pedroso",
      "IdentificacaoPessoa": "06494256937",
      "BeneficiarioTitular": "98852019987",
      "DataNascimento": "15-09-1988",
      "Email": "comercial104@demais.fm.br",
      "TelefoneCelular": "47996129109",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Leandro kollross",
      "IdentificacaoPessoa": "07330078999",
      "BeneficiarioTitular": "98852019987",
      "DataNascimento": "02-06-1992",
      "Email": "gerencia101@demais.fm.br",
      "TelefoneCelular": "47999255554",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Emili Micaela Friese Anadão",
      "IdentificacaoPessoa": "08411889980",
      "DataNascimento": "19-08-2000",
      "Email": "",
      "TelefoneCelular": "47991391047",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Anna Carolina dos Santos Cooper",
      "IdentificacaoPessoa": "05692689901",
      "BeneficiarioTitular": "53618190930",
      "DataNascimento": "18-06-2003",
      "Email": "annasantoscooper@gmail.com",
      "TelefoneCelular": "41991716494",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Solange Tamara Lazzarotto",
      "IdentificacaoPessoa": "04741618030",
      "DataNascimento": "01-07-2000",
      "Email": "lazzarottosolangetamara@gmail.com",
      "TelefoneCelular": "54997150123",
      "CorporateId": "39",
      "CodigoContrato": "58",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "THIAGO CESAR PEREIRA",
      "IdentificacaoPessoa": "04661471989",
      "DataNascimento": "27-04-1987",
      "Email": "thgocp@gmail.com",
      "TelefoneCelular": "47996481311",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Gustavo Nascimento Paes",
      "IdentificacaoPessoa": "07977111632",
      "BeneficiarioTitular": "04661471989",
      "DataNascimento": "13-04-1987",
      "Email": "naocriei@gmail.com",
      "TelefoneCelular": "47989052925",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Emilly Blasius",
      "IdentificacaoPessoa": "09935816923",
      "BeneficiarioTitular": "62771590972",
      "DataNascimento": "06-04-2001",
      "Email": "emillyblasius@gmail.com",
      "TelefoneCelular": "47992419720",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Patrick Massuquetto Nekel",
      "IdentificacaoPessoa": "08908266925",
      "BeneficiarioTitular": "82597871991",
      "DataNascimento": "20-11-1998",
      "Email": "tneckhel@gmail.com",
      "TelefoneCelular": "41988819028",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Maykel Felipe Massuquetto Nekel",
      "IdentificacaoPessoa": "08908286950",
      "BeneficiarioTitular": "82597871991",
      "DataNascimento": "07-10-1994",
      "Email": "felipemassuquetto710@gmail.com",
      "TelefoneCelular": "41998143102",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Luciano Colagrossi Souza Costa",
      "IdentificacaoPessoa": "11431050873",
      "DataNascimento": "08-08-1969",
      "Email": "lcscosta@gmail.com",
      "TelefoneCelular": "11992081887",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Marjory Colagrossi Souza Costa",
      "IdentificacaoPessoa": "09152276813",
      "BeneficiarioTitular": "11431050873",
      "DataNascimento": "12-09-1930",
      "Email": "",
      "TelefoneCelular": "1131682437",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "WANDERLÉA FRANCISCA DE SOUZA",
      "IdentificacaoPessoa": "09875924830",
      "BeneficiarioTitular": "57333734900",
      "DataNascimento": "27-12-1968",
      "Email": "wan_der_leia@hotmail.com",
      "TelefoneCelular": "66996570366",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "MARIANA FRANCISCO BARNI",
      "IdentificacaoPessoa": "05312472107",
      "BeneficiarioTitular": "57333734900",
      "DataNascimento": "22-12-1998",
      "Email": "mariana.barni@hotmail.com",
      "TelefoneCelular": "66996842458",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "MARIA TEREZA FRANCISCO BARNI",
      "IdentificacaoPessoa": "05312467103",
      "BeneficiarioTitular": "57333734900",
      "DataNascimento": "13-08-1996",
      "Email": "maria.terezafb@hotmail.com",
      "TelefoneCelular": "66992251212",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Regina Vieira Leandro da Silva",
      "IdentificacaoPessoa": "05160641939",
      "BeneficiarioTitular": "00758734948",
      "DataNascimento": "17-10-1980",
      "Email": "reginavieira.80@gmail.com",
      "TelefoneCelular": "48984025643",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Adriana Venâncio",
      "IdentificacaoPessoa": "10296350800",
      "BeneficiarioTitular": "14903023877",
      "DataNascimento": "27-12-1968",
      "Email": "adrivenancio27@gmail.com",
      "TelefoneCelular": "11943867163",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Gabriela Shikanai de Almeida",
      "IdentificacaoPessoa": "06056247988",
      "BeneficiarioTitular": "82247447104",
      "DataNascimento": "12-06-1995",
      "Email": "gabishikanai@hotmail.com",
      "TelefoneCelular": "48984160700",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Izabel Rovere Shikanai",
      "IdentificacaoPessoa": "06505657894",
      "BeneficiarioTitular": "82247447104",
      "DataNascimento": "05-01-1952",
      "Email": "jishikanai@hotmail.com",
      "TelefoneCelular": "48988453664",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Lucca de Paula Panariello Silva",
      "IdentificacaoPessoa": "10364585986",
      "BeneficiarioTitular": "03616743923",
      "DataNascimento": "11-02-2012",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "JOAO PEDRO JACQUES KULIGOWSKI",
      "IdentificacaoPessoa": "09143899986",
      "DataNascimento": "06-03-1995",
      "Email": "joaojkuligowski@gmail.com",
      "TelefoneCelular": "48991945502",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "AMANDA CAMELLI NUNES",
      "IdentificacaoPessoa": "10023337923",
      "BeneficiarioTitular": "09143899986",
      "DataNascimento": "31-10-1994",
      "Email": "amandacamelli@gmail.com",
      "TelefoneCelular": "48988493471",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Patrícia Antunes Borges",
      "IdentificacaoPessoa": "05694537980",
      "BeneficiarioTitular": "00579818926",
      "DataNascimento": "08-03-1992",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "ALESSANDRO DA MATA SILVA",
      "IdentificacaoPessoa": "05808856582",
      "DataNascimento": "13-12-1992",
      "Email": "alessandrodamata@outlook.com",
      "TelefoneCelular": "77999454028",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "RAFAEL SANTANA NUNES",
      "IdentificacaoPessoa": "06394780502",
      "DataNascimento": "08-09-1993",
      "Email": "rafael.santana.nunes@hotmail.com",
      "TelefoneCelular": "77991273642",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "SAMILA COSTA NOGUEIRA",
      "IdentificacaoPessoa": "04724657596",
      "DataNascimento": "27-05-1993",
      "Email": "sammillanog@gmail.com",
      "TelefoneCelular": "75991608002",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "MARCO GABRIEL OLIVEIRA NOGUEIRA",
      "IdentificacaoPessoa": "08172688555",
      "BeneficiarioTitular": "04724657596",
      "DataNascimento": "07-02-2013",
      "Email": "",
      "TelefoneCelular": "75991249475",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "WESLLEY ARIEL ALMEIDA DOS SANTOS",
      "IdentificacaoPessoa": "08280716599",
      "BeneficiarioTitular": "04724657596",
      "DataNascimento": "05-11-2013",
      "Email": "",
      "TelefoneCelular": "75981071281",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "SARAH VITÓRIA GOMES SILVA RODRIGUES",
      "IdentificacaoPessoa": "09037793584",
      "BeneficiarioTitular": "04724657596",
      "DataNascimento": "07-08-2016",
      "Email": "",
      "TelefoneCelular": "75983666331",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Vitor Pfleger",
      "IdentificacaoPessoa": "11317212924",
      "BeneficiarioTitular": "49543164991",
      "DataNascimento": "08-07-1999",
      "Email": "vitorpfleger15@outlook.com",
      "TelefoneCelular": "48988285521",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Lara Beatriz Saidy de Brito",
      "IdentificacaoPessoa": "09612894906",
      "BeneficiarioTitular": "49543164991",
      "DataNascimento": "09-02-1999",
      "Email": "larasaidy@gmail.com",
      "TelefoneCelular": "48998274565",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Marcio Cesar Pissuto",
      "IdentificacaoPessoa": "09665622838",
      "BeneficiarioTitular": "25625288836",
      "DataNascimento": "24-03-1967",
      "Email": "",
      "TelefoneCelular": "67991313396",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Henrique Mafra",
      "IdentificacaoPessoa": "09683772978",
      "DataNascimento": "28-12-1997",
      "Email": "henriquemafra2812@gmail.com",
      "TelefoneCelular": "47991325583",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Josivan carvalho dos Santos",
      "IdentificacaoPessoa": "12565797931",
      "DataNascimento": "15-05-2000",
      "Email": "josivancarvalho321@gmail.com",
      "TelefoneCelular": "4792256114",
      "CorporateId": "39",
      "CodigoContrato": "58",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Mariane da Conceição Marins",
      "IdentificacaoPessoa": "14024226797",
      "DataNascimento": "08-05-1989",
      "Email": "maribatista0805@gmail.com",
      "TelefoneCelular": "21991766878",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Lucas Rafael da Conceição Batista",
      "IdentificacaoPessoa": "21626059705",
      "BeneficiarioTitular": "14024226797",
      "DataNascimento": "28-06-2016",
      "Email": "maribatista0805@gmail.com",
      "TelefoneCelular": "21991766878",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Riquelmy da Conceição Batista",
      "IdentificacaoPessoa": "18461306708",
      "BeneficiarioTitular": "14024226797",
      "DataNascimento": "27-01-2013",
      "Email": "maribatista0805@gmail.com",
      "TelefoneCelular": "21991766878",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Matheus da Conceição Batista",
      "IdentificacaoPessoa": "18461331737",
      "BeneficiarioTitular": "14024226797",
      "DataNascimento": "07-01-2006",
      "Email": "maribatista0805@gmail.com",
      "TelefoneCelular": "21991766878",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Ana Carolina Verna Vieira",
      "IdentificacaoPessoa": "17299198711",
      "DataNascimento": "02-09-1994",
      "Email": "anacarolinaverna@hotmail.com",
      "TelefoneCelular": "21965517422",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Alice Verna Vieira de Mattos",
      "IdentificacaoPessoa": "18035699725",
      "BeneficiarioTitular": "17299198711",
      "DataNascimento": "26-03-2014",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Murilo Levi Verna Vieira de MAttos",
      "IdentificacaoPessoa": "19667685756",
      "BeneficiarioTitular": "17299198711",
      "DataNascimento": "21-12-2016",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Alex Eckschmidt",
      "IdentificacaoPessoa": "11997045800",
      "DataNascimento": "26-06-1973",
      "Email": "alex@souseguros.com.br",
      "TelefoneCelular": "48999115784",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Eliz S.Eckschmidt",
      "IdentificacaoPessoa": "12097812988",
      "BeneficiarioTitular": "11997045800",
      "DataNascimento": "26-10-1998",
      "Email": "elizeck17@hotmail.com",
      "TelefoneCelular": "11996788787",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Maria do carmo Barbosa Ferreira",
      "IdentificacaoPessoa": "79983103320",
      "BeneficiarioTitular": "03872478311",
      "DataNascimento": "28-10-1972",
      "Email": "",
      "TelefoneCelular": "11941363513",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Guilherme Lino dos  Santos",
      "IdentificacaoPessoa": "47049676896",
      "BeneficiarioTitular": "03872478311",
      "DataNascimento": "31-01-2018",
      "Email": "",
      "TelefoneCelular": "11941363513",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "MARCELO GUGLIELMI BORGES",
      "IdentificacaoPessoa": "48188999920",
      "DataNascimento": "26-09-1968",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Isabelly Nunes Silva",
      "IdentificacaoPessoa": "54264702860",
      "BeneficiarioTitular": "03872478311",
      "DataNascimento": "31-01-2018",
      "Email": "",
      "TelefoneCelular": "11941363513",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Jorge Luiz Santos Apratto",
      "IdentificacaoPessoa": "21305552091",
      "BeneficiarioTitular": "01888208929",
      "DataNascimento": "19-02-1955",
      "Email": "",
      "TelefoneCelular": "48996695137",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Ineudo Noronha Cardoso Junior",
      "IdentificacaoPessoa": "79623603991",
      "DataNascimento": "24-11-1968",
      "Email": "imatelas@hotmail.com",
      "TelefoneCelular": "48999718685",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Ineudo Noronha Cardoso",
      "IdentificacaoPessoa": "13525395949",
      "BeneficiarioTitular": "79623603991",
      "DataNascimento": "22-06-1945",
      "Email": "telasnoronha@outlook.com",
      "TelefoneCelular": "48984260760",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Ivone Lopes Cardoso",
      "IdentificacaoPessoa": "61167843991",
      "BeneficiarioTitular": "79623603991",
      "DataNascimento": "04-01-1947",
      "Email": "imatelas@hotmail.com",
      "TelefoneCelular": "4841052749",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Lina Guglielmi Borges",
      "IdentificacaoPessoa": "66773865972",
      "BeneficiarioTitular": "00937312991",
      "DataNascimento": "22-12-1946",
      "Email": "linagborges@gmail.com",
      "TelefoneCelular": "48991751886",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Maria Laura Silva",
      "IdentificacaoPessoa": "11852161973",
      "BeneficiarioTitular": "02170684999",
      "DataNascimento": "07-05-2013",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Cláudio Hoher da Trindade",
      "IdentificacaoPessoa": "40063534991",
      "DataNascimento": "18-10-1959",
      "Email": "claudiohoherdatr@gmai.com",
      "TelefoneCelular": "48999144125",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Maria Luiza Junckes Chede",
      "IdentificacaoPessoa": "41660633915",
      "BeneficiarioTitular": "40063534991",
      "DataNascimento": "11-02-1961",
      "Email": "Izajunckes@gmail.com",
      "TelefoneCelular": "48999032777",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "joao rubens marschall",
      "IdentificacaoPessoa": "54921198934",
      "DataNascimento": "01-06-1965",
      "Email": "rubens.marschall@gmail.com",
      "TelefoneCelular": "47999245240",
      "CorporateId": "39",
      "CodigoContrato": "58",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Marta Pereira dos Santos Zanini",
      "IdentificacaoPessoa": "49749064100",
      "DataNascimento": "23-08-1970",
      "Email": "zanini.marta@gmail.com",
      "TelefoneCelular": "62996154283",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Rodrigo da Gama dEça Tertschitsch",
      "IdentificacaoPessoa": "78617030968",
      "DataNascimento": "21-02-1963",
      "Email": "rejvarela@hotmail.com",
      "TelefoneCelular": "48996878094",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Rejane Varela da Gama dEça Tertschitsch",
      "IdentificacaoPessoa": "69413061904",
      "BeneficiarioTitular": "78617030968",
      "DataNascimento": "27-07-1970",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "SANDRO INOCENCIO GAIA",
      "IdentificacaoPessoa": "85714143272",
      "DataNascimento": "22-04-1987",
      "Email": "sandrgaia7@gmail.com",
      "TelefoneCelular": "48996213573",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "CELITO DE JESUS DA SILVA TRINDADE",
      "IdentificacaoPessoa": "49093045253",
      "DataNascimento": "28-12-1976",
      "Email": "celitotrindade911@gmail.com",
      "TelefoneCelular": "48996211919",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "SINARA CONSTANTE PEDRONI",
      "IdentificacaoPessoa": "80382991087",
      "DataNascimento": "17-11-1979",
      "Email": "sinaraconstante@gmail.com",
      "TelefoneCelular": "48996211915",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "JULIANO PEDRONI",
      "IdentificacaoPessoa": "96375060044",
      "BeneficiarioTitular": "80382991087",
      "DataNascimento": "18-12-1979",
      "Email": "pedroni52@gmail.com",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "MARIA CLARA PEDRONI",
      "IdentificacaoPessoa": "13650366932",
      "BeneficiarioTitular": "80382991087",
      "DataNascimento": "21-12-2015",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "FATIMA POLLI CONSTANTE",
      "IdentificacaoPessoa": "34419128020",
      "BeneficiarioTitular": "80382991087",
      "DataNascimento": "02-02-1956",
      "Email": "fatimapolli@hotmail.com",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "NEY JOSÉ DA PAIXÃO",
      "IdentificacaoPessoa": "65607635287",
      "DataNascimento": "17-08-1976",
      "Email": "neypaixao2020@gmail.com",
      "TelefoneCelular": "48996953565",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "VINICIUS GABRIEL DA PAIXÃO LIMA",
      "IdentificacaoPessoa": "14396345992",
      "BeneficiarioTitular": "65607635287",
      "DataNascimento": "12-08-2018",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "MARIA JOAQUINA DO ROSÁRIO MEDEIROS",
      "IdentificacaoPessoa": "95414843287",
      "BeneficiarioTitular": "65607635287",
      "DataNascimento": "04-05-1977",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "PAULO ROBERTO FERREIRA DA SILVA",
      "IdentificacaoPessoa": "14185062907",
      "BeneficiarioTitular": "03222295964",
      "DataNascimento": "28-12-2005",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "FABIO LUIZ FERREIRA DA SILVA",
      "IdentificacaoPessoa": "15308523908",
      "BeneficiarioTitular": "03222295964",
      "DataNascimento": "14-01-2014",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "CELIO DA SILVA TRINDADE",
      "IdentificacaoPessoa": "70386013268",
      "DataNascimento": "09-07-1979",
      "Email": "celiosilvatrindade0@gmail.com",
      "TelefoneCelular": "48996995940",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "SUELY DOS SANTOS TRINDADE",
      "IdentificacaoPessoa": "70101030207",
      "BeneficiarioTitular": "70386013268",
      "DataNascimento": "26-11-2000",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "DEUZA BORGES PINHEIRO",
      "IdentificacaoPessoa": "64699650244",
      "BeneficiarioTitular": "70386013268",
      "DataNascimento": "16-07-1971",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Kleber de Arvelos Consenzo",
      "IdentificacaoPessoa": "27022006806",
      "DataNascimento": "17-10-1976",
      "Email": "kconsenzo@gmail.com",
      "TelefoneCelular": "11998089563",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Isadora Terra e Consenzo",
      "IdentificacaoPessoa": "53079789873",
      "BeneficiarioTitular": "27022006806",
      "DataNascimento": "28-02-2013",
      "Email": "isadoratc28@gmail.com",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Onofra Maria Consenzo",
      "IdentificacaoPessoa": "15700322897",
      "BeneficiarioTitular": "27022006806",
      "DataNascimento": "29-07-1950",
      "Email": "nofrinha@gmail.com",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Anderson de Arvelos Consenzo",
      "IdentificacaoPessoa": "28728487893",
      "BeneficiarioTitular": "27022006806",
      "DataNascimento": "14-03-1979",
      "Email": "consenzo@gmail.com",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Lucas da Silva Greff",
      "IdentificacaoPessoa": "42785453808",
      "BeneficiarioTitular": "00008914958",
      "DataNascimento": "07-10-1994",
      "Email": "luck_greff@hotmail.com",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Jose rodrigues da silva",
      "IdentificacaoPessoa": "85792608849",
      "DataNascimento": "11-09-1955",
      "Email": "viverbem1@yahoo.com.br",
      "TelefoneCelular": "48996213573",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Gustavo Nicola Ribeiro Lelis",
      "IdentificacaoPessoa": "41878670824",
      "BeneficiarioTitular": "06514107893",
      "DataNascimento": "17-06-1991",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Valter Roberto Andrade Lelis",
      "IdentificacaoPessoa": "62408895804",
      "BeneficiarioTitular": "06514107893",
      "DataNascimento": "02-03-1956",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Guilherme Nicola Ribeiro Lelis",
      "IdentificacaoPessoa": "44836321832",
      "BeneficiarioTitular": "06514107893",
      "DataNascimento": "06-02-1991",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Fabrício Barni",
      "IdentificacaoPessoa": "59422483972",
      "DataNascimento": "12-03-1968",
      "Email": "fabricio@meycantinhochurrascaria.com.br",
      "TelefoneCelular": "48984049607",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Maria Valentina Oliveira da Silva",
      "IdentificacaoPessoa": "13199173993",
      "BeneficiarioTitular": "08003199662",
      "DataNascimento": "14-03-2017",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Inesita Oliveira Gonzaga",
      "IdentificacaoPessoa": "59353287634",
      "BeneficiarioTitular": "08003199662",
      "DataNascimento": "08-01-1947",
      "Email": "",
      "TelefoneCelular": "37991921280",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Mamede  Jose Gonzaga",
      "IdentificacaoPessoa": "22953965653",
      "BeneficiarioTitular": "08003199662",
      "DataNascimento": "17-06-1948",
      "Email": "leonardoabaete85@gmail.com",
      "TelefoneCelular": "37999464418",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Lara dos Santos Ribeiro Hoy",
      "IdentificacaoPessoa": "15403108920",
      "BeneficiarioTitular": "02482402000",
      "DataNascimento": "09-04-2011",
      "Email": "",
      "TelefoneCelular": "48991156826",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Luísa dos Santos Ribeiro Hoy",
      "IdentificacaoPessoa": "15403099913",
      "BeneficiarioTitular": "02482402000",
      "DataNascimento": "23-06-2016",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "IDESIO REBELO PATRICIO",
      "IdentificacaoPessoa": "72854392934",
      "DataNascimento": "13-06-1969",
      "Email": "idesiorebelopatricio@gmail.com",
      "TelefoneCelular": "48988270276",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Cassio Gomes Patricio",
      "IdentificacaoPessoa": "40245517871",
      "BeneficiarioTitular": "72854391934",
      "DataNascimento": "19-02-1999",
      "Email": "cassio.gpatricio@gmail.com",
      "TelefoneCelular": "48988485834",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Antonio Cesar Macedo",
      "IdentificacaoPessoa": "71632905949",
      "DataNascimento": "20-07-1965",
      "Email": "macedoacesar@bol.com.br",
      "TelefoneCelular": "48996327027",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Manuella da Silva Duarte",
      "IdentificacaoPessoa": "14996258985",
      "BeneficiarioTitular": "02593347074",
      "DataNascimento": "05-07-2019",
      "Email": "",
      "TelefoneCelular": "48996500778",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Bruna Anderssen Dantas de Jesus Batista",
      "IdentificacaoPessoa": "38985615858",
      "BeneficiarioTitular": "01268873810",
      "DataNascimento": "28-03-1996",
      "Email": "dantasdejesusbatista1401@gmail.com",
      "TelefoneCelular": "11969850720",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Anderson Tavares Celeste Batista",
      "IdentificacaoPessoa": "40945585861",
      "BeneficiarioTitular": "01268873810",
      "DataNascimento": "20-11-1990",
      "Email": "ttguanders90@gmail.com",
      "TelefoneCelular": "11983185615",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "IDESIO REBELO PATRICIO",
      "IdentificacaoPessoa": "72854391934",
      "DataNascimento": "13-06-1969",
      "Email": "idesiorebelopatricio@gmail.com",
      "TelefoneCelular": "48988270276",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Valentina de Andrade Brandt Barni",
      "IdentificacaoPessoa": "11594935963",
      "BeneficiarioTitular": "01682842940",
      "DataNascimento": "18-07-2011",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Leticia Celuppi",
      "IdentificacaoPessoa": "13556671948",
      "BeneficiarioTitular": "02552793967",
      "DataNascimento": "16-04-2015",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Jessica Celuppi",
      "IdentificacaoPessoa": "13556677989",
      "BeneficiarioTitular": "02552793967",
      "DataNascimento": "16-04-2015",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Aristides Souza",
      "IdentificacaoPessoa": "22549234987",
      "BeneficiarioTitular": "02079603990",
      "DataNascimento": "14-02-1938",
      "Email": "",
      "TelefoneCelular": "493225 0952",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Roselia Friese Fernandes Anadão",
      "IdentificacaoPessoa": "98852019987",
      "DataNascimento": "19-11-1973",
      "Email": "gerencia104@demais.fm.br",
      "TelefoneCelular": "47999681140",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Douglas Fernandes Anadão",
      "IdentificacaoPessoa": "74167855968",
      "BeneficiarioTitular": "98852019987",
      "DataNascimento": "25-04-1975",
      "Email": "direcao@demais.fm.br",
      "TelefoneCelular": "47999681139",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "I",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "GERTE MARIA NICOLA LOPES RIBEIRO",
      "IdentificacaoPessoa": "31996187821",
      "DataNascimento": "21-02-1923",
      "Email": "",
      "TelefoneCelular": "19998127699",
      "CorporateId": "39",
      "CodigoContrato": "58",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Simone dos Santos",
      "IdentificacaoPessoa": "53618190930",
      "DataNascimento": "10-09-1964",
      "Email": "simonecno@gmail.com",
      "TelefoneCelular": "41998863706",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Wilson Luiz Cooper Júnior",
      "IdentificacaoPessoa": "64225410900",
      "BeneficiarioTitular": "53618190930",
      "DataNascimento": "24-11-1966",
      "Email": "wlcj0123@gmail.com",
      "TelefoneCelular": "41991880676",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Zineide Pereira",
      "IdentificacaoPessoa": "66564727968",
      "BeneficiarioTitular": "04661471989",
      "DataNascimento": "21-01-1968",
      "Email": "neide.pe@hotmail.com",
      "TelefoneCelular": "47991202070",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Elvis Cesar Pereira",
      "IdentificacaoPessoa": "59679190900",
      "BeneficiarioTitular": "04661471989",
      "DataNascimento": "25-02-1966",
      "Email": "thiago.etsus@gmail.com",
      "TelefoneCelular": "47992508534",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Cosimo Barretta",
      "IdentificacaoPessoa": "39963225934",
      "DataNascimento": "01-09-1961",
      "Email": "gabriellabcosta71@gmail.com",
      "TelefoneCelular": "4899482365",
      "CorporateId": "39",
      "CodigoContrato": "58",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "ANA CRISTINA GIULIETTO MARASCO ALVES",
      "IdentificacaoPessoa": "14527819828",
      "DataNascimento": "15-12-1968",
      "Email": "anamarascoalves68@gmail.com",
      "TelefoneCelular": "11999034366",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Reginaldo Ribeiro Oliveira Alves",
      "IdentificacaoPessoa": "18796566809",
      "BeneficiarioTitular": "14527819828",
      "DataNascimento": "02-07-1973",
      "Email": "",
      "TelefoneCelular": 11953233821,
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "João Pedro Marasco Oliveira Alves",
      "IdentificacaoPessoa": "51892958856",
      "BeneficiarioTitular": "14527819828",
      "DataNascimento": "03-05-2011",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Werner Steppan",
      "IdentificacaoPessoa": "16621263953",
      "DataNascimento": "01-07-1946",
      "Email": "wsteppan@gmail.com",
      "TelefoneCelular": "48996026030",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Aristides feuser blasius",
      "IdentificacaoPessoa": "62771590972",
      "DataNascimento": "17-11-1968",
      "Email": "aristideblf@hotmail.com",
      "TelefoneCelular": "47992718860",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Ivonete Massuquetto Nekel",
      "IdentificacaoPessoa": "82597871991",
      "DataNascimento": "25-05-1971",
      "Email": "Ivonetemassuquetto@gmail.com",
      "TelefoneCelular": "41992044618",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Rodolfo Da Silva Nekel",
      "IdentificacaoPessoa": "54012007904",
      "BeneficiarioTitular": "82597871991",
      "DataNascimento": "06-11-1963",
      "Email": "",
      "TelefoneCelular": "41996745654",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Regina Viana Pereira",
      "IdentificacaoPessoa": "62624628053",
      "BeneficiarioTitular": "03278555090",
      "DataNascimento": "27-02-1972",
      "Email": "reginavianap@hotmail.com",
      "TelefoneCelular": "55991750277",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Adelar Kaiper da Rosa",
      "IdentificacaoPessoa": "50024019020",
      "BeneficiarioTitular": "03278555090",
      "DataNascimento": "29-06-1970",
      "Email": "adelarkrosa@gmail.com",
      "TelefoneCelular": "55991322559",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Paulo César da luz",
      "IdentificacaoPessoa": "95072829049",
      "BeneficiarioTitular": "02626690996",
      "DataNascimento": "28-12-1979",
      "Email": "p.cezzar.luzz@hotmail.com",
      "TelefoneCelular": "48988267072",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Maria Vitória Perin de Souza",
      "IdentificacaoPessoa": "13454864992",
      "BeneficiarioTitular": "02626690996",
      "DataNascimento": "06-02-2001",
      "Email": "mvitoria.perin@gmail.com",
      "TelefoneCelular": "48996528139",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Miguel Perin Wundervald",
      "IdentificacaoPessoa": "13454945992",
      "BeneficiarioTitular": "02626690996",
      "DataNascimento": "20-09-2015",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Leandra Dallagnol",
      "IdentificacaoPessoa": "89870280030",
      "BeneficiarioTitular": "11431050873",
      "DataNascimento": "09-09-1974",
      "Email": "ldallag@hotmail.com",
      "TelefoneCelular": "11975255540",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "EDNILSON BARNI",
      "IdentificacaoPessoa": "57333734900",
      "DataNascimento": "01-04-1968",
      "Email": "edbarni@hotmail.com",
      "TelefoneCelular": "65999913331",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Sophia Vieira da Silva",
      "IdentificacaoPessoa": "15391925983",
      "BeneficiarioTitular": "00758734948",
      "DataNascimento": "05-03-2008",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "João Pedro Vieira da Silva",
      "IdentificacaoPessoa": "15391913977",
      "BeneficiarioTitular": "00758734948",
      "DataNascimento": "20-06-2009",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Andrea Venancio Vernacci",
      "IdentificacaoPessoa": "14903023877",
      "DataNascimento": "07-03-1970",
      "Email": "andrea.vernacci@uol.com.br",
      "TelefoneCelular": 11971850639,
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Amanda Venancio Vernacci",
      "IdentificacaoPessoa": "47177356843",
      "BeneficiarioTitular": "14903023877",
      "DataNascimento": "12-01-2007",
      "Email": "amanda.vernacci@gmail.com",
      "TelefoneCelular": "11993218568",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Ana Clara Venâncio da Silva",
      "IdentificacaoPessoa": "50387027831",
      "BeneficiarioTitular": "14903023877",
      "DataNascimento": "28-07-2006",
      "Email": "anaclara.280706@gmail.com",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "FUMIO HIRAGAMI",
      "IdentificacaoPessoa": "24857629887",
      "DataNascimento": "02-07-1949",
      "Email": "fumo.hira@hotmail.com",
      "TelefoneCelular": "49999838007",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "SHIZUKA HIRAGAMI",
      "IdentificacaoPessoa": "75647109934",
      "BeneficiarioTitular": "24857629887",
      "DataNascimento": "22-11-1950",
      "Email": "shihira@hotmail.com",
      "TelefoneCelular": "49999732720",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "JOAQUIM QUEVEDO MARTINELLI MARINHO",
      "IdentificacaoPessoa": "12616823942",
      "BeneficiarioTitular": "00427682924",
      "DataNascimento": "09-10-2015",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "LENIR MARLENE MARTINELLI MARINHO",
      "IdentificacaoPessoa": "82053464968",
      "BeneficiarioTitular": "00427682924",
      "DataNascimento": "11-12-1946",
      "Email": "",
      "TelefoneCelular": "48 3244-7873",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Leandro Perin de Oliveira",
      "IdentificacaoPessoa": "44508080880",
      "DataNascimento": "21-12-1994",
      "Email": "leandro.perino@gmail.com",
      "TelefoneCelular": "48998426825",
      "CorporateId": "39",
      "CodigoContrato": "58",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "José Carlos Inácio",
      "IdentificacaoPessoa": "56609086915",
      "DataNascimento": "08-08-1961",
      "Email": "celiaramosmachado@gmail.com",
      "TelefoneCelular": "4198497622",
      "CorporateId": "39",
      "CodigoContrato": "58",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Melissa Shikanai",
      "IdentificacaoPessoa": "82247447104",
      "DataNascimento": "26-04-1978",
      "Email": "flnmel@gmail.com",
      "TelefoneCelular": "48988457321",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Karla Kristina Coelho",
      "IdentificacaoPessoa": "96719567934",
      "BeneficiarioTitular": "03031389980",
      "DataNascimento": "08-03-1975",
      "Email": "karlacoelho13@hotmail.com",
      "TelefoneCelular": "48984357835",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Lucas Coelho Pini de Sousa",
      "IdentificacaoPessoa": "12111164925",
      "BeneficiarioTitular": "03031389980",
      "DataNascimento": "04-01-2002",
      "Email": "lucas.pini@hotmail.com",
      "TelefoneCelular": "48984570793",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Isadora Coelho Pini de Sousa",
      "IdentificacaoPessoa": "12111157988",
      "BeneficiarioTitular": "03031389980",
      "DataNascimento": "04-01-2007",
      "Email": "isacoelhop@gmail.com",
      "TelefoneCelular": "4891772282",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Lúcia Maria Souza Santos de Paula",
      "IdentificacaoPessoa": "28187627824",
      "BeneficiarioTitular": "03616743923",
      "DataNascimento": "11-07-1958",
      "Email": "luciadpaula@hotmail.com",
      "TelefoneCelular": "48999330095",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "JACQUELINE FREITAS JACQUES",
      "IdentificacaoPessoa": "88892581953",
      "BeneficiarioTitular": "09143899986",
      "DataNascimento": "13-09-1976",
      "Email": "jacques76@gmail.com",
      "TelefoneCelular": "48996426852",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "GILBERTO KULIGOWSKI",
      "IdentificacaoPessoa": "90651740959",
      "BeneficiarioTitular": "09143899986",
      "DataNascimento": "15-02-1972",
      "Email": "gilbertokuligowski72@gmail.com",
      "TelefoneCelular": "42988615229",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Maria Clara Antunes Martins",
      "IdentificacaoPessoa": "14498082982",
      "BeneficiarioTitular": "00579818926",
      "DataNascimento": "11-09-2018",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Maria Antônia Antunes Martins",
      "IdentificacaoPessoa": "12971721914",
      "BeneficiarioTitular": "00579818926",
      "DataNascimento": "10-11-2016",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Douglas Fernandes Pereira",
      "IdentificacaoPessoa": "80747272034",
      "DataNascimento": "20-01-1981",
      "Email": "douglas@bitbar.com.br",
      "TelefoneCelular": "48991561620",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "catiusca freitas frey pereira",
      "IdentificacaoPessoa": "82448302049",
      "BeneficiarioTitular": "80747272034",
      "DataNascimento": "04-10-1983",
      "Email": "",
      "TelefoneCelular": "48991467515",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "joao miguel freitas pereira",
      "IdentificacaoPessoa": "14718800951",
      "BeneficiarioTitular": "80747272034",
      "DataNascimento": "26-08-2015",
      "Email": "",
      "TelefoneCelular": "",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "iracema fernandes pereira",
      "IdentificacaoPessoa": "33551928053",
      "BeneficiarioTitular": "80747272034",
      "DataNascimento": "01-08-1958",
      "Email": "",
      "TelefoneCelular": "48991494909",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "LAISE FERREIRA MOTA",
      "IdentificacaoPessoa": "33970904587",
      "BeneficiarioTitular": "04566620573",
      "DataNascimento": "11-09-1962",
      "Email": "mil_lai@hotmail.com",
      "TelefoneCelular": "77991429189",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Adriano de Brito",
      "IdentificacaoPessoa": "49543164991",
      "DataNascimento": "23-10-1965",
      "Email": "adrianodebrito@hotmail.com",
      "TelefoneCelular": "48999056048",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Junara Cassetari Saidy Brito",
      "IdentificacaoPessoa": "80226558991",
      "BeneficiarioTitular": "49543164991",
      "DataNascimento": "21-04-1971",
      "Email": "saidy.junara@gmail.com",
      "TelefoneCelular": "48996992680",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "MARCELO PASCHOAL PIZZUT",
      "IdentificacaoPessoa": "25625288836",
      "DataNascimento": "26-02-1969",
      "Email": "psicompp@gmail.com",
      "TelefoneCelular": "51993527905",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Dalva Marcia Pissuto",
      "IdentificacaoPessoa": "88212327868",
      "BeneficiarioTitular": "25625288836",
      "DataNascimento": "01-12-1952",
      "Email": "stardmp52@gmail.com",
      "TelefoneCelular": "67991724604",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Edésia Mafra da Silva",
      "IdentificacaoPessoa": "67851460972",
      "BeneficiarioTitular": "09683772978",
      "DataNascimento": "01-08-1963",
      "Email": "",
      "TelefoneCelular": "47996573001",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "CLAUDETE DA CRUZ",
      "IdentificacaoPessoa": "26134168823",
      "BeneficiarioTitular": "09683772978",
      "DataNascimento": "28-09-1975",
      "Email": "",
      "TelefoneCelular": "47996442169",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "José Aroldo Schilichting",
      "IdentificacaoPessoa": "38705001900",
      "DataNascimento": "19-02-1961",
      "Email": "tcjosearoldo@gmail.com",
      "TelefoneCelular": "48984079588",
      "CorporateId": "39",
      "CodigoContrato": "58",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Juvêncio Gomes Silva",
      "IdentificacaoPessoa": "48215074987",
      "DataNascimento": "29-07-1964",
      "Email": "juvenciogomes@gmail.com",
      "TelefoneCelular": "48984098120",
      "CorporateId": "39",
      "CodigoContrato": "58",
      "TipoPessoa": "1",
      "Sexo": "M",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Larissa Machado de Mello",
      "IdentificacaoPessoa": "86379941053",
      "DataNascimento": "11-09-1996",
      "Email": "larissamello@rede.ulbra.br",
      "TelefoneCelular": "51999229553",
      "CorporateId": "39",
      "CodigoContrato": "58",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Annelyse de Lourdes Leite Cruz",
      "IdentificacaoPessoa": "95091408215",
      "DataNascimento": "10-10-1988",
      "Email": "lysecruz@hotmail.com",
      "TelefoneCelular": "51982357435",
      "CorporateId": "39",
      "CodigoContrato": "58",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Helena Doracy de Oliveira Scheleider",
      "IdentificacaoPessoa": "52737675987",
      "DataNascimento": "22-09-1963",
      "Email": "helena_adroaldo@hotmail.com",
      "TelefoneCelular": "41996158120",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "1",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    },
    {
      "Nome": "Heloise Helena de Oliveira Scheleider",
      "IdentificacaoPessoa": "14963079925",
      "BeneficiarioTitular": "52737675987",
      "DataNascimento": "25-05-2012",
      "Email": "helena_adroaldo@hotmail.com",
      "TelefoneCelular": "41996158120",
      "CorporateId": "39",
      "CodigoContrato": "57",
      "TipoPessoa": "2",
      "Sexo": "F",
      "StatusBeneficiario": "A",
      "IdentificacaoCliente": "205",
      "Produtos": "19"
    }
];

function executar() {
    // teste.length
    for (let index = 0; index < teste.length; index++) {
        var usuario = teste[index];
        var jsonString = JSON.stringify(usuario, undefined, 2);
    
        if (!usuario.BeneficiarioTitular) {
            usuario["BeneficiarioTitular"] = "";
        }

        if(usuario.Email == "" && usuario.TelefoneCelular == ""){
            usuario['Email'] = "usuariosememail@gmail.com"
        }

        let dia = usuario.DataNascimento.slice(0,2);
        let mes = usuario.DataNascimento.slice(3,5);
        let ano = usuario.DataNascimento.slice(6,10);
        usuario["DataNascimento"] = (ano + "-" + mes + "-" + dia);
        
        var marcaDependente = '';
        if (usuario.BeneficiarioTitular == "") {
            marcaDependente = "_TITULAR";
        } else {
            marcaDependente = "_DEPENDENTE_DO_" + usuario.BeneficiarioTitular;
        }

        // Create a root reference
        var ref = firebase.storage();
        var storageRef = ref.ref();
    
        storageRef.child('Ativos/' + usuario.Nome + '_' + usuario.DataNascimento + marcaDependente).putString(jsonString, firebase.storage.StringFormat.RAW).then(function(snapshot) {
            console.log('OK');
        }).catch(function(error) {
            console.log(error + ". Id:" + index);
        });

        
    }
}