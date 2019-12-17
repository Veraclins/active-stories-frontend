import React from 'react';
import { useDispatch } from 'react-redux';
import { changeLoadingState } from 'state/status';

const Home: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  return <div>Hello there;</div>;
};

export default Home;
