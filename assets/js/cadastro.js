let btnCadastrar = document.getElementById("btnCadastro");

btnCadastrar.onclick = async () => {
  mostraLoading(true);
  console.log("clicou");
  const nome = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  console.log(nome.value, email.value, password.value);
  let bodyContent = new FormData();
  bodyContent.append("name", `${nome.value}`);
  bodyContent.append("email", `${email.value}`);
  bodyContent.append("password", `${password.value}`);
  bodyContent.append("confirm_password", `${password.value}`);

  await fetch(
    "https://laravel-sanctum-auth.azurewebsites.net/api/v1/auth/register",
    {
      method: "POST",
      body: bodyContent,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      
      // let objetoToken = data.data;
      // localStorage.setItem("tokenB", `${objetoToken.token}`);
      // console.log(objetoToken.token);
      // // console.log("Chave de Segurança Armazenada em memória...");
      // window.location.assign("home.html");
    })
    .catch((error) => {
      alert("Não foi possível realizar o cadastro, tente novamente mais tarde!!!");
    }).finally(()=> {
      mostraLoading(false);
    });
};

let btnVoltar = document.getElementById("btnVoltar");

btnVoltar.onclick = () => {
  window.location.assign("../../index.html");
};

function mostraLoading(TruOrFalse) {
  let ativo = TruOrFalse;
  let secaoLoading = document.getElementById("loading");
  if (ativo) {
    secaoLoading.style.display = "flex";
  } else {
    secaoLoading.style.display = "none";
  }
}
