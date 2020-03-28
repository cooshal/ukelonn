import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import usernameReducer from './usernameReducer';
import passwordReducer from './passwordReducer';
import notificationAvailableReducer from './notificationAvailableReducer';
import notificationMessageReducer from './notificationMessageReducer';
import accountReducer from './accountReducer';
import paymentReducer from './paymentReducer';
import jobsReducer from './jobsReducer';
import paymentsReducer from './paymentsReducer';
import jobtypesReducer from './jobtypesReducer';
import haveReceivedResponseFromLoginReducer from './haveReceivedResponseFromLoginReducer';
import loginResponseReducer from './loginResponseReducer';
import performedjobReducer from './performedjobReducer';
import selectedjobReducer from './selectedjobReducer';
import accountsReducer from './accountsReducer';
import paymenttypesReducer from './paymenttypesReducer';
import transactiontypeReducer from './transactiontypeReducer';
import usersReducer from './usersReducer';
import usernamesReducer from './usernamesReducer';
import userReducer from './userReducer';
import passwordsReducer from './passwordsReducer';
import earningsSumOverYearReducer from './earningsSumOverYearReducer';
import earningsSumOverMonthReducer from './earningsSumOverMonthReducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    username: usernameReducer,
    password: passwordReducer,
    notificationAvailable: notificationAvailableReducer,
    notificationMessage: notificationMessageReducer,
    account: accountReducer,
    payment: paymentReducer,
    jobs: jobsReducer,
    payments: paymentsReducer,
    jobtypes: jobtypesReducer,
    haveReceivedResponseFromLogin: haveReceivedResponseFromLoginReducer,
    loginResponse: loginResponseReducer,
    performedjob: performedjobReducer,
    selectedjob: selectedjobReducer,
    accounts: accountsReducer,
    paymenttypes: paymenttypesReducer,
    transactiontype: transactiontypeReducer,
    users: usersReducer,
    usernames: usernamesReducer,
    user: userReducer,
    passwords: passwordsReducer,
    earningsSumOverYear: earningsSumOverYearReducer,
    earningsSumOverMonth: earningsSumOverMonthReducer,
});
