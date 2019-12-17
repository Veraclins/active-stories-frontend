import storage from 'helpers/storage';
import { User } from 'state/interfaces';

export const AUTH = 'auth';
export const USER = 'user';

export const persistLogin = (authenticated: boolean, user: User) => {
  console.log(typeof user);
  storage.setItem(AUTH, authenticated);
  storage.setItem(USER, user);
};

export const getAuth = () => {
  const authenticated = Boolean(storage.getItem(AUTH)) || true;
  const user = (storage.getItem(USER) as User) || {
    id: 1,
    firstName: 'Clinton',
    lastName: 'Agada',
    userRoles: ['Admin'],
  };
  return {
    user,
    authenticated,
  };
};

export const clearAuth = () => {
  storage.removeItem(AUTH);
  storage.removeItem(USER);
};
