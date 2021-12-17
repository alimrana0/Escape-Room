import React from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import DurationInput from "./DurationInput";
import Button from "react-bootstrap/Button";
import AlbumGrid from "./AlbumGrid";
import { dataProps as albumDataProps } from "./Album";
import NameInput from "./NameInput";

import "./Reactify.css";
import AuthLink from "./AuthLink";
import AuthInfo from "./AuthInfo";

export default class Reactify extends React.Component {
  static propTypes = {
    albums: PropTypes.arrayOf(PropTypes.shape(albumDataProps)),
    profileImage: PropTypes.string,
    onNameChange: PropTypes.func.isRequired,
    onDurationChange: PropTypes.func.isRequired,
    generate: PropTypes.func.isRequired,
    onSelectAlbum: PropTypes.func.isRequired,
    onReceiveToken: PropTypes.func.isRequired,
  };

  render() {
    const {
      albums,
      profileImage,
      onNameChange,
      onDurationChange,
      generate,
      onSelectAlbum,
      onReceiveToken,
    } = this.props;

    const urlSearch = new URLSearchParams(
      window.location.hash.replace("#", "?")
    );

    const accessToken = urlSearch.get("access_token");
    if (accessToken) {
      onReceiveToken(accessToken);
      window.location.hash = "";
    }

    if (!process.env.REACT_APP_CLIENT_ID) {
      return (
        <p className="error-text">
          ERROR: Client ID not defined in ENV. Please define it and restart the
          server.
        </p>
      );
    }

    return (
      <Container>
        <div className="top">
          <h1>Reactify</h1>
          {profileImage ? (
            <AuthInfo profileImage={profileImage} />
          ) : (
            <AuthLink />
          )}
        </div>
        {profileImage && (
          <React.Fragment>
            <div className="form">
              <NameInput onNameChange={onNameChange} />
              <DurationInput durationChanged={onDurationChange} />
            </div>
            <AlbumGrid albums={albums} toggleSelected={onSelectAlbum} />
            <Button onClick={generate}>Generate Playlist!</Button>
          </React.Fragment>
        )}
      </Container>
    );
  }
}
