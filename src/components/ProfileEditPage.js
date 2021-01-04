import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import DashboardHeader from '../components/DashboardHeader';
import { merchantLogin } from '../actions/auth';
import axios from 'axios';


class ProfielEditPage extends React.Component {
    constructor(props) {
        super (props)
        this.state = {
            merchantContact: props.profileData.phone ? props.profileData.phone : '',
            merchantEmail: props.profileData.email ? props.profileData.email : 'Add Email address',
            oldPassword: '',
            editPassword: '',
            editReEnterPassword: '',
            contactEdit: false,
            emailEdit: false,
            passwordEdit: false,
            phoneErrorMsg: '',
            emailErrorMsg: '',
            pswdErrorMsg: '',
            phoneSuccesfulUpdateMsg: '',
            emailSuccesfulUpdateMsg: '',
            pswdSuccesfulUpdateMsg: '',
            updateStatus: ''
        }
    } 
    
    onProfileContactEdit = () => {
        this.setState({contactEdit: !this.state.contactEdit})
    }

    onProfileEmailEdit = () => {
        this.setState({emailEdit: !this.state.emailEdit})
    }

    onMerchantContactChange = (e) => {
        this.setState({merchantContact: e.target.value})
    }

    onMerchantEmailChange = (e) => {
        this.setState({merchantEmail: e.target.value})
    }

    onMerchantPasswordChangeClick = () => {
        this.setState({passwordEdit: !this.state.passwordEdit})
    }

    onMerchantOldPasswordChange = (e) => {
        this.setState({oldPassword: e.target.value})
    }

    onMerchantNewPasswordChange = (e) => {
        this.setState({editPassword: e.target.value})
    }

    onMerchantRePasswordChange = (e) => {
        this.setState({editReEnterPassword: e.target.value})
    }
    onSaveProfileContactEdits = () => {
        const profileEditData = {
            phone: this.state.merchantContact
        }
        this.callApiAxios(profileEditData)
    }
    onSaveProfileEmailEdits = () => {
        const profileEditData = {
            email: this.state.merchantEmail
        }
        this.callApiAxios(profileEditData)
    }

    onSaveProfilePswdEdits = () => {
        const profileEditData = {
            oldPassword: this.state.oldPassword,
            password: this.state.editPassword,
            repassword: this.state.editReEnterPassword
        }
        this.callApiAxios(profileEditData)
    }

    handleSuccsfulProfileEdit = (merchantid,phone,email) => {
        const loginStatus = true
        const profileData = {merchantid: merchantid,
                             phone: phone, 
                             email: email}                    
        this.props.merchantLogin(loginStatus, profileData)
    }

