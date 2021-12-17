import React from "react";
import PropTypes from "prop-types";
import "./Album.css";
import { constants } from "./constants";

export const dataProps = {
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  imageURL: PropTypes.string,
};

export default class Album extends React.Component {
  static propTypes = {
    ...dataProps,
    toggleSelected: PropTypes.func.isRequired,
  };

  render() {
    const { id, isSelected, imageURL, toggleSelected } = this.props;
    return (
      <img
        className={isSelected ? "selected" : ""}
        width="100px"
        height="100px"
        src={imageURL || constants.DEFAULT_IMG}
        alt="Album artwork"
        onClick={() => toggleSelected(id)}
      />
    );
  }
}
