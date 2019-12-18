import React, { useEffect } from 'react';
import styled from 'styled-components';

import { dark, brandGreen } from 'styles/colors';
import { rem } from 'styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { useParams } from 'react-router-dom';
import { setCurrentStory, updateStory } from 'state/story';
import Button from 'components/Button';

const changeStatus = (dispatch: any, storyId: number, status: string) => {
  dispatch(updateStory(storyId, status));
};

const SingleStory: React.FunctionComponent = () => {
  const { current: story } = useSelector((state: RootState) => state.story);
  const { user } = useSelector((state: RootState) => state.auth);
  interface RouteParams {
    id: string;
  }
  const params = useParams<RouteParams>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentStory(Number(params.id)));
  }, [params, dispatch]);

  return (
    <React.Fragment>
      {story ? (
        <Container>
          <Field>
            <Label>Summary:</Label>
            <Text> {story.summary}</Text>
          </Field>
          <Field>
            <Label>Description:</Label>
            <Text> {story.description}</Text>
          </Field>
          <Field>
            <Label>Type:</Label>
            <Text> {story.type}</Text>
          </Field>
          <Field>
            <Label>Cost:</Label>
            <Text>${story.cost}</Text>
          </Field>
          <Field>
            <Label>Complexity:</Label>
            <Text>{story.complexity}</Text>
          </Field>
          <Field>
            <Label>Estimated Time:</Label>
            <Text>{story.estimatedHrs} hr(s)</Text>
          </Field>
          <Field>
            <Label>Status:</Label>
            <Text>{story.status}</Text>
          </Field>
          {user?.userRoles.length && user.userRoles[0] === 'Admin' && (
            <Footer>
              <Button
                background={brandGreen}
                onClick={() => changeStatus(dispatch, story.id, 'approved')}
              >
                Approve
              </Button>
              <Button
                onClick={() => changeStatus(dispatch, story.id, 'rejected')}
              >
                Reject
              </Button>
            </Footer>
          )}
        </Container>
      ) : (
        <Container>
          This story does not exist. Are you sure of the ID?
        </Container>
      )}
    </React.Fragment>
  );
};

const Container = styled.div`
  margin: ${rem(50)} auto;
  padding: ${rem(20)};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: center;
  color: ${dark};
  max-width: ${rem(600)};
  max-height: 90%;
  border-radius: ${rem(20)};
  box-shadow: 0 ${rem(2)} ${rem(6)} ${rem(-2)} ${dark};
  width: 100%;
`;

const Label = styled.div`
  display: flex;
  box-sizing: border-box;
  font-weight: bold;
  color: ${dark};
`;

const Field = styled.div`
  margin: ${rem(10)} 0;
  display: flex;
  box-sizing: border-box;
  /* align-items: center; */
`;

const Text = styled.div`
  font-style: italic;
  margin-left: ${rem(10)};
`;

const Footer = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;

export default SingleStory;
