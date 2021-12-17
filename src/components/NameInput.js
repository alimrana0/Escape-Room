import React from "react";

export default class NameInput extends React.Component {
  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          placeholder="Playlist Name"
          onChange={this.props.onNameChange}
        />
      </React.Fragment>
    );
  }
}
