
const validateForm = (function()
{ 
    const firstName = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const email= document.querySelector("#email");
    const password = document.querySelector("#password");
    const phoneNumber = document.querySelector("#phoneNumber");
    const confirmPassword = document.querySelector("#confirmPassword");
    const form = document.querySelector(".form");
    const submitButton = document.querySelector(".createAcc");

    function init()
    {
        addListeners()
    }

    function addListeners()
    {
        /*
        
        The idea is to only display a message after bluring an element so that it doesnt bash at you the second you touch the element.
        handle blur calls display message if any the input was invalid. 
        checkfirstname checks for invalid input and adds the corrosponding message to the element which displays message uses it.
        if checkfirst name found no wrong input then it clears the message for the element and calls displays message to remove any
        previuos messages.

        */
        firstName.addEventListener("blur", handleBlur);
        firstName.addEventListener("input",checkFirstName);

        lastName.addEventListener("blur",handleBlur);
        lastName.addEventListener("input", checkLastName);

        email.addEventListener("blur", handleBlur);
        email.addEventListener("input", checkEmail);

        phoneNumber.addEventListener("blur", handleBlur);
        phoneNumber.addEventListener("input", ensurePrefix)
        phoneNumber.addEventListener("input", checkPhoneNumber);


        password.addEventListener("blur", handleBlur);
        password.addEventListener("input", checkPassword);

        confirmPassword.addEventListener("blur", handleBlur);
        confirmPassword.addEventListener("input", checkConfirmPassword);
        
        form.addEventListener("submit", validateForm);
    }

    //gets element and pass it to displayMessage
    function handleBlur(e)
    {
        const inputElement = e.target;
        displayMessage(e.target);
    }
    
    //displays error message for element if any
    function displayMessage(element)
    {
        const inputElement = element;
        
        //reset error container text
        const errorContainer = inputElement.parentElement.querySelector(".error-message");
        errorContainer.textContent = "";

        //if input not valid display message
        if(!inputElement.checkValidity())
            errorContainer.textContent =inputElement.validationMessage;
    }

    function checkFirstName()
    {
        const nameValue = firstName.value 
        if(nameValue == "")
            {
                firstName.setCustomValidity("Name cant be empty");
            }
        else if(nameValue.length < 3)
        {
            firstName.setCustomValidity("Name must be more than or equal to 3 characters");
            firstName.classList.add("input-invalid");
        }
        else{
            firstName.setCustomValidity("");
            firstName.classList.remove("input-invalid");
            displayMessage(firstName);//call method to remove error message while typing and not after blur
        }
           
    }

    function checkLastName()
    {
        //reset custom validadity
        lastName.setCustomValidity("");

        const nameValue = lastName.value
        if(nameValue == "")
            {
                lastName.setCustomValidity("Last Name cant be empty");
            }
        else if(nameValue.length < 3)
            {
                lastName.setCustomValidity("Last Name must be more than or equal to 3 characters");
                lastName.classList.add("input-invalid")
            }
        else{
            lastName.setCustomValidity("");
            lastName.classList.remove("input-invalid");
            displayMessage(lastName);//call method to remove error message while typing and not after blur
        }
    }

    function checkEmail()
    {
        //reset custom validadity 
        email.setCustomValidity("");

        const emailValue = email.value;
        const notEmail = email.validity.typeMismatch //checks for an '@' that has something before it and after it.
        // check if email has '@'.
        if(notEmail)
            {
                email.setCustomValidity("Invalid Email");
                email.classList.add("input-invalid");
                return;
            }
        
        // check if email has gmail.com or hotmail.com after the '@'
        const regExp = /^[a-zA-Z0-9._%+-]+@(hotmail\.com|gmail\.com)$/
        const validEnd = regExp.test(emailValue) 
        if(!validEnd)
            {
                email.setCustomValidity("Email must end with 'gmail.com' or 'hotmail.com'");
                email.classList.add("input-invalid");
                return;
            }

        //if valid email
        email.setCustomValidity("");
        displayMessage(email);//call method to remove error message while typing and not after blur
    }

    function ensurePrefix()
    {
        const prefix = "+966-";

        // Check if the phone number already starts with the prefix
        if (!phoneNumber.value.startsWith(prefix)) {
            // If not, add the prefix
            phoneNumber.value = prefix;
    }
    }

    function checkPhoneNumber()
    {
        const regExp = /^\+966-\d{9}$/;
        if(!regExp.test(phoneNumber.value))
            {
                phoneNumber.setCustomValidity("Phone number must be in the following format:+966-123456789")
            }
        else
        {
            phoneNumber.setCustomValidity("")
            displayMessage(phoneNumber);
        }
    }

    //check password is less than 8 chars
    function checkPassword()
    {
        const passValue = password.value;
        const confirmValue = confirmPassword.value;
        if(passValue.length < 8)
            {
                console.log("test")
                password.setCustomValidity("Password must be more than or equal to 8 characters");
                password.classList.add("invalid-input");

                confirmPassword.setCustomValidity("Password must be more than or equal to 8 characters");
                confirmPassword.classList.add("invalid-input");
            }
        else if(passValue != confirmValue)
        {
            password.setCustomValidity("Passwords do not match!");
            password.classList.add("invalid-input");
            confirmPassword.setCustomValidity("Passwords do not match");
            confirmPassword.classList.add("invalid-input");

            return
        }
        else if(passValue == confirmValue)
        {
            password.setCustomValidity("");
            confirmPassword.setCustomValidity("");
    
            //call method for both to remove error message while typing and not after blur
            displayMessage(password);
            displayMessage(confirmPassword);
        }
        
    };
    
    function checkConfirmPassword()
    {
        const passValue = password.value;
        const confirmValue = confirmPassword.value;
        if(confirmValue.length < 8)
            {
                password.setCustomValidity("Password must be more than or equal to 8 characters");
                password.classList.add("invalid-input");

                confirmPassword.setCustomValidity("Password must be more than or equal to 8 characters");
                confirmPassword.classList.add("invalid-input");
            }
        else if((passValue != confirmValue) && passValue != "")//this is so that when the user didnt yet type the confirm field.
        {
            password.setCustomValidity("Passwords do not match!");
            password.classList.add("invalid-input");

            confirmPassword.setCustomValidity("Passwords do not match!");
            confirmPassword.classList.add("invalid-input");
        }
        else
        {
            password.setCustomValidity("");
            confirmPassword.setCustomValidity("");
            
            //call method for both to remove error message while typing and not after blur
            displayMessage(password);
            displayMessage(confirmPassword);
        }
    };

    function validateForm(e)
    {
        e.preventDefault();
        if(!form.checkValidity())
            {
                const elements = form.elements;
                for(let i =0; i<elements.length;i++)
                    {
                        displayMessage(elements[i]);
                    }
            }
    }
    
    init();
})()


