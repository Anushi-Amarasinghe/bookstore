function getFormElements(){
    
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message= document.getElementById("message");

    return [name, email, subject, message]
}

function getFormValidationElements(){
    
    const nameValidationElement = document.getElementById("nameValidationElement");
    const emailValidationElement = document.getElementById("emailValidationElement");
    const subjectValidationElement = document.getElementById("subjectValidationElement");
    const messageValidationElement = document.getElementById("messageValidationElement");
    console.log(messageValidationElement);

    return [nameValidationElement, emailValidationElement, subjectValidationElement, messageValidationElement]
}

function validateFormSubmission(){

    const [name, email, subject, message] = getFormElements();

    const [nameValidationElement, emailValidationElement, subjectValidationElement, messageValidationElement] = getFormValidationElements();

    const emailRegex = /^[^@]+@[^@]+\.[^@\.]+$/ 
    // Regex geneterated using chatGPT


    if(!name.value){
        nameValidationElement.innerText = "Please enter your name. This is a required field."
        nameValidationElement.classList.remove("text-success");
        nameValidationElement.classList.add("text-danger");
    }
    else{
        nameValidationElement.innerText = "You have entered a valid value.";
        nameValidationElement.classList.remove("text-danger");
        nameValidationElement.classList.add("text-success");
    }

    if(!email.value){
        emailValidationElement.innerText = "Please enter your email. This is a required field."
        emailValidationElement.classList.remove("text-success");
        emailValidationElement.classList.add("text-danger");
    }

    else if(!emailRegex.test(email.value)){
        emailValidationElement.innerText = "Please enter a valid email address."
        emailValidationElement.classList.remove("text-success");
        emailValidationElement.classList.add("text-danger");
    }
    else if(emailRegex.test(email.value)){
        emailValidationElement.innerText = "You have entered a valid email."
        emailValidationElement.classList.remove("text-danger");
        emailValidationElement.classList.add("text-success");
    }

    if(!subject.value){
        subjectValidationElement.innerText = "Please enter a subject. This is a required field."
        subjectValidationElement.classList.remove("text-success");
        subjectValidationElement.classList.add("text-danger");
    }

    else if(subject.value.length < 5){
        subjectValidationElement.innerText = "Please enter a subject. Must be at least 5 characters long."
        subjectValidationElement.classList.remove("text-success");
        subjectValidationElement.classList.add("text-danger");
    }

    else{
        subjectValidationElement.innerText = "You have entered a valid value."
        subjectValidationElement.classList.remove("text-danger");
        subjectValidationElement.classList.add("text-success");  
    }

    if(!message.value){
        messageValidationElement.innerText = "Please enter a message. This is a required field."
        messageValidationElement.classList.remove("text-success");
        messageValidationElement.classList.add("text-danger");
    }

    else if(message.value.length < 10){
        messageValidationElement.innerText = "Please enter your message. Must be at least 10 characters long."
        messageValidationElement.classList.remove("text-success");
        messageValidationElement.classList.add("text-danger");
    }
    
    else{
        messageValidationElement.innerText = "You have entered a valid value."
        messageValidationElement.classList.remove("text-danger");
        messageValidationElement.classList.add("text-success");  
    }
    
}

function resetFormSubmission(){

    const formElements = getFormElements();

    formElements.forEach(element =>{
        element.value = "";
    })

    const formValidationElements = getFormValidationElements()

    formValidationElements.forEach(element =>{
        element.innerText = "";
    })
}
const btnSubmit = document.getElementById("btnSubmit");
const btnReset = document.getElementById("btnReset");

btnSubmit.addEventListener("click", e =>{
    
    e.preventDefault();
    validateFormSubmission();
})

btnReset.addEventListener("click", e=>{

    e.preventDefault();
    resetFormSubmission();
    
})