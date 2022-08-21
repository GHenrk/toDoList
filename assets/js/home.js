let token = localStorage.getItem("tokenB");
let header = {
  Authorization: "Bearer " + token,
};

var listaTotal = [];

function criaElementoLista(item) {
  //cria lista com elementos do JSON;
  const elementoLista = document.getElementById("listaTarefas");
  let elementoLi = document.createElement("li"); //<li></li>
  let elementoTxt = document.createElement("h3"); //<h3></h3>
  elementoLi.className = "itemTarefa";
  elementoTxt.className = "txtTarefa"; //<h3 class="txtTarefa"></h3>
  let textoTarefa = document.createTextNode(`${item.txtTarefa}`);
  elementoTxt.appendChild(textoTarefa); //<h3 class="txtTarefa">TXT TAREFA DO OBJETO</h3>
  elementoLi.appendChild(elementoTxt); //Adiciono elemento H3 dentro do LI;
  let divBtns = document.createElement("div");
  divBtns.className = "secaoBtns";
  let btnEdit = document.createElement("button"); //<button></button>
  btnEdit.className = "btnEditar btnDiv"; //<button class="btnEditar"></button>
  let imgBtnEdit = document.createElement("img");
  imgBtnEdit.className = "btnEditIcon";
  imgBtnEdit.srcset = "../img/editarIcon.png";
  btnEdit.append(imgBtnEdit); //<button class="btnEditar">Edit</button>;
  divBtns.appendChild(btnEdit); //Adiciono no lI junto com outros elementos;
  let btnClose = document.createElement("button");
  btnClose.className = "btnClose btnDiv";
  let imgBtnClose = document.createElement("img");
  imgBtnClose.className = "btnCloseIcon";
  imgBtnClose.srcset = "../img/closeIcon.png";
  btnClose.append(imgBtnClose);
  divBtns.appendChild(btnClose);
  let elementoCheck = document.createElement("button");
  // elementoCheck.type = "checkbox";
  elementoCheck.className = "btnCheck btnDiv";
  let imgBtnCheck = document.createElement("img");
  imgBtnCheck.className = "BtnCheckIcon";
  imgBtnCheck.srcset = "../img/checkIcon.png";
  elementoCheck.append(imgBtnCheck);
  divBtns.appendChild(elementoCheck);
  elementoLi.appendChild(divBtns);
  elementoLista.appendChild(elementoLi);
  listaTotal.push(item);
  // console.log(listaTotal);
}

const mostraTarefas = (listaElementos) => {
  //Cria lista com todos elementos do Json;
  for (let i = 0; i < listaElementos.length; i++) {
    let item = listaElementos[i];
    criaElementoLista(item);
  }
};

async function requisitaDados() {
  //loading(true)

  await fetch("https://laravel-sanctum-auth.azurewebsites.net/api/v1/me", {
    headers: header,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Informações recebidas");
    })
    .catch((error) => {
      //janelaErro;
      console.log("Deu erro" + error);
      alert("voce não está logado");
      window.location.assign("../../index.html");
    })
    .finally(() => {
      //loading(false)
    });
}

