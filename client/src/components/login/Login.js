import React, { useState, useContext } from "react";
import './loginstyle.css';  
import logo from '../images/orange-frog-logo.png';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'sonner';
import { AuthContext } from '../../AuthContext';
import { setToken } from '../../utils/auth';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();
            setLoading(false);

            if (response.status === 200) {
                setToken(data.token);
                login(form.email, data.role);
                toast.success('Login successful!');

                if (data.resetRequired) {
                    navigate('/reset-password');
                } else if (data.completeProfile) {
                    navigate('/complete-profile');
                } else if (data.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/home');
                }
            } else {
                setErrorMessage(data.message);
                toast.error('Invalid credentials, please try again.');
            }
        } catch (error) {
            setLoading(false);
            setErrorMessage('Server error');
            toast.error('Server error, please try again.');
        }
    };

    return (
        <div className="wrapper">
            <div className="login-box">
                <form onSubmit={submit}>
                    <div className="flex justify-center mb-6">
                        <div className="rounded-full bg-white shadow-lg w-36 h-36 flex items-center justify-center">
                            <img 
                                src={logo} 
                                alt="Logo" 
                                className="w-24 h-28"
                            />
                        </div>
                    </div>
                    <h2>Login</h2>
                    {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>} 
                    <div className="input-box">
                        <span className="icon">
                            <ion-icon name="mail"></ion-icon>
                        </span>
                        <input 
                            type="email" 
                            value={form.email} 
                            onChange={handleInputChange} 
                            name="email"
                            required 
                        />
                        <label>Email</label>
                    </div>
                    <div className="input-box">
                        <span className="icon" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                            <ion-icon name={showPassword ? "eye-off" : "eye"}></ion-icon>
                        </span>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            value={form.password} 
                            onChange={handleInputChange} 
                            name="password"
                            required 
                        />
                        <label>Password</label>
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <div className="forgot-password">
                        <a href="#" className="text-white mt-3 flex justify-center underline" onClick={() => toast.info('Please use the Auth0 interface to reset your password.')}>Forgot Password?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
