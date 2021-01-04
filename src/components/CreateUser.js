import React from 'react';
import { Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import DashboardNavBar from './DashboardNavBar';
import Header from './header';

class CreateUser extends React.Component{
    constructor(props) {
        super (props)
        this.state = {
            userCreate: false,
            newUser: '',
            userEmail: '',
            userPhone: '',
            errorUserEmail: '',
            errorUserPhone: '',
            errorMsg: '' 
        }
    }

    onUserMailChange = (e) => {
        this.setState({userEmail: e.target.value})
    }

    onUserPhoneChange = (e) => {
        this.setState({userPhone: e.target.value})
    }
    
    redirectToCreateUserPage = () => {
        this.setState({userCreate: false,
                       userEmail: '',
                       userPhone: ''})
    }

    onUserCreatetSubmit = (e) => {
        e.preventDefault()

        if (!this.state.userEmail || !this.state.userPhone) {
            this.setState(() => ({errorMsg: 'please enter user Email and phone number!!' }));
        } else {
            const userDetails = {
                merchantid: this.props.profileData.merchantid,
                userEmail: this.state.userEmail,
                userPhone: this.state.userPhone
            }

            axios
            .post('http://localhost:3000/api/createuser', userDetails)
            .then((response) => {
                this.setState({newUser: response.data.userID})
                this.setState({userCreate: true})
            })
            .catch(err => {
                this.setState({errorUserEmail: '',
                               errorUserPhone: ''})
                const {useremail,phone} = err.response.data
                if(useremail){
                    this.setState({errorUserEmail: useremail})
                }
                if(phone){
                    this.setState({errorUserPhone: phone})
                }
            });
        }
    }

    render() {
        return (
            <div>
                <DashboardNavBar />
                <Header />
                <h2 className="pageTitle">Create User</h2>
                <Form >
                    <div>
                        {this.state.userCreate && 
                            <Form.Group controlId="formBasicEmail" className='user_form'>
                                <Form.Label>User</Form.Label>
                                <Form.Control
                                    disabled
                                    value={this.state.newUser}
                                />
                            </Form.Group>
                        }
                        <Form.Group controlId="formBasicEmail" className='user_form'>
                            <Form.Label>User mail ID</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter User mail ID"
                                value={this.state.userEmail}
                                onChange={this.onUserMailChange}
                            />
                            {this.state.errorUserEmail && <p className="sign_errorMsg">{this.state.errorUserEmail}</p>}
                        </Form.Group>
                        <Form.Group controlId="formBasicPhone" className='user_form'>
                            <Form.Label>User Phone number</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter User Phone Number"
                                value={this.state.userPhone}
                                onChange={this.onUserPhoneChange}
                            />
                            {this.state.errorUserPhone && <p className="sign_errorMsg">{this.state.errorUserPhone}</p>}
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                        <NavLink to="/createuser">
                            {!this.state.userCreate ?
                                <Button className="addButton" type="submit" onClick = {this.onUserCreatetSubmit}>Create User</Button> :
                                <Button className="addButton" >Create User</Button>
                            }
                        </NavLink>
                        {this.state.userCreate && 
                            <div className="successful_update-Msg">
                                <p >User succeffully created !! </p>
                                <p > <a className='click_here' onClick={this.redirectToCreateUserPage}>Click Here</a>  to create another user</p>
                                <p > <Link to="/dashboard">Click Here</Link> Navigate to dashboard page </p>
                            </div>
                        }        
                        </Form.Group>
                        {this.state.errorMsg && <p className="sign_errorMsg">{this.state.errorMsg}</p>}
                    </div>
                </Form>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    profileData: state.auth.profileData
})

// const mapDispatchToProps = (dispatch) => ({
//     merchantLogin: (loginStatus, profileData) => dispatch(merchantLogin(loginStatus, profileData))
// })

export default connect(mapStateToProps) (CreateUser);