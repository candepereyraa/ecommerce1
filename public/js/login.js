const inputEmail=document.getElementById("email")
const inputPassword=document.getElementById("password")
const divMensaje=document.getElementById("mensaje")
const btnLogin=document.getElementById("btnLogin")

btnLogin.addEventListener("click", async(e)=>{
    e.preventDefault()

    let email=inputEmail.value 
    let password=inputPassword.value 

    if(!email || !password){
        alert(`Complete datos...!!!`)
        return 
    }

    let body={email, password}

    let response=await fetch("/api/sessions/login", {
        method:"post", 
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(body)
    })

    let data=await response.json()

    if(response.status>=400){
        divMensaje.textContent="Error... " + data.error 
    }else{
        // divMensaje.textContent=data.payload
        document.location.href="/perfil"
    }

})
