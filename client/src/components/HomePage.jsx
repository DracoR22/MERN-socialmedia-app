import React from 'react'
import UserWidget from './UserWidget'
import { useSelector } from 'react-redux';

const HomePage = () => {

  const user = useSelector((state) => state.user)
  if (!user) {

    return (
      <div>
        <p>Please log in to view the user widget.</p>
      </div>
    );
  }
    const { _id, picturePath } = useSelector((state) => state.user);
  
 

  return (
    <div>
     {<UserWidget userId={_id} picturePath={picturePath}/> }
    </div>
  )
}

export default HomePage