//BtnLogin
const btnLogin = document.getElementById("btnLogin");

btnLogin.onclick = () => {
  console.log("Enviando Informações...");
  let login = document.getElementById("login");
  let password = document.getElementById("password");
  console.log(login.value, password.value);
  verificaLogin(login.value, password.value);
};

function mostraLoading(TruOrFalse) {
  let ativo = TruOrFalse;
  let secaoLoading = document.getElementById("loading");
  if (ativo) {
    secaoLoading.style.display = "block";
  } else {
    secaoLoading.style.display = "none";
  }
}

const btnCadastro = document.getElementById("btnCadastrar");

btnCadastro.onclick = () => {
  window.location.assign("./assets/view/cadastro.html");
};

async function verificaLogin(login, password) {
  mostraLoading(true);
  let bodyContent = new FormData();
  bodyContent.append("email", `${login}`);
  bodyContent.append("password", `${password}`);
  // let headersList = {
  //   Accept: "*/*",
  //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  // };
  await fetch(
    "https://laravel-sanctum-auth.azurewebsites.net/api/v1/auth/login",
    {
      method: "POST",
      body: bodyContent,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("SUCESSO!!!");
      let objetoToken = data.data;
      localStorage.setItem("tokenB", `${objetoToken.token}`);
      console.log("Chave de Segurança Armazenada em memória...");
      abrirPageHome();
    })
    .catch(() => {
      alert("Não foi possível realizar o login. Tente novamente!!!");
    })
    .finally(() => {
      mostraLoading(false);
    });
}

function abrirPageHome() {
  const token = localStorage.getItem("tokenB");
  console.log("Redirecionando...");
  if (token) {
    window.location.assign("./assets/view/home.html");
  } else {
    alert("Não foi possível realizar o Login");
  }
}
