import React from 'react';
import { Link } from 'react-router-dom';

function UserItem(props) {
  return (
    <div className='card shadow-md compact side bg-base-100'>
      <div className='flex-row items-center space-x-4 card-body'>
        <div>
          <div className='avatar'>
            <div className='rounded-full shadow w-14 h-14'>
              <img src={props.userData.avatar_url} alt='' className='src' />
            </div>
          </div>
        </div>
        <div>
          <h2 className='card-title'>{props.userData.login}</h2>
          <Link
            className='text-base-content text-opacity-4'
            to={`/user/${props.userData.login}`}
          >
            Visit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserItem;