let btnEditEstd = false;
function criarEdicao() {
  //EditElement
  let listaBtnTarefas = document.getElementsByClassName("btnEditar");
  for (let i = 0; i < listaBtnTarefas.length; i++) {
    let btn = listaBtnTarefas[i];
    btn.onclick = () => {
      if (btnEditEstd == false) {
        btnEditEstd = true;
        let elementoLi = btn.parentNode.parentNode;
        // let elementoTexto = `${listaTotal[i].txtTarefa}`;
        let divPopUp = document.createElement("div");
        divPopUp.className = "alteracaoPopUp";
        let elementoInput = document.createElement("input");
        elementoInput.className = "inputAlteracao";
        // elementoInput.value = elementoTexto;
        elementoInput.placeholder = "Faça sua alteração";
        let btnSave = document.createElement("button");
        btnSave.className = "btnSalvar";
        btnSave.append("Save");
        let btnCancel = document.createElement("button");
        btnCancel.className = "btnCancel";
        btnCancel.append("Cancel");
        divPopUp.appendChild(btnCancel);
        divPopUp.appendChild(elementoInput);
        divPopUp.appendChild(btnSave);
        document.body.appendChild(divPopUp);
        btnCancel.onclick = () => {
          document.body.removeChild(divPopUp);
          btnEditEstd = false;
        };
        btnSave.onclick = () => {
          listaTotal[i].txtTarefa = elementoInput.value;
          let h3Novo = document.createElement("h3");
          h3Novo.className = "txtTarefa";
          let txtNovo = document.createTextNode(`${elementoInput.value}`);
          h3Novo.appendChild(txtNovo);
          let h3Antigo = elementoLi.firstChild;
          elementoLi.replaceChild(h3Novo, h3Antigo);
          document.body.removeChild(divPopUp);
          btnEditEstd = false;
        };
      }
    };
  }
}

function criaExlusao() {
  listaBtnClose = document.getElementsByClassName("btnClose");
  for (let i = 0; i < listaBtnClose.length; i++) {
    let btnClose = listaBtnClose[i];
    btnClose.onclick = () => {
      if (btnEditEstd == true) {
        alert("Você precisa terminar sua Edição antes de remover um item!");
      } else {
        listaTotal.splice(i, 1);
        let elementoLi = btnClose.parentElement.parentElement;
        const elementoLista = document.getElementById("listaTarefas");
        elementoLista.removeChild(elementoLi);
        criarEdicao();
        criaChecagem();
      }
    };
  }
}

function criaChecagem() {
  let listaCheck = document.getElementsByClassName("btnCheck");
  for (let i = 0; i < listaCheck.length; i++) {
    let btnCheck = listaCheck[i];
    let elementoLista = btnCheck.parentElement.parentElement;
    console.log(elementoLista);
    btnCheck.onclick = () => {
      elementoLista.classList.toggle("checked");
    };
  }
}

const btnSair = document.getElementById("btnSair");
btnSair.onclick = async () => {
  let token = localStorage.getItem("tokenB");
  let myHeaders = {
    Authorization: `Bearer ${token}`,
  };
  await fetch(
    "https://laravel-sanctum-auth.azurewebsites.net/api/v1/auth/logout",
    {
      method: "POST",
      headers: myHeaders,
    }
  )
    .then(() => {
      localStorage.removeItem("tokenB");
      alert("Usuário Deslogado!!!");
      window.location.assign("../../index.html");
    })
    .catch((error) => {
      alert(
        "Não foi possível realizar essa operação. Por favor, tente novamente!!!"
      );
    });
};

async function criaListaTarefas() {
  // exibeLoadingLista();
  await fetch("../json/tarefas.json", { headers: header })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // listaTotal = data;
      mostraTarefas(data);
      criarEdicao();
      criaExlusao();
      criaChecagem();
    });
}

const btnCreate = document.getElementById("btnCriar");

btnCreate.onclick = () => {
  let txt = document.getElementById("inputTarefa").value;
  console.log(txt);
  if (txt.length == 0) {
    alert("Por favor, insira uma tarefa!");
  } else {
    let data = new Date();
    let status = "1";

    let itemTarefa = {
      txtTarefa: `${txt}`,
      dtCriacao: `${data.getDate()}/${
        data.getMonth() + 1
      }/${data.getFullYear()}`,
      status: status,
    };

    criaElementoLista(itemTarefa);
    criarEdicao();
    criaExlusao();
    criaChecagem();
  }
};

//Teste para gravar info no json;
// let myHeader = {
//   Accept: "application/json",
//   "Content-Type": "application/json",
// };

// async function enviaListaTarefas(listaNova) {
//   // exibeLoadingLista();
//   await fetch("../json/tarefas.json", {
//     method: "POST",
//     headers: myHeader,
//     body: JSON.stringify(listaNova),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       //criaListaTarefas();
//     });
// }

requisitaDados();
criaListaTarefas();
