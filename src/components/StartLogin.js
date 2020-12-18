import React from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import Card from "react-bootstrap/Card";
import { Modal, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { UserForm } from './UserForm';
import { merchantLogin, merchantSignUp } from '../actions/auth';

class StartLogin extends React.Component {
    constructor(props) {
        super (props)
        this.state = {
            merchantid: '',
            mrchpswd: '',
            mrchRePswd: '',
            merchantsignUp: false,
            showMerchant: false,
            loginstatus: false,
            error: ''  
        }
    }

    handleShowMerchant = () => {
        console.log('before showMerchant: ', this.state.showMerchant)
        this.setState({showMerchant: true})
        console.log('after showMerchant: ', this.state.showMerchant)
    }
    handleCloseMerchant = () => {
        this.setState ({showMerchant: false})
      }

    handleCloseSignup = () => {
        this.setState ({merchantsignUp: false})
      }

    onMerchantIdChange = (e) => {
        this.setState({merchantid: e.target.value})
    }
    onMerchantPswdChange = (e) => {
        this.setState({ mrchpswd : e.target.value})
    }

    onMerchantRePswdChange = (e) => {
        this.setState({ mrchRePswd : e.target.value})
    }

    onMerchantsignUp = (e) => {
        this.setState({merchantsignUp: true})
    }

    onMerchantLogin = (e) => {
        this.setState({merchantsignUp: false})
    }

    handleSuccsfulLogin = () => {
        const loginStatus = true
        this.props.merchantLogin(loginStatus)
    }

    handleSuccsfulSignUp = () => {
        const signupStatus = true
        this.props.merchantSignUp(signupStatus)
    }

    onMrchntSubmit = (e) => {
        e.preventDefault()
        console.log('error')
        if (!this.state.merchantid || !this.state.mrchpswd) {
            this.setState(() => ({error: 'please enter Id and password!!' }));
        } else {
            this.setState(() => ({error: ''}))
            const loginmrchnt = {
                merchantid: this.state.merchantid,
                mrchpswd: this.state.mrchpswd
            }
            
            axios
            .post('http://localhost:3000/merch/login', loginmrchnt)
            .then((response) => {
                this.setState({status: response.statusText})
                if (response.status === 200) {
                       this.setState({loginstatus: true})
                       this.handleSuccsfulLogin()
                }
            })
            .catch(err => {
                this.setState({error: err.response.data.message})
                console.error('error info: ', err.response.data.message);
            });
        }
    }

    onMrchnCreatetSubmit = (e) => {
        e.preventDefault()
        if (!this.state.merchantid || !this.state.mrchpswd || !this.state.mrchRePswd) {
            this.setState(() => ({error: 'please enter Id and password!!' }));
        } else {
            this.setState(() => ({error: ''}))
            const signupMerchant = {
                merchantid: this.state.merchantid,
                password: this.state.mrchpswd,
                repassword: this.state.mrchRePswd
            }
            
            axios
            .post('http://localhost:3000/merchant/signup', signupMerchant)
            .then((response) => {
                if(response.data.errorMsg){
                    this.setState({error: response.data.errorMsg})
                } else {
                    if (response.status === 200) {
                        this.setState({loginstatus: true})
                        this.handleSuccsfulSignUp()
                    } else {
                        console.log(response)
                    }
                }
            })
            .catch((err) => {
                // const error = err
                // console.log('error: ', error.includes('404'))
                this.setState({error: err.response.data.message})
                console.error('error info: ', err);
            });
        }
    }
    
      render() {
        return (  
            <div>
                <Card.Text>Sign in with Merchant</Card.Text>
                <NavLink to="/merch/login">
                    <button className="btn_merchant" onClick={this.handleShowMerchant}>Merchant</button>
                </NavLink>
                <UserForm />
                    <form >
                        <Modal show={this.state.showMerchant} onHide={this.handleCloseMerchant}>
                            <Modal.Header closeButton>
                                <Modal.Title>Merchant {this.state.merchantsignUp ?
                                               'Sign Up' : 'Log in'}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit= {this.state.merchantsignUp ? 
                                        this.onMrchnCreatetSubmit :
                                        this.onMrchntSubmit}
                                        className="form_margin">
                                    {this.state.merchantsignUp ?
                                        <div>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Merchant ID</Form.Label>
                                                <Form.Control
                                                type="text"
                                                placeholder="Enter Merchant ID"
                                                value={this.state.merchantid}
                                                onChange={this.onMerchantIdChange}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                value={this.state.mrchpswd}
                                                onChange={this.onMerchantPswdChange}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicRePassword">
                                                <Form.Label>Re-enter Password</Form.Label>
                                                <Form.Control
                                                type="password"
                                                placeholder="Re-enter Password"
                                                value={this.state.mrchRePswd}
                                                onChange={this.onMerchantRePswdChange}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicCheckbox">
                                            <NavLink to="/merch/login">
                                                <span className="mrch_login" onClick={this.onMerchantLogin}>Login</span>
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
                                                <Form.Label>Merchant ID</Form.Label>
                                                <Form.Control
                                                type="text"
                                                placeholder="Enter Merchant ID"
                                                value={this.state.merchantid}
                                                onChange={this.onMerchantIdChange}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                value={this.state.mrchpswd}
                                                onChange={this.onMerchantPswdChange}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" className="label_float" label="Remember Me!" />
                                                <NavLink to="/merch/signup">
                                                    <span className="mrch_signup" onClick={this.onMerchantsignUp}>Signup</span>    
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

const mapDispatchToProps = (dispatch) => ({
    merchantLogin: (loginStatus) => dispatch(merchantLogin(loginStatus)),
    merchantSignUp: (signupStatus) => dispatch(merchantSignUp(signupStatus))
 })

 export default connect(undefined, mapDispatchToProps)(StartLogin);