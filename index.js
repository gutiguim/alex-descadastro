// // var Inputmask = require('inputmask');
$(document).ready(function(){
    // $(":input").inputmask();
    // Inputmask().mask(document.querySelectorAll("input"));
    // alert("hi");


});

function checkDependente() {
    var x = document.getElementById("person_type").value;
    if(x === "2") {
        document.getElementById("dependant_div").style.display = 'flex';
        var a = document.getElementById("cpf_dependente");
        a.value = '';
        a.required = true;
        a.setCustomValidity('Este campo não pode ficar em branco');
        a.oninput = function(e) {
            e.target.setCustomValidity('');
        }

        document.getElementById("plan_div").style.display = 'none';
        if(document.getElementById("plan")) {
            document.getElementById("plan").required = false;
        }
        // oninput="setCustomValidity('')"
        // required oninvalid="this.
    } else {
        document.getElementById("dependant_div").style.display = 'none';
        if(document.getElementById("dependant_id")) {
            document.getElementById("dependant_id").required = false;
        } 

        document.getElementById("plan_div").style.display = 'flex';
        var b = document.getElementById("plan");
        b.value = "";
        b.required = true;
        b.setCustomValidity('Este campo não pode ficar em branco');
        b.oninput = function(e) {
            e.target.setCustomValidity('');
        }
    }
}

function sendData() {
    var Nome = document.forms["my-form"]["nome"].value;
    var DataNascimento = document.forms["my-form"]["birthday"].value;
    var Email = document.forms["my-form"]["email"].value;
    var TelefoneCelular = document.forms["my-form"]["phone"].value;
    var CorporateId = "39";
    var CodigoContrato = document.forms["my-form"]["plan"].value;
    var TipoPessoa = document.forms["my-form"]["person_type"].value;
    var Sexo = document.forms["my-form"]["sex"].value;
    var StatusBeneficiario = "I";
    var IdentificacaoCliente = "205";
    var Produtos = "19";

    var IdentificacaoPessoa = '';
    var BeneficiarioTitular = '';
    if (TipoPessoa == 1) {
        IdentificacaoPessoa = document.forms["my-form"]["cpfcnpj"].value;
    } else {
        IdentificacaoPessoa = document.forms["my-form"]["cpf_dependente"].value;
        BeneficiarioTitular = document.forms["my-form"]["cpfcnpj"].value;
    }

    if(BeneficiarioTitular == 2) {
        CodigoContrato = 57;
    }
    var apiObject = {};

    if (Nome) apiObject["Nome"] = Nome;
    // if (IdentificacaoBeneficiario) apiObject["IdentificacaoBeneficiario"] = IdentificacaoBeneficiario;
    if (IdentificacaoPessoa) apiObject["IdentificacaoPessoa"] = IdentificacaoPessoa;
    if (IdentificacaoPessoa) apiObject["CPFCNPJ"] = IdentificacaoPessoa;
    if (DataNascimento) apiObject["DataNascimento"] = DataNascimento;
    // if (DataNascimento) apiObject["DataNascimento"] = '05-05-1993';
    if (Email) apiObject["Email"] = Email;
    if (TelefoneCelular) apiObject["TelefoneCelular"] = TelefoneCelular;
    if (CorporateId) apiObject["CorporateId"] = CorporateId;
    if (CodigoContrato) apiObject["CodigoContrato"] = CodigoContrato;
    if (TipoPessoa) apiObject["TipoPessoa"] = TipoPessoa;
    if (BeneficiarioTitular) {
        apiObject["BeneficiarioTitular"] = BeneficiarioTitular;
    } else {
        apiObject["BeneficiarioTitular"] = "";
    }
    if (Sexo) apiObject["Sexo"] = Sexo;
    if (StatusBeneficiario) apiObject["StatusBeneficiario"] = StatusBeneficiario;
    if (IdentificacaoCliente) apiObject["IdentificacaoCliente"] = IdentificacaoCliente;
    if (Produtos) apiObject["Produtos"] = Produtos;

    var jsonString = JSON.stringify(apiObject, undefined, 2);

    // var params = {
    //     username: 'souseguros',
    //     password: 'souseguros2020',
    //     grant_type: 'password'
    // };

    // var formData = new FormData();
    // formData.append('username', 'souseguros');
    // formData.append('password', 'souseguros2020');
    // formData.append('grant_type', 'password');

    // let test = {
    //     'username': 'souseguros'
    //     'password': 'souseguros2020'
    //     'grant_type': 'password'
    // }

    // $.ajax({
    //     url: 'http://lifemanager.nextplus.com.br:9095/lifemanagerapihomologacao/lmapi/token',
    //     data: formData,
    //     type: 'POST',
    //     // contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
    //     processData: false, // NEEDED, DON'T OMIT THIS
    //     success: function(response) {
    //         console.log(response);
    //     },
    //     complete: function(response) {
    //         console.log(response);
    //     },
    //     error: function(response) {
    //         console.log(response);
    //     }
    // });
    

    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', 'http://lifemanager.nextplus.com.br:9095/lifemanagerapihomologacao/lmapi/token', true);
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // xhr.send(test);

    // const url = "https://cors-anywhere.herokuapp.com/http://lifemanager.nextplus.com.br:9095/lifemanagerapihomologacao/lmapi/token";
    // fetch(url, {
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //     },
    //     method : "POST",
    //     body: formData,
    // }).then(
    //     // response => response.text() // .json(), etc.
    //     () => console.log(response)
    //     // same as function(response) {return response.text();}
    // ).then(
    //     html => console.log(html)
    // );

    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://cors-anywhere.herokuapp.com/http://lifemanager.nextplus.com.br:9095/lifemanagerapihomologacao/lmapi/cadastro', true);
    // xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    // xhr.setRequestHeader('Authorization', 'Bearer ' + 'LEKuQBkDmKbtnBsCbQq70wRClD1MMLAmn3GRs5NLWA-FgUecs0ScGf3ebrMtmj28nRNAVI5JneiR4zNPwqZJqRPpXwA1cFyDFMbAR4dhU0vj5A3Obr2cqWGeEkMBmAmFThgJhDKlo1TVNlys7aH8l76kSMWML2p5u48Td2gAqXdXW5epZ30q4IruHooH5QELxfXp61lSxs2TtT4-29k9fxJjHtHgKHEPuu8CT6rH4-q5AdauqZpt3PeomTUvMGPNzLWMFM1T7-GyOE_qXtj3oqWwfjFwSo6iTP6l_IJNhfwt2o6V3CBqpzdaCPYlsYnm');
    // xhr.send(jsonString);
    alert("Cadastro realizado");

    // Create a root reference
    var ref = firebase.storage();
    var storageRef = ref.ref();

    storageRef.child(Nome + '_' + DataNascimento).putString(jsonString, firebase.storage.StringFormat.RAW).then(function(snapshot) {
        console.log('Uploaded string');
    }).catch(function(error) {
        console.log(error);
    });

    // document.getElementById("my-form").reset();

    return false;
}
