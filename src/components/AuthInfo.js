import React from "react";

export default class AuthInfo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <img
          src={this.props.profileImage}
          style={{ borderRadius: "50%", height: "90px" }}
          alt="Profile image"
        ></img>
      </React.Fragment>
    );
  }
}
