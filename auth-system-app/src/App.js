import { useState, useEffect } from 'react';
import './auth.css';

function App() {
    const [currentForm, setCurrentForm] = useState('login');
    const [user, setUser] = useState(null);
    const API_URL = 'http://localhost:3001';

    // Theme management
    useEffect(() => {
        const getPreferredTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) return savedTheme;
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        };

        const setTheme = (theme) => {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        };

        setTheme(getPreferredTheme());

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.loginEmail.value;
        const password = e.target.loginPassword.value;

        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                alert('Invalid email or password!');
            }
        } catch (error) {
            alert('Error logging in. Please try again.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const name = e.target.registerName.value;
        const email = e.target.registerEmail.value;
        const password = e.target.registerPassword.value;

        try {
            const response = await fetch(`${API_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                if (response.ok) {
                    alert('Registration successful! Please login.');
                    setCurrentForm('login');
                } else {
                    alert(`Registration failed: ${data.message || 'Please try again.'}`);
                }
            } else {
                if (response.ok) {
                    alert('Registration successful! Please login.');
                    setCurrentForm('login');
                } else {
                    alert(`Registration failed: Server error (${response.status})`);
                }
            }
        } catch (error) {
            alert('Error registering. Please check if the server is running.');
        }
    };

    // If user is logged in, only show the dashboard
    if (user) {
        return (
            <div className="container">
                <div className="theme-toggle">
                    <button onClick={toggleTheme} aria-label="Toggle theme">
                        <span className="light-icon">🌞</span>
                        <span className="dark-icon">🌜</span>
                    </button>
                </div>
                <div id="userDashboard" className="form">
                    <h2>Welcome, <span id="userName">{user.name}</span>!</h2>
                    <div className="dashboard-content">
                        <h3>Profile Information</h3>
                        <p>Name: <span id="profileName">{user.name}</span></p>
                        <p>Email: <span id="profileEmail">{user.email}</span></p>
                    </div>
                    <button id="logoutBtn" onClick={() => setUser(null)}>Logout</button>
                </div>
            </div>
        );
    }

    // If not logged in, show login/register forms
    return (
        <div className="container">
            <div className="theme-toggle">
                <button onClick={toggleTheme} aria-label="Toggle theme">
                    <span className="light-icon">🌞</span>
                    <span className="dark-icon">🌜</span>
                </button>
            </div>
            <div className="forms-container">
                {/* Login Form */}
                <form 
                    id="loginForm" 
                    className={`form ${currentForm !== 'login' ? 'hidden' : ''}`}
                    onSubmit={handleLogin}
                >
                    <h2>Login</h2>
                    <input type="email" id="loginEmail" placeholder="Email" required />
                    <input type="password" id="loginPassword" placeholder="Password" required />
                    <button type="submit">Login</button>
                    <p>Don't have an account? 
                        <button 
                            className="link-button" 
                            onClick={() => setCurrentForm('register')}
                        >
                            Register here
                        </button>
                    </p>
                </form>

                {/* Registration Form */}
                <form 
                    id="registerForm" 
                    className={`form ${currentForm !== 'register' ? 'hidden' : ''}`}
                    onSubmit={handleRegister}
                >
                    <h2>Register</h2>
                    <input type="text" id="registerName" placeholder="Name" required />
                    <input type="email" id="registerEmail" placeholder="Email" required />
                    <input type="password" id="registerPassword" placeholder="Password" required />
                    <button type="submit">Register</button>
                    <p>Already have an account? 
                        <button 
                            className="link-button" 
                            onClick={() => setCurrentForm('login')}
                        >
                            Login here
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default App;