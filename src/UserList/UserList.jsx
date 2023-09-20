import React from "react";
import DefaultUserImage from "../assets/default-user-img.png";
import UserListStyles from './UserList.module.css'; // Import the CSS module
import { useState, useEffect } from "react";
import axios from "axios";

export const UserList = () => {
  const [userList, setUserList] = useState([]); // State to store the user list
  const url = 'http://localhost/api/getUserList.php'

  useEffect(() => {
    axios.get(url).then((resp) => {
      // console.log(resp.data);
      setUserList(resp.data);
    });
  }, []);
  
  // console.log(userList);

  return (
    <div className={UserListStyles['main-container']}>
      <div className={UserListStyles.user}>
        <div className={UserListStyles['user-detail']}>
          <img src={DefaultUserImage} alt="default-user-img" className={UserListStyles.image} />
          <div className="">
            <div className={UserListStyles['bold-text']}>Coding Nepal</div>
            <div className={UserListStyles.small}>Active Now</div>
          </div>
        </div>
        <a href="" className={UserListStyles.logout}>
          Logout
        </a>
      </div>
      <div className={UserListStyles['search-bar']}>
        <input type="text" placeholder="Enter a name to search..." className={UserListStyles.inp} />
        <span className={`${'material-symbols-outlined'} ${UserListStyles.search}`}>search</span>
      </div>
      {/* Repeat the user list items as needed */}
      <div className={UserListStyles['user-list']}>
        {userList.map(user => (
          <div key={user.id} className={UserListStyles.user}>
            <div className={UserListStyles['user-detail']}>
              <img src={DefaultUserImage} alt="DefaultUserImage" className={UserListStyles.image} />
              <div className="">
                <div className={UserListStyles['bold-text']}>{user.first_name} {user.last_name}</div>
                <div className={UserListStyles.small}>This is a Test Message</div>
              </div>
            </div>
            <span className={`${'material-symbols-outlined'} ${UserListStyles.online}`}> circle </span>
          </div>
        ))}
      </div>
    </div>
  );
};
