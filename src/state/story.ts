import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Story } from 'state/interfaces';
import { AppThunk } from 'store';
import { changeLoadingState, showError } from 'state/status';
import api from 'services/api';

type CurrentStoryState = {
  stories: Story[];
  current: Story | null;
};

const initialState: CurrentStoryState = {
  stories: [],
  current: null,
};

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    setStories(state, action: PayloadAction<Story[]>) {
      // 'getStories' seems to return stories without ids. I need a way of uniquely identifying stories
      let tempId = 0;
      let newStory: Story;
      state.stories = action.payload.map(story => {
        tempId++;
        newStory = {
          ...story,
          id: story.id ? story.id : tempId,
        };
        return newStory;
      });
    },
    setCurrentStory(state, action: PayloadAction<number>) {
      const id = action.payload;
      const current = state.stories.find(story => story.id === id) || null;
      state.current = current;
    },
  },
});

export const { setStories, setCurrentStory } = storySlice.actions;

export default storySlice.reducer;

// There is no endpoint for approving/rejecting a story. This is jst a mock
export const updateStory = (
  id: number,
  status: string
): AppThunk => async dispatch => {
  try {
    dispatch(changeLoadingState(true));
    // await api.put(`/updateStory/${id}`, { status });
  } catch (err) {
    dispatch(showError(err.message || err.data));
  } finally {
    dispatch(changeLoadingState(false));
  }
};