    callApiAxios = (profileEditData) => {
        axios
            .patch('http://localhost:3000/api/profileedit', profileEditData)
            .then((response) => {
                this.setState({phoneErrorMsg: '',
                emailErrorMsg: '',
                pswdErrorMsg: '',
                phoneSuccesfulUpdateMsg: '',
                emailSuccesfulUpdateMsg: '',
                pswdSuccesfulUpdateMsg: ''})
                const {merchantid, phone,email, pswdstatus} = response.data
                if (phone !== this.props.profileData.phone) {
                    this.setState({phoneSuccesfulUpdateMsg: 'phone number updated successfully !!'})
                }
                if (email !== this.props.profileData.email) {
                    this.setState({emailSuccesfulUpdateMsg: 'Email updated successfully !!'})
                }
                if (pswdstatus === 'OK'){
                    this.setState({pswdSuccesfulUpdateMsg: 'Password changed successfully !!'})   
                }

                this.handleSuccsfulProfileEdit(merchantid,phone,email)
            })
            .catch((err) => {
                this.setState({phoneErrorMsg: '',
                               emailErrorMsg: '',
                               pswdErrorMsg: '',
                               phoneSuccesfulUpdateMsg: '',
                               emailSuccesfulUpdateMsg: '',
                               pswdSuccesfulUpdateMsg: ''})
                const {phone,email,password,repassword} = err.response.data
                if (phone){
                    this.setState({phoneErrorMsg: phone})
                }
                if (email){
                    this.setState({emailErrorMsg: email})
                }
                if (password){
                    this.setState({pswdErrorMsg: password})
                } else if(repassword){
                    this.setState({pswdErrorMsg: repassword})
                }
            })
    }
    render () {
        return (
            <div>
                <DashboardHeader />
                <h3 className='profile_header'> Profile Edit Page</h3>
                <Form>
                <Form.Group className='profile_group'>
                        <Form.Control
                        disabled
                        type="text"
                        value={this.props.profileData.merchantid}
                        />
                    </Form.Group>
                    <Form.Group className='profile_group'>
                        <Form.Control
                        disabled
                        type="number"
                        value={this.props.profileData.phone}
                        onChange={this.onMerchantContactChange}
                        />
                        <img src='/images/pencil-icon.jpg' height='20px' onClick={this.onProfileContactEdit} />
                    </Form.Group> 
                    {this.state.contactEdit && 
                        <Form.Group className='profile_group-edit'>
                            <Form.Control
                            type="text"
                            value={this.state.merchantContact}
                            onChange={this.onMerchantContactChange}
                            />
                            {this.state.phoneErrorMsg && <p p className="errorMsg">{this.state.phoneErrorMsg}</p>}
                            {this.state.phoneSuccesfulUpdateMsg && <p className="successful_update-Msg">{this.state.phoneSuccesfulUpdateMsg}</p>}
                            <span onClick={this.onSaveProfileContactEdits} className='profile_save'>save changes</span>
                        </Form.Group> 
                    }
                    <Form.Group className='profile_group'>
                        <Form.Control
                        disabled
                        type="email"
                        value={this.props.profileData.email}
                        onChange={this.onMerchantContactChange}
                        />
                        <img src='/images/pencil-icon.jpg' height='20px' onClick={this.onProfileEmailEdit} />
                    </Form.Group> 
                    {this.state.emailEdit && 
                        <Form.Group className='profile_group-edit'>
                            <Form.Control
                            type="text"
                            placeholder='edit email'
                            value={this.state.merchantEmail}
                            onChange={this.onMerchantEmailChange}
                            />
                            {this.state.emailErrorMsg && <p p className="errorMsg">{this.state.emailErrorMsg}</p>}
                            {this.state.emailSuccesfulUpdateMsg && <p className="successful_update-Msg">{this.state.emailSuccesfulUpdateMsg}</p>}
                            <span onClick={this.onSaveProfileEmailEdits} className='profile_save'>save changes</span>
                        </Form.Group> 
                    }
                    <Form.Group className='profile_group-password'>
                        <Form.Control
                        disabled
                        type="password"
                        placeholder="Change Password"
                        />
                        <img src='/images/pencil-icon.jpg' height='20px' onClick={this.onMerchantPasswordChangeClick} />
                    </Form.Group> 
                    {this.state.passwordEdit && 
                        <Form.Group className='profile_group-edit'>
                            <Form.Control
                                type="password"
                                placeholder='old password'
                                value={this.state.oldPassword}
                                onChange={this.onMerchantOldPasswordChange}
                            />
                            <Form.Control
                                type="password"
                                placeholder='new password'
                                value={this.state.editPassword}
                                onChange={this.onMerchantNewPasswordChange}
                            />
                            <Form.Control
                                type="password"
                                placeholder='Re-enter new password'
                                value={this.state.editReEnterPassword}
                                onChange={this.onMerchantRePasswordChange}
                            />
                            {this.state.pswdErrorMsg && <p p className="errorMsg">{this.state.pswdErrorMsg}</p>}
                            {this.state.pswdSuccesfulUpdateMsg && <p className="successful_update-Msg">{this.state.pswdSuccesfulUpdateMsg}</p>}
                            <span onClick={this.onSaveProfilePswdEdits} className='profile_save'>save changes</span>
                        </Form.Group> 
                    }   
                </Form>        
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
        profileData: state.auth.profileData
})

const mapDispatchToProps = (dispatch) => ({
    merchantLogin: (loginStatus, profileData) => dispatch(merchantLogin(loginStatus, profileData))
})

export default connect(mapStateToProps,mapDispatchToProps) (ProfielEditPage);