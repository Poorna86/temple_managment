import React from 'react';
import DashboardNavBar from './DashboardNavBar';
import Header from './Header';

class DashboardPage extends React.Component {
    
    render () {
        
        return(
            <div>
                <DashboardNavBar />
                <Header />
                <p>Welcome !!!!!!</p>
            </div>
        );
    }
}

export default DashboardPage;
