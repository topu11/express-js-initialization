function isEmail(emailAdress){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailAdress.match(regex)) 
    return true; 

   else 
    return false; 
}


function isValidPassword(password) {
    const uppercaseRegex = /[A-Z]/;        // At least one uppercase letter
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;  // At least one special character
    const minLength = 6;
  
    // Check if password meets all conditions
    if (password.length >= minLength &&
        uppercaseRegex.test(password) &&
        specialCharRegex.test(password)) {
      return true;
    }
    return false;
  }
  
module.exports={isEmail,isValidPassword}
  