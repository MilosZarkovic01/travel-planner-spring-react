import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const usenavigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const ProceedLogin = (e) => {
        e.preventDefault();
        const logobj = { email, password };
        if (validate()) {
            fetch("http://localhost:8080/auth/authenticate", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(logobj)
            }).then((res) => {
                if (res.status === 200) {
                    toast.success('Success');
                    res.json().then((data) => {
                        console.log(data);
                        sessionStorage.setItem('token', data.token);
                        sessionStorage.setItem('email', data.email);
                        sessionStorage.setItem('firstName', data.firstName);
                        sessionStorage.setItem('lastName', data.lastName);
                        sessionStorage.setItem('phoneNumber', data.phoneNumber);
                        sessionStorage.setItem('role',data.role);
                        usenavigate('/');
                    });
                }
                else if (res.status === 403) {
                    toast.error('Invalid email or password');
                }
            }).catch((err) => {
                toast.error('Login failed due to: ' + err.message);
            });
        }
    }

    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.warning('Please enter email');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please enter password');
        }
        return result;
    }

    return (
        <div className="row mt-5">
            <div className="offset-lg-4 col-lg-4">
                <form onSubmit={ProceedLogin}>
                    <div className="card">
                        <div className="card-header">
                            <h2>Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Email<span className="errmsg">*</span></label>
                                <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password<span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button>
                            <Link className="btn btn-success mx-3" to={'/register'}>New User</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;