import React from "react";
import PropTypes from "prop-types";
import Album, { dataProps as albumDataProps } from "./Album";

export default class AlbumGrid extends React.Component {
  static propTypes = {
    albums: PropTypes.arrayOf(PropTypes.shape(albumDataProps)),
    toggleSelected: PropTypes.func.isRequired,
  };

  render() {
    const { toggleSelected, albums } = this.props;
    const albumComponents = albums.map((album) => {
      return (
        <Album
          {...{
            ...album,
            key: album.id,
            toggleSelected,
          }}
        />
      );
    });

    return <div className="album-grid">{albumComponents}</div>;
  }
}
