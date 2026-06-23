function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

// REGEX PATTERNS
const usernamePattern = /^[A-Za-z0-9_]{5,}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

// ELEMENTS
const registerForm = document.getElementById("registerForm");

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

const usernameMsg = document.getElementById("usernameMsg");
const emailMsg = document.getElementById("emailMsg");
const passwordMsg = document.getElementById("passwordMsg");

const successMsg = document.getElementById("successMsg");

// USERNAME VALIDATION
username.addEventListener("keyup", function () {
    if (usernamePattern.test(username.value)) {
        usernameMsg.innerHTML = "✓ Valid Username";
        usernameMsg.style.color = "green";
    } else {
        usernameMsg.innerHTML = "Minimum 5 characters required";
        usernameMsg.style.color = "red";
    }
});

// EMAIL VALIDATION
email.addEventListener("keyup", function () {
    if (emailPattern.test(email.value)) {
        emailMsg.innerHTML = "✓ Valid Email";
        emailMsg.style.color = "green";
    } else {
        emailMsg.innerHTML = "Invalid Email";
        emailMsg.style.color = "red";
    }
});

// PASSWORD VALIDATION
password.addEventListener("keyup", function () {
    if (passwordPattern.test(password.value)) {
        passwordMsg.innerHTML = "✓ Strong Password";
        passwordMsg.style.color = "green";
    } else {
        passwordMsg.innerHTML =
            "Password must contain Uppercase, Lowercase, Number and be at least 8 characters";
        passwordMsg.style.color = "red";
    }
});

// REGISTER FORM
registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Validate Inputs
    if (
        !usernamePattern.test(username.value) ||
        !emailPattern.test(email.value) ||
        !passwordPattern.test(password.value)
    ) {
        successMsg.innerHTML = "Please Enter Valid Details";
        successMsg.style.color = "red";
        return;
    }

    const userData = {
        username: username.value,
        email: email.value,
        password: password.value
    };

    const existingUser = localStorage.getItem(email.value);

    if (existingUser) {
        successMsg.innerHTML = "User Already Exists! Redirecting...";
        successMsg.style.color = "orange";
    } else {
        localStorage.setItem(email.value, JSON.stringify(userData));

        successMsg.innerHTML =
            "✓ Registration Successful! Redirecting...";
        successMsg.style.color = "green";
    }

    // Redirect for both cases
    setTimeout(function () {
        window.location.href = "./index.html";
    }, 2000);
});