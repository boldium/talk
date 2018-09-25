import React from 'react';
import PropTypes from 'prop-types';

const AuthorName = ({
  username,
}) => {
  return (
          <a href="#">Valentina Tereshkova</a>
  );
};

AuthorName.propTypes = {
  username: PropTypes.string.isRequired,
};

export default AuthorName;
