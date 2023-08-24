// Register
function registervalidateForm() {
    // Get the values of each input field 
    const registerName = document.getElementById("AdUsName").value;
    const registerMobile = document.getElementById("AdUsMobile").value;
    const registerEmail = document.getElementById("AdUsEmail").value;
    const password = document.getElementById("AdUsPassword").value;
    const confirmPassword = document.getElementById("AdUsComPassword").value;
    const userroll = document.getElementById("AdUsroll").value;
    const userid = document.getElementById("AdUsUserid").value;
    const userdob = document.getElementById("AdUsDob").value;

    // Define regular expressions to validate inputs
    const registerNameRegex = /^[a-zA-Z ]{2,30}$/;
    const registerEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const registerMobileRegex = /^[0]?[6789]\d{9}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // Define regular expressions to validate user ID and user roll
    const userIdRegex = /^[a-zA-Z0-9_-]{4,16}$/;
    const userRollRegex = '';

    // Form Input Error Message
    const nameError = document.getElementById('name-error');
    const mobileError = document.getElementById('mobile-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const comfortpasswordError = document.getElementById('confirm-password-error');
    const userrollerror = document.getElementById('AdUsroll-error');
    const doberror = document.getElementById('dob-error');
    const useriderror = document.getElementById('userid-error');

    // Check if name is valid
    if (!registerNameRegex.test(registerName)) {
        nameError.innerHTML = "Please enter a valid name";
        nameError.style.display = 'block';
        return false;
    } else {
        nameError.style.display = 'none';
    }

    // Check if mobile number is valid
    if (!registerMobileRegex.test(registerMobile)) {
        mobileError.innerHTML = "Please enter a valid 10-digit mobile number";
        mobileError.style.display = 'block';
        return false;
    } else {
        mobileError.style.display = 'none';
    }

    // Check if email is valid
    if (!registerEmailRegex.test(registerEmail)) {
        emailError.innerHTML = "Please enter a valid email address";
        return false;
    }

    // Check if user ID is valid
    if (!userIdRegex.test(userid)) {
        useriderror.innerHTML = "Please enter a valid user ID. Your user ID must contain 4 to 16 characters and can only contain alphanumeric characters, underscores, and hyphens.";
        return false;
    } else {
        useriderror.style.display = 'none';
    }

    // Check if password is valid
    if (!passwordRegex.test(password)) {
        passwordError.innerHTML = "Please enter a valid password. Your password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long.";
        return false;
    }

    // Check if confirm password matches password
    if (password !== confirmPassword) {
        comfortpasswordError.innerHTML = "Passwords do not match.";
        return false;
    }

    // Check if user roll is valid
    if (!userRollRegex.test(userroll)) {
        userrollerror.innerHTML = "Please select a valid user roll.";
        return false;
    } else {
        userrollerror.style.display = 'none';
    }
    // Check if date of birth is valid
    const dob = new Date(userdob);
    if (isNaN(dob.getTime())) {
        doberror.innerHTML = "Please enter a valid date of birth.";
        return false;
    } else {
        doberror.style.display = 'none';
    }

    // If validation passes, submit the form
    document.getElementById("adduserformregistration").submit();
}