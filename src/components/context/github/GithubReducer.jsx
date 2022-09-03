const githubReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case 'GET_USER_AND_REPOS':
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      };
    case 'CLEAR_USERS':
      return {
        ...state,
        users: [],
      };

    case 'ERROR':
      return {
        ...state,
        users: [],
        alertMessage: action.payload,
        loading: false,
      };
    case 'REMOVE_ERROR':
      return {
        ...state,
        alertMessage: null,
        loading: false,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default githubReducer;
