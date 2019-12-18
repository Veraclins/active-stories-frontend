import React, { useEffect, useState } from 'react';
import { useAxios } from 'helpers/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { Story, User } from 'state/interfaces';
import styled from 'styled-components';
import { rem } from 'styles';
import StoryCard from 'components/StoryCard';
import { setStories } from 'state/story';

const filterStories = (stories: Story[], user: User) => {
  if (user.userRoles.includes('Admin')) {
    return stories;
  }
  return stories.filter(story => story.createdBy === user.id);
};

const Home: React.FunctionComponent = () => {
  const { stories } = useSelector((state: RootState) => state.story);

  const { user } = useSelector((state: RootState) => state.auth);

  const [filteredStories, setFilteredStories] = useState(stories);
  const dispatch = useDispatch();

  const loadedStories = useAxios(
    {
      url: 'getStories',
    },
    []
  );
  useEffect(() => {
    dispatch(setStories(loadedStories));
  }, [loadedStories, dispatch]);

  useEffect(() => {
    setFilteredStories(filterStories(stories, user as User));
  }, [stories, user]);

  return (
    <Container>
      {filteredStories.map((story, index) => (
        <StoryCard key={index} story={story} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin: ${rem(20)} auto;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export default Home;
