const form = document.getElementById("login-form");
form.addEventListener('submit', loginUser);

async function loginUser(event){
  event.preventDefault()
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const result =await fetch("/api/login", {
    method : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      email,
      password
    })

  }).then((res)=> res.json())
  
  if(result.status ==='ok'){
    alert("Registration Successful!");
  }else{
    alert(result.error);
  }
}
