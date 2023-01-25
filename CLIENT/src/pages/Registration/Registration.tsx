import { useState } from "react";
import { Button } from "@mui/material";
import { Link } from 'react-router-dom'
import { Alert, TextField } from "@mui/material";

import axios from "axios";

function Registration() {
    const [userName, setuserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [password, setpassword] = useState('');
    const [configPassword, setConfigPassword] = useState('');

    const [error, setError] = useState('');

    const errorHandler = (errorName: any) => {
        setError(errorName)
        setTimeout(() => { setError('') }, 3000)

    }


    const sendButtonHandler = async () => {

        console.log('try')
        if (!userName) return errorHandler("Plese enter user name")
        if (!firstName) return errorHandler("Plese enter first name")
        if (!lastName) return errorHandler("Plese enter last name")
        if (!password) return errorHandler("Plese enter password")
        if (!configPassword) return errorHandler("Plese enter config password")

        if (password !== configPassword) return errorHandler("PASSWORD IS NOT MATCH!!")
        const payload = {
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            password: password,
        }
        try {
            const { data } = await axios.post(`https://vacations-api.onrender.com/regester/`, payload)
            setuserName('')
            setFirstName('')
            setLastName('')
            setpassword('')
            setConfigPassword('')

            alert("NEW USER REGISTERED!!");
            return data

        } catch (err) {
            console.log('error')
            console.log(err)
        }
    }
    return (
        <>
            <div className="container">
                <div className="row">

                    {error ? <Alert severity="error" style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: "40%",
                        top: "0%",
                        right: "40%",
                        textAlign: 'center',
                    }}>{error}</Alert> : null}


                    <h4 className="center-align">Registration</h4>
                    <div className="formDiv">
                        <TextField value={userName} className="col s12 m6 offset-m3 l4 offset-l4" label="User Name" variant="outlined"
                            onChange={(e) => setuserName(e.target.value)} /><br />
                    </div>
                    <div className="formDiv">
                        <TextField value={firstName} className="col s12 m6 offset-m3 l4 offset-l4" label="First Name" variant="outlined"
                            onChange={(e) => setFirstName(e.target.value)} /><br />
                    </div>
                    <div className="formDiv">
                        <TextField value={lastName} className="col s12 m6 offset-m3 l4 offset-l4" label="Last Name" variant="outlined"
                            onChange={(e) => setLastName(e.target.value)} /><br />
                    </div>
                    <div className="formDiv">
                        <TextField value={password} className="col s12 m6 offset-m3 l4 offset-l4" label="Password" variant="outlined"
                            onChange={(e) => setpassword(e.target.value)} /><br />
                    </div>
                    <div className="formDiv">
                        <TextField value={configPassword} id="input" className="col s12 m6 offset-m3 l4 offset-l4" label=" Config Password" variant="outlined"
                            onChange={(e) => setConfigPassword(e.target.value)} /><br />
                    </div>
                    <div className="formDiv">
                        <Button className="col s2 m2 offset-m3 2 offset-l5 teal lighten-2 " variant="contained"
                            onClick={sendButtonHandler}>Register</Button>
                    </div>


                </div>
                <div className="center-align"><Link to="/">Back to Login Page</Link></div>
            </div>
        </>
    );
}
export { Registration };
