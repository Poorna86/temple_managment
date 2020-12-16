import React from 'react';
import {NavLink} from 'react-router-dom';
import Card from "react-bootstrap/Card";
import { Modal, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export class UserForm extends React.Component {
    constructor(props) {
        super (props)
        this.state = {
            userID: '',
            userPswd: '',
            userRePswd: '',
            userSignUp: false,
            showUser: false,
            status: '',
            error: ''  
        }
    }

    handleShowUser = () => {
        this.setState({showUser: true})
    }
    handleCloseUser = () => {
        this.setState ({showUser: false})
      }

    handleCloseSignup = () => {
        this.setState ({userSignUp: false})
      }

    onUserIdChange = (e) => {
        this.setState({userID: e.target.value})
    }
    onUserPswdChange = (e) => {
        this.setState({ userPswd : e.target.value})
    }

    onUserRePswdChange = (e) => {
        this.setState({ userRePswd : e.target.value})
    }

    onUserSignUp = (e) => {
        this.setState({userSignUp: true})
    }

    onUserLogin = (e) => {
        this.setState({userSignUp: false})
    }

    onUserSubmit = (e) => {
        e.preventDefault()
        console.log('error')
        if (!this.state.userID || !this.state.userPswd) {
            this.setState(() => ({error: 'please enter Id and password!!' }));
        } else {
            this.setState(() => ({error: ''}))
            const loginmrchnt = {
                userID: this.state.userID,
                userPswd: this.state.userPswd
            }
            
            axios
            .post('http://localhost:3000/merchant/login', loginmrchnt)
            .then((response) => {
                this.setState({status: response.statusText})
            })
            .catch(err => {
                this.setState({error: err.response.data.message})
                console.error('error info: ', err.response.data.message);
            });
        }
    }

    onUserCreatetSubmit = (e) => {
        e.preventDefault()
        if (!this.state.userID || !this.state.userPswd || !this.state.userRePswd) {
            this.setState(() => ({error: 'please enter Id and password!!' }));
        } else {
            this.setState(() => ({error: ''}))
            const signupMerchant = {
                userID: this.state.userID,
                password: this.state.userPswd,
                repassword: this.state.userPswd
            }
            
            axios
            .post('http://localhost:3000/merchant/signup', signupMerchant)
            .then((response) => {
                this.setState({status: response.statusText})
            })
            .catch(err => {
                this.setState({error: err.response.data.message})
                console.error('error info: ', err.response.data.message);
            });
        }
    }
    
      render() {
        return (  
            <div>
                <Card.Text>Sign in with User</Card.Text>
                <NavLink to="/user/login">
                <button className="btn_merchant" onClick={this.handleShowUser}>User</button>
                </NavLink>
                    <form >
                        <Modal show={this.state.showUser} onHide={this.handleCloseUser}>
                            <Modal.Header closeButton>
                                <Modal.Title>User {this.state.userSignUp ?
                                               'Sign Up' : 'Log in'}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit= {this.state.userSignUp ? 
                                        this.onUserCreatetSubmit :
                                        this.onUserSubmit}
                                        className="form_margin">
                                    {this.state.userSignUp ?
                                        <div>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>User ID</Form.Label>
                                                <Form.Control
                                                type="text"
                                                placeholder="Enter User ID"
                                                value={this.state.userID}
                                                onChange={this.onUserIdChange}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                value={this.state.userPswd}
                                                onChange={this.onUserPswdChange}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicRePassword">
                                                <Form.Label>Re-enter Password</Form.Label>
                                                <Form.Control
                                                type="password"
                                                placeholder="Re-enter Password"
                                                value={this.state.userRePswd}
                                                onChange={this.onUserRePswdChange}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicCheckbox">
                                            <NavLink to="/user/login">
                                                <span className="mrch_login" onClick={this.onUserLogin}>Login</span>
                                            </NavLink>    
                                            </Form.Group>    
                                            <Button variant="primary" type="submit" block>
                                                Create password
                                            </Button>
                                            {this.state.error && <p className="errorMsg">{this.state.error}</p>}
                                        </div>
                                    :   
                                        <div>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>User ID</Form.Label>
                                                <Form.Control
                                                type="text"
                                                placeholder="Enter User ID"
                                                value={this.state.userID}
                                                onChange={this.onUserIdChange}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                value={this.state.userPswd}
                                                onChange={this.onUserPswdChange}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" className="label_float" label="Remember Me!" />
                                                <NavLink to="/user/signup">
                                                    <span className="mrch_signup" onClick={this.onUserSignUp}>Signup</span>
                                                </NavLink>
                                            </Form.Group>
                                            <Button variant="primary" type="submit" block>
                                                Login
                                            </Button>
                                            {this.state.error && <p className="errorMsg">{this.state.error}</p>}
                                        </div>
                                    }
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </form>
            </div>
        );
    }    
}