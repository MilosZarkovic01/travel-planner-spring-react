import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const navigate = useNavigate();

    const isValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value for: ';

        if (firstName === null || firstName === '') {
            isproceed = false;
            errormessage += ' First name';
        }
        if (lastName === null || lastName === '') {
            isproceed = false;
            errormessage += ' Last name';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }

        if (!isproceed) {
            toast.warning(errormessage);
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {

            } else {
                isproceed = false;
                toast.warning('Please enter the valid email');
            }
        }
        return isproceed;
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { firstName, lastName, phoneNumber, email, password };
        if (isValidate()) {
            fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then(() => {
                toast.success('Registered successfully!')
                navigate('/login');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }

    return (
        <div className="col-log-6 mt-4">
            <form className="container" onSubmit={handlesubmit}>
                <div className="card">
                    <div className="card-header">
                        <h1>User Registration</h1>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>First Name<span className="errmsg">*</span></label>
                                    <input value={firstName} onChange={e => setFirstName(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Last Lame<span className="errmsg">*</span></label>
                                    <input value={lastName} onChange={e => setLastName(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Email<span className="errmsg">*</span></label>
                                    <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Password<span className="errmsg">*</span></label>
                                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Phone Number<span className="errmsg">*</span></label>
                                    <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary ">Register</button>
                        <Link to={'/login'} className="btn btn-danger mx-2">Close</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;