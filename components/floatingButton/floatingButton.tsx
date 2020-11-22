import styles from "./floatingButton.module.scss";
import React from "react";
import PropTypes from "prop-types";

const FloatingButton = (props) => {
  const { handleClick, text } = props;

  
  return <button  className={styles.floatingButton} onClick={handleClick}>{text}</button>;
};

FloatingButton.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func,
};

export default FloatingButton;
