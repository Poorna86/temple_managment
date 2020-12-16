export default (state = {}, action) => {
    switch (action.type) {
        case 'MERCHANT_LOGIN': 
            return {
                merchLogin: action.merchLogin
            }
        case 'MERCHANT_SIGNUP': 
            return {
                merchSignup: action.merchSignup
        }    
        case 'MERCHANT_SIGNUP':
            return {}
        default: 
            return state    
    }
}