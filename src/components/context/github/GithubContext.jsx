import { createContext, useEffect, useReducer } from 'react';

import axios from 'axios';
import githubReducer from './GithubReducer';

const GithubContext = createContext({});
export default GithubContext;

export const GithubContextProvider = (props) => {
  const [state, dispatch] = useReducer(githubReducer, {
    loading: false,
    users: [],
    user: {},
    repos: [],
    alertMessage: null,
  });

  useEffect(() => {
    getResult();
  }, []);

  const getResult = async () => {
    dispatch({ type: 'SET_LOADING' });
    await axios
      .get(`${process.env.REACT_APP_GITHUB_URL}/users`)
      .then(successfulResponse, unSuccesfullResponse);

    function successfulResponse(response) {
      dispatch({ type: 'GET_USERS', payload: response.data });
    }
    function unSuccesfullResponse(error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  const getUser = async (login) => {
    dispatch({ type: 'SET_LOADING' });

    await Promise.all([
      axios.get(`${process.env.REACT_APP_GITHUB_URL}/users/${login}`),
      axios.get(`${process.env.REACT_APP_GITHUB_URL}/users/${login}/repos`),
    ]).then(successfulResponse, unSuccesfullResponse);

    function successfulResponse(response) {
      dispatch({
        type: 'GET_USER_AND_REPOS',
        payload: { user: response[0].data, repos: response[1].data },
      });
    }
    function unSuccesfullResponse(error) {
      dispatch({ type: 'ERROR', payload: error.message });
      console.log(error);
    }

    //You can set automatic invisible errorMessage...
    // setTimeout(() => dispatch({ type: 'REMOVE_ERROR' }), 10000);
  };

  const searchUsers = async (text) => {
    dispatch({ type: 'SET_LOADING' });
    const params = new URLSearchParams({
      q: text,
    });

    await axios
      .get(`${process.env.REACT_APP_GITHUB_URL}/search/users?${params}`)
      .then(successfulResponse, unSuccesfullResponse);

    function successfulResponse(response) {
    
        dispatch({ type: 'GET_USERS', payload: response.data.items });
      
    }
    function unSuccesfullResponse(error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  const contextValue = {
    ...state,
    // loading: state.loading,
    // users: state.users,
    // user: state.user,
    // repos: state.repos,
    // alertMessage: state.alertMessage,
    searchUsers,
    dispatch,
    getUser,
  };
  
  return (
    <GithubContext.Provider value={contextValue}>
      {props.children}
    </GithubContext.Provider>
  );
};
