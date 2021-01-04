import React from 'react';
import axios from 'axios';
import DashboardHeader from '../components/DashboardHeader';
import ProfileEditPage from '../components/ProfileEditPage';
import { history } from '../routers/AppRouter';

// class DashboardPage extends React.Component {
const DashboardPage = () => {
    
        // axios
        //     .get('http://localhost:3000/api/dashboard',{
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //     .then((response) => {
        //         console.log('response: ', response)
        //     })
        //     .catch(function (err) {
        //         console.log('err response data: ', err)
        //         const {merchantid} = err.response.data
        //         if (merchantid){
        //             this.props.history.push("/")
        //         }
        //     })   
        
        return (
            <div>
                <DashboardHeader />
                {history.location.pathname === '/profileedit' && 
                  <ProfileEditPage />
                }
           </div>
        );
    }

export default DashboardPage;