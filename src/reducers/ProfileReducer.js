import { actions } from "../actions";

const initialState = {
  user: null,
  posts: [],
  loading: false,
  error: null,
};
const ProfileReducer = (state, action) => {
  switch (action.type) {
    case actions.profile.DATA_FESSING:
      return { ...state, loading: true };
    case actions.profile.DATA_FESSING_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.data.user,
        posts: action.data.posts,
      };
    case actions.profile.DATA_FESSING_ERROR:
      return { ...state, loading: false, error: action.error };
    case actions.profile.USER_DATA_UPDATE:
      return { ...state, user: action.data };
    case actions.profile.IMAGE_UPDATE:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          avatar: action.data.avatar,
        },
      };
    default:
      return state;
  }
};

export { ProfileReducer, initialState };
