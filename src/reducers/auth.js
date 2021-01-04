export default (state = {}, action) => {
    switch (action.type) {
        case 'MERCHANT_LOGIN': 
            return {
                loginStatus: action.loginStatus,
                profileData: action.profileData
            }
        case 'MERCHANT_SIGNUP': 
            return {
                merchSignup: action.merchSignup
        }
        case 'LOGOUT': 
            return {}
        default: 
            return state    
    }
}