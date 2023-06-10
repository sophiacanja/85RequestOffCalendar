import { React, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Form } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
import "./Login.css";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="Login">
            <Form>
                <Form.Group style={{ marginBottom:"30px"}} size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
            </Form>
        </div>
    )
};

export default Login;