document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signup-form');
    const emailInput = signupForm.querySelector('input[type="email"]');
    const fullNameInput = signupForm.querySelector('input[placeholder="Full Name"]');
    const usernameInput = signupForm.querySelector('input[placeholder="Username"]');
    const passwordInput = signupForm.querySelector('input[type="password"]');
    const submitButton = signupForm.querySelector('button[type="submit"]');

    function validateForm() {
        const isValid = emailInput.value.length > 0 &&
                       fullNameInput.value.length > 0 &&
                       usernameInput.value.length > 0 &&
                       passwordInput.value.length > 5;
        
        submitButton.style.opacity = isValid ? '1' : '0.5';
        submitButton.disabled = !isValid;
    }

    [emailInput, fullNameInput, usernameInput, passwordInput].forEach(input => {
        input.addEventListener('input', validateForm);
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const userData = {
            email: emailInput.value.trim(),
            fullName: fullNameInput.value.trim(),
            username: usernameInput.value.trim(),
            password: passwordInput.value,
            isLoggedIn: true
        };

        // Store user data
        localStorage.setItem('user', JSON.stringify(userData));

        // Redirect to home page
        window.location.href = 'home.html';
    });

    // Facebook signup handler
    const facebookLogin = document.querySelector('.facebook-login');
    facebookLogin.addEventListener('click', () => {
        alert('Facebook signup is not implemented in this demo');
    });

    // Initialize form state
    validateForm();
});