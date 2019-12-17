import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Form from 'components/Form';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import { useForm } from 'helpers/hooks';
import { rem } from 'styles';
import { dark } from 'styles/colors';
import api from 'services/api';
import { changeLoadingState, showError } from 'state/status';
import { login } from 'state/auth';
import { RootState } from 'store/rootReducer';

const Login: React.FunctionComponent = () => {
  const { authenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState('');

  const submit = async (data: any) => {
    const url = data.adminLogin ? 'admin-login' : 'login';
    try {
      dispatch(changeLoadingState(true));
      const response = await api.post(url, data);
      if (typeof response.data === 'string') {
        throw new Error(response.data);
      }
      dispatch(login(response.data));
      const { userRoles } = response.data;
      if (userRoles.incudes('Admin')) {
        return history.push('/');
      }
      return history.push('/create-story');
    } catch (error) {
      const message = error.message || error.data;
      setErrors(message);
      dispatch(showError(message));
    } finally {
      dispatch(changeLoadingState(false));
    }
  };
  const { values, handleChange, handleSubmit } = useForm(
    {
      email: '',
      password: '',
      adminLogin: false,
    },
    submit
  );

  useEffect(() => {
    if (authenticated) {
      history.push('/');
    }
  });

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        onFocus={() => setErrors('')}
        title="Login"
        submitText="Login"
        errors={errors}
      >
        <LoginInput
          type="email"
          value={values.email}
          required
          name="email"
          placeholder="Email address"
          onChange={handleChange}
        />
        <LoginInput
          type="password"
          value={values.password}
          required
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Checkbox
          checked={values.adminLogin}
          name="adminLogin"
          label="Admin Login"
          onChange={handleChange}
        />
      </Form>
    </Container>
  );
};

const Container = styled.div`
  margin: ${rem(50)} auto;
  padding: 0 ${rem(10)};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  color: ${dark};
  max-width: ${rem(500)};
  height: ${rem(500)};
  border-radius: ${rem(20)};
  box-shadow: 0 ${rem(2)} ${rem(6)} ${rem(-2)} ${dark};
  width: 100%;
`;

const LoginInput = styled(Input)`
  margin: ${rem(20)};
  padding: ${rem(20)};
  border-radius: ${rem(8)};
  align-items: center;
`;

export default Login;
