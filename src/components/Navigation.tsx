import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { rem } from 'styles';
import { RootState } from 'store/rootReducer';
import { logout } from 'state/auth';

interface NavigationProps {
  theme: any;
  pathname?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

interface NavItemProps {
  to: string;
  pathname?: string;
}

interface ProfileProps {
  theme: any;
}

const createInitials = (words: string[]) => {
  const initials = words.map(word => word.charAt(0).toUpperCase());
  return initials.join('');
};

const Navigation: React.FunctionComponent<NavigationProps> = ({
  theme,
  pathname,
  onClick,
}) => {
  const history = useHistory();

  const { authenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <Main>
      <NavItem
        pathname={pathname}
        theme={theme}
        onClick={onClick}
        to={authenticated ? '/create-story' : '/login'}
      >
        {authenticated ? 'Create a story' : 'Login'}
      </NavItem>
      {user && (
        <ProfileContainer>
          <Profile theme={theme}>
            {createInitials([user.firstName || '', user.lastName || ''])}
          </Profile>
          <Dropdown theme={theme} onClick={logoutUser}>
            Logout
          </Dropdown>
        </ProfileContainer>
      )}
    </Main>
  );
};

const NavItem = styled(NavLink)<NavItemProps>`
  border-bottom: ${({ to, pathname }) =>
    pathname && pathname.includes(to) && '2px solid'};
  @media screen and (max-width: ${rem(480)}) {
    margin-bottom: ${rem(10)};
  }
`;

const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media screen and (min-width: ${rem(480)}) {
    max-width: ${rem(800)};
    flex-direction: row;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.background};
  display: none;
  width: ${rem(100)};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 100%;
  height: ${rem(50)};
  cursor: pointer;
`;

const ProfileContainer = styled.div<ProfileProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    ${Dropdown} {
      display: flex;
    }
  }
`;

const Profile = styled.div<ProfileProps>`
  color: ${({ theme }) => theme.background};
  background: ${({ theme }) => theme.color};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${rem(50)};
  height: ${rem(50)};
  border-radius: 50%;
`;

export default Navigation;
