import React from "react";
import config from "../app/config";

export default class AuthLink extends React.Component {
  render() {
    const authURL = `https://accounts.spotify.com/authorize/?response_type=token&client_id=${
      process.env.REACT_APP_CLIENT_ID
    }&scopes=${encodeURIComponent(
      config.SCOPES
    )}&redirect_uri=${encodeURIComponent(config.REDIRECT)}`;

    return (
      <a className="btn btn-success" href={authURL}>
        Spotify Log In
      </a>
    );
  }
}
