"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



import { useRouter } from "next/navigation"; 
import { AppDispatch, RootState } from "@/redux/store";
import { authFailure, authStart, authSuccess } from "@/redux/slices/authSlice";
import { loginUser } from "../auth-service";
import "@/styles/auth.css";



const LoginForm: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(authStart());
        try {
            const userData = await dispatch(loginUser({ email, password })).unwrap();
            dispatch(authSuccess({ token: userData.token, user: userData.user }));
            router.push('/dashboard');
        } catch (err) {
            dispatch(authFailure((err as Error).message || 'Invalid email or password'));
        }
    };

    return (
        <div className="auth">
        <div className="auth__container">
          <h2 className="auth__title">Login</h2> {/* Updated text color */}
          
          <form onSubmit={handleLogin} className="auth__form">
            <div>
              <label className="auth__label">Email</label> {/* Fixed color */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth__input"
              />
            </div>
            
            <div>
              <label className="auth__label">Password</label> {/* Fixed color */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth__input"
              />
            </div>
      
            {error && <p className="auth__error">{error}</p>}
      
            <button
              type="submit"
              disabled={isLoading}
              className="auth__button text-lg"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
      

    );
};

export default LoginForm;