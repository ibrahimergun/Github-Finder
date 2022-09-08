import React, { useContext } from 'react';

import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import GithubContext from '../context/github/GithubContext';

function UserResults() {
  const { loading, users } = useContext(GithubContext);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
          {users.map((user) => (
            <UserItem key={Math.random()} userData={user} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserResults;
