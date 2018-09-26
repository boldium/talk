import React from 'react';
import styles from './UserAvatar.css';

const UserAvatar = ({ comment: { user } }) => (
  <img src={user.avatar} className={styles.avatar} />
);

export default UserAvatar;