// document.querySelectorAll("input").forEach(input => input.addEventListener("blur", checkValidInput))
// document.querySelector("#password").addEventListener("blur", checkMatchingPasswords)
// document.querySelector("#confirmPassword").addEventListener("blur", checkMatchingPasswords)

// function checkValidInput(e)
// {
//     let input = e.target
//     if(!input.validity.valid && input.value != "")
//         {
//             input.classList.remove("input-valid")
//             input.classList.add("input-invalid")
//         }
//     else if(input.validity.valid && input.value != "" && (input.id != 'passowrd' || input.id != "confirmPassword") )
//     {
//         input.classList.remove("input-invalid")
//         input.classList.add("input-valid")
//     }
// }

// function checkMatchingPasswords(e)
// {
//     let passwordField = document.querySelector("#password")
//     let confirmField = document.querySelector("#confirmPassword")
//     let password = passwordField.value
//     let confirmPassword = confirmField.value

//     if(password != confirmPassword)
//         {
//             passwordField.classList.remove("input-valid")
//             confirmField.classList.remove("input-valid")

//             passwordField.classList.add("input-invalid")
//             confirmField.classList.add("input-invalid")
//         }
//     else if (password == confirmPassword) 
//         {
//             passwordField.classList.remove("input-invalid")
//             confirmField.classList.remove("input-invalid")

//             passwordField.classList.add("input-valid")
//             confirmField.classList.add("input-valid")
//         }
// } 