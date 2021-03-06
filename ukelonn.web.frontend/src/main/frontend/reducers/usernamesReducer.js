import { createReducer } from '@reduxjs/toolkit';
import {
    USERS_RECEIVE,
} from '../actiontypes';
import { emptyUser } from './constants';

const usernamesReducer = createReducer([], {
    [USERS_RECEIVE]: (state, action) => action.payload.map(u => u.username),
});

export default usernamesReducer;
