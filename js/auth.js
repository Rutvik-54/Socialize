document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const usernameInput = loginForm.querySelector('input[type="text"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    const loginButton = loginForm.querySelector('button');

    // Enable/disable login button based on input fields
    function validateForm() {
        const isValid = usernameInput.value.length > 0 && passwordInput.value.length > 0;
        loginButton.style.opacity = isValid ? '1' : '0.5';
        loginButton.disabled = !isValid;
    }

    usernameInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);

    // Handle form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        // Simple validation
        if (username === '' || password === '') {
            alert('Please fill in all fields');
            return;
        }

        // Simulate authentication
        if (username === 'demo' && password === 'password') {
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify({
                username: username,
                isLoggedIn: true
            }));
            
            // Redirect to home page
            window.location.href = 'home.html';
        } else {
            alert('Invalid credentials. Try demo/password');
        }
    });

    // Facebook login handler
    const facebookLogin = document.querySelector('.facebook-login');
    facebookLogin.addEventListener('click', () => {
        alert('Facebook login is not implemented in this demo');
    });

    // Initialize form state
    validateForm();
});