let form = document.querySelector(".form");
let submit = document.querySelector(".createAcc");

document.querySelectorAll("input").forEach(input => input.addEventListener("blur", checkValidInput))
document.querySelector("#password").addEventListener("blur", checkMatchingPasswords)
document.querySelector("#confirmPassword").addEventListener("blur", checkMatchingPasswords)

function checkValidInput(e)
{
    let input = e.target
    if(!input.validity.valid && input.value != "")
        {
            input.classList.remove("input-valid")
            input.classList.add("input-invalid")
        }
    else if(input.validity.valid && input.value != "" && (input.id != 'passowrd' || input.id != "confirmPassword") )
    {
        input.classList.remove("input-invalid")
        input.classList.add("input-valid")
    }
}

function checkMatchingPasswords(e)
{
    let passwordField = document.querySelector("#password")
    let confirmField = document.querySelector("#confirmPassword")
    let password = passwordField.value
    let confirmPassword = confirmField.value

    if(password != confirmPassword)
        {
            passwordField.classList.remove("input-valid")
            confirmField.classList.remove("input-valid")

            passwordField.classList.add("input-invalid")
            confirmField.classList.add("input-invalid")
        }
    else if (password == confirmPassword) 
        {
            passwordField.classList.remove("input-invalid")
            confirmField.classList.remove("input-invalid")

            passwordField.classList.add("input-valid")
            confirmField.classList.add("input-valid")
        }
} 