import React, { useState } from 'react'
import "./LoginPopup.css";
import { assets } from '../../assets/assets';
import { useForm } from 'react-hook-form';
import { register as registerUser, login } from '../../services/auth';

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login")
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            terms: false
        }
    });

    const onSubmit = async (data) => {

        console.log("Form:-", data);

        setLoading(true);

        try {
            let response;

            if (currState === "Login") {
                response = await login(data.email, data.password);
            } else {
                response = await registerUser(data.name, data.email, data.password);
            }

            console.log("Response:-", response.data)

            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            setShowLogin(false);
            window.location.reload();
        } catch (error) {
            console.error("Login Error:", error);
            alert(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-popup'>
            <form
                className="login-popup-container"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>

                <div className="login-popup-inputs">
                    {/* Name field - Sign up ONLY */}
                    {currState === "Sign up" && (
                        <div className="input-field">
                            <input
                                type="text"
                                placeholder='Your name'
                                {...register("name", {
                                    required: "Name is required"
                                })}
                            />
                            {errors.name && <p className="error">{errors.name.message}</p>}
                        </div>
                    )}

                    {/* Email - ALWAYS shown */}
                    <div className="input-field">
                        <input
                            type="email"
                            placeholder='Your email'
                            {...register("email", {
                                required: "Email needed!",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email format"
                                }
                            })}
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>

                    {currState === "Sign up" && (
                        <>
                            {/* Phone Number */}
                            <div className="input-field">
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    {...register("phone", {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Invalid phone number"
                                        }
                                    })}
                                />
                                {errors.phone && (<p className="error">{errors.phone.message}</p>)}
                            </div>



                            {/* Address */}
                            <div className="input-field">
                                <input
                                    type="text"
                                    placeholder="Address"
                                    {...register("address", {
                                        required: "Address is required"
                                    })}
                                />
                                {errors.address && <p className="error">{errors.address.message}</p>}
                            </div>

                            {/* Landmark */}
                            <div className="input-field">
                                <input type="text" placeholder="Landmark"
                                    {...register("landmark", {
                                        required: "Landmark is required"
                                    })} />
                                {errors.landmark && <p className="error">{errors.landmark.message}</p>}
                            </div>
                        </>
                    )}

                    {/* Password - ALWAYS shown */}
                    <div className="input-field">
                        <input
                            type="password"
                            placeholder='Password'
                            {...register("password", {  // ✅ FIXED SYNTAX
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters"
                                }
                            })}
                        />
                        {errors.password && <p className="error">{errors.password.message}</p>}
                    </div>
                </div>

                {/* ✅ Submit button */}
                <button type="submit" disabled={loading}>
                    {loading
                        ? "🔄 Logging in..."
                        : (currState === "Sign up" ? "Create account" : "Login")
                    }
                </button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {/* Switch modes */}
                {
                    currState === "Login" ? (
                        <p>
                            Create a new account?{' '}
                            <span onClick={() => {
                                setCurrState("Sign up")
                                reset()
                            }}>Sign up</span>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{' '}
                            <span onClick={() => {
                                setCurrState("Login")
                                reset()
                            }}>Login</span>
                        </p>
                    )
                }
            </form >
        </div >
    )
}

export default LoginPopup
