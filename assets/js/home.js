let token = localStorage.getItem("tokenB");
let header = {
  Authorization: "Bearer " + token,
};

function criaElementoLista(item) {
  //cria lista com elementos do JSON;
  const elementoLista = document.getElementById("listaTarefas");
  let elementoLi = document.createElement("li");
  let elementoTxt = document.createElement("h3");
  elementoLi.className = "itemTarefa";
  elementoTxt.className = "TxtTarefa";
  let textoTarefa = document.createTextNode(`${item.txtTarefa}`);
  elementoTxt.appendChild(textoTarefa);
  elementoLi.appendChild(elementoTxt);
  let btnEdit = document.createElement("button");
  btnEdit.className = "btnEditar";
  let txtBtn = document.createTextNode("Edit");
  btnEdit.append(txtBtn);
  elementoLi.appendChild(btnEdit);
  let btnClose = document.createElement("button");
  btnClose.className = "btnClose";
  let txtBtnCl = document.createTextNode("Close");
  btnClose.append(txtBtnCl);
  elementoLi.appendChild(btnClose);
  elementoLista.appendChild(elementoLi);
}

// function editElement() {
//   let elementoParente = this.parentElement;
//   console.log(elementoParente);
// }

const mostraTarefas = (data) => {
  //Cria lista com todos elementos do Json;
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
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
    })
    .finally(() => {
      //loading(false)
    });
}

function criarEdicao(data) {
  //EditElement
  let listaBtnTarefas = document.getElementsByClassName("btnEditar");
  for (let i = 0; i < listaBtnTarefas.length; i++) {
    let btn = listaBtnTarefas[i];
    btn.onclick = () => {
      let elementoLi = btn.parentNode;
      let elementoTexto = `${data[i].txtTarefa}`;
      let divPopUp = document.createElement("div");
      divPopUp.className = "alteracaoPopUp";
      let elementoInput = document.createElement("input");
      elementoInput.className = "inputAlteracao";
      elementoInput.value = elementoTexto;
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
      };
      btnSave.onclick = () => {
        data[i].txtTarefa = elementoInput.value;

        let h3Novo = document.createElement("h3");
        h3Novo.className = "txtTarefa";
        let txtNovo = document.createTextNode(`${elementoInput.value}`);
        h3Novo.appendChild(txtNovo);
        let h3Antigo = elementoLi.firstChild;
        elementoLi.replaceChild(h3Novo, h3Antigo);
        document.body.removeChild(divPopUp);
        //EnviaAlteraçãoParaBanco();
      };
    };
  }
}

function criaExlusao(data) {
  listaBtnClose = document.getElementsByClassName("btnClose");
  for (let i = 0; i < listaBtnClose.length; i++) {
    let btnClose = listaBtnClose[i];
    btnClose.onclick = () => {
      console.log("cliclou");
      data.splice(i);
      let elementoLi = btnClose.parentElement;
      const elementoLista = document.getElementById("listaTarefas");
      elementoLista.removeChild(elementoLi);
    };
  }
}
const btnSair = document.getElementById("btnSair");
btnSair.onclick = () => {
  console.log("saindo...");
  localStorage.removeItem("tokenB");
  window.location.assign("../../index.html");
};

async function criaListaTarefas() {
  // exibeLoadingLista();
  await fetch("../json/tarefas.json", { headers: header })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      mostraTarefas(data);
      criarEdicao(data);
      criaExlusao(data);
    });
}

requisitaDados();
criaListaTarefas();
