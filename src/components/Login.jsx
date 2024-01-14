import { useEffect, useState } from "react";
import "./css/login.css";
import axios from "axios";

const Login = () => {
    const [formInput, setFormInput] = useState({
        username: "haji",
        password: "1234",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormInput({ ...formInput, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5000/user/login", formInput);
            localStorage.setItem("loggedUser", JSON.stringify(data));
            window.location.href = "/#/dashboard";
        } catch (err) {
            alert(err.response.data);
        }
    };

    return (
        <div className="login-container">
            <div className="container">
                <form onSubmit={handleLogin}>
                    <div className="form-container">
                        <div className="form-sections mb">
                            <div className="heading-container">
                                <h1 className="heading">Login</h1>
                            </div>
                        </div>
                        <div className="form-sections">
                            <div className="form-fields">
                                <label for="username">Username</label>
                                <input type="text" name="username" className="input-field" value={formInput.username} onChange={handleChange} tabindex="1" required />
                            </div>
                            <div className="form-fields">
                                <label for="pass">Password</label>
                                <div id="pass-field-container">
                                    <input type="password" name="password" className="input-field" required tabindex="2" value={formInput.password} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-fields">
                                <input type="submit" value="Log In" className="login-btn" tabindex="4" />
                            </div>
                        </div>
                    </div>
                </form>
                <div className="buttons">
                    <button className="btn btn-success" onClick={() => setFormInput({ username: "haji", password: "1234" })}>
                        admin
                    </button>
                    <button className="btn btn-primary" onClick={() => setFormInput({ username: "teacher 1133", password: "1234" })}>
                        teacher
                    </button>
                    <button className="btn bg-warning" onClick={() => setFormInput({ username: "student 127834893", password: "1234" })}>
                        student
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
