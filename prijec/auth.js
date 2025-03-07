document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const userDashboard = document.getElementById('userDashboard');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    const logoutBtn = document.getElementById('logoutBtn');

    // Update the fetch URLs to include the full server address
    const API_URL = 'http://localhost:3000';

    // Theme management
    const themeToggle = document.getElementById('themeToggle');
    
    // Function to set theme
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    // Function to get user's preferred theme
    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Initialize theme
    setTheme(getPreferredTheme());

    // Listen for theme toggle clicks
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Show/Hide form functions
    const showRegister = () => {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        userDashboard.classList.add('hidden');
    };

    const showLogin = () => {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        userDashboard.classList.add('hidden');
    };

    const showDashboard = (user) => {
        loginForm.classList.add('hidden');
        registerForm.classList.add('hidden');
        userDashboard.classList.remove('hidden');
        document.getElementById('userName').textContent = user.name;
        document.getElementById('profileName').textContent = user.name;
        document.getElementById('profileEmail').textContent = user.email;
    };

    // Event Listeners
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        showRegister();
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showLogin();
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const user = await response.json();
                showDashboard(user);
            } else {
                alert('Invalid email or password!');
            }
        } catch (error) {
            alert('Error logging in. Please try again.');
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        try {
            console.log('Sending registration request:', { name, email, password });

            const response = await fetch(`${API_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            console.log('Response status:', response.status);
            
            // Check if the response has content before trying to parse JSON
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                console.log('Response data:', data);
                
                if (response.ok) {
                    alert('Registration successful! Please login.');
                    showLogin();
                } else {
                    alert(`Registration failed: ${data.message || 'Please try again.'}`);
                }
            } else {
                // Handle non-JSON response
                const textResponse = await response.text();
                console.log('Raw response:', textResponse);
                
                if (response.ok) {
                    alert('Registration successful! Please login.');
                    showLogin();
                } else {
                    alert(`Registration failed: Server error (${response.status})`);
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Error registering. Please check if the server is running.');
        }
    });

    logoutBtn.addEventListener('click', () => {
        showLogin();
    });
}); 