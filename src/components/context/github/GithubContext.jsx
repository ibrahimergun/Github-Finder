import { createContext, useEffect, useReducer } from 'react';

import axios from 'axios';
import githubReducer from './GithubReducer';

const GithubContext = createContext({
  loading: true,
  users: [],
  alertMessage: null,
  dispatch: () => {},
  searchUsers: () => {},
});
export default GithubContext;

export const GithubContextProvider = (props) => {
  const [state, dispatch] = useReducer(githubReducer, {
    loading: false,
    users: [],
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
      console.log(response.data);
    }
    function unSuccesfullResponse(error) {
      dispatch({ type: 'ERROR', payload: error.message });
      console.log(error.message);
    }
    setTimeout(() => dispatch({ type: 'REMOVE_ERROR' }), 3000);
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
      if (!!!response.data.items.length) {
        const message = 'User can not Found. Please another username search!';
        dispatch({ type: 'ERROR', payload: message });
      } else {
        dispatch({ type: 'GET_USERS', payload: response.data.items });
        console.log(response.data.items);
      }
    }
    function unSuccesfullResponse(error) {
      dispatch({ type: 'ERROR', payload: error.message });
      console.log(error.message);
    }
    //setTimeout(() => dispatch({ type: 'REMOVE_ERROR' }), 3000);
  };

  const contextValue = {
    loading: state.loading,
    users: state.users,
    alertMessage: state.alertMessage,
    searchUsers,
    dispatch,
  };
  return (
    <GithubContext.Provider value={contextValue}>
      {props.children}
    </GithubContext.Provider>
  );
};
