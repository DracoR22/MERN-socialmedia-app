import React, { useEffect, useState } from 'react'
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";
  import { Box, Typography, Divider } from "@mui/material";
  import UserImage from './UserImage'
  import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserWidget = ({userId, picturePath}) => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);

    
  const getUser = async () => {
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [])

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;


  return (
    <div className='bg-primary h-full w-[100px]'>
        <div>
          <div>
            <UserImage image={picturePath}/>
            {firstName}
          </div>
        </div>
    </div>
  )
}

export default UserWidget