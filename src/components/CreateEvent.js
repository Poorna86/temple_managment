import React from 'react';
import { Form } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import moment from 'moment';
import DashboardNavBar from './DashboardNavBar';
import Header from './header';

class CreateEvent extends React.Component{
    constructor(props) {
        super (props)
        this.state = {
            eventCreate: false,
            eventName: '',
            eventManager: '',
            eventManagerPhone: '',
            eventDate: '',
            errorPhoneMsg: '',
            errorMsg: ''
        }
    }

    onEventNameChange = (e) => {
        this.setState({eventName: e.target.value})
    }

    onEventDateChange = (e) => {
        this.setState({eventDate: e.target.value})
    }

    onManagerNameChange = (e) => {
        this.setState({eventManager: e.target.value})
    }

    onManagerPhoneChange = (e) => {
        this.setState({eventManagerPhone: e.target.value})
    }

    onEventCreatetSubmit = (e) => {
        e.preventDefault()

        if (!this.state.eventName || !this.state.eventDate) {
            this.setState(() => ({errorMsg: 'please enter Event name and date!!' }));
        } else {
            const eventDetails = {
                merchantid: this.props.profileData.merchantid,
                eventName: this.state.eventName,
                eventManager: this.state.eventManager,
                eventManagerPhone: this.state.eventManagerPhone,
                eventDate: this.state.eventDate
            }

            axios
            .post('http://localhost:3000/api/createevent', eventDetails)
            .then((response) => {
                this.setState({eventName: response.data.eventName})
                this.setState({eventCreate: true})
            })
            .catch(err => {
                this.setState({errorMsg: '',
                              errorPhoneMsg: ''})
                console.log(err.response.data)
                const {eventManagerPhone} = err.response.data
                if(eventManagerPhone){
                    this.setState({errorPhoneMsg: eventManagerPhone})
                }
            });
        }
    }

    render() {
        return (
            <div>
                <DashboardNavBar />
                <Header />
                <h2 className="pageTitle">Create Event</h2>
                <Form >
                    <div>
                        <Form.Group className='user_form'>
                            <Form.Label>Event Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter event name"
                                value={this.state.eventName}
                                onChange={this.onEventNameChange}
                            />
                        </Form.Group>
                        <Form.Group className='user_form'>
                            <Form.Label>Event manager name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Manager name"
                                value={this.state.eventManager}
                                onChange={this.onManagerNameChange}
                            />
                        </Form.Group>
                        <Form.Group className='user_form'>
                            <Form.Label>Event manager Phone number</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Manager Phone Number"
                                value={this.state.eventManagerPhone}
                                onChange={this.onManagerPhoneChange}
                            />
                            {this.state.errorPhoneMsg && <p className="sign_errorMsg">{this.state.errorPhoneMsg}</p>}
                        </Form.Group>
                        <Form.Group controlId="formBasicDate" className='user_form'>
                            <Form.Label>Event date</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="select date" name="date"
                                value={moment(this.state.eventDate).format("YYYY-MM-DD")}
                                max={moment(this.state.eventDate).format("YYYY-MM-DD")}
                                onChange={this.onEventDateChange}
                            />
                        </Form.Group>
                        <Form.Group >
                        <NavLink to="/createevent">
                            {!this.state.eventCreate ? 
                                <Button className="addButton" type="submit" onClick = {this.onEventCreatetSubmit}>Create event</Button> :
                                <Button className="addButton" >Create event</Button>
                            }
                        </NavLink>
                        {this.state.eventCreate && 
                            <div className="successful_update-Msg">
                                <p >Event succeffully created !! </p>
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

export default connect(mapStateToProps) (CreateEvent);