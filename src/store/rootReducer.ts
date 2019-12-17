import { combineReducers } from '@reduxjs/toolkit';

import status from 'state/status';
import auth from 'state/auth';

const rootReducer = combineReducers({
  status,
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
