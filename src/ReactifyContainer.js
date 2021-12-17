import { connect } from "react-redux";
import { fetchUserInfo, tokenReceived } from "./app/authSlice";
import Reactify from "./components/Reactify";
import {
  albumSelected,
  fetchAlbums,
  generatePlaylist,
} from "./app/albumsSlice";
import { nameChanged, durationChanged } from "./app/formSlice";
import { stateToPropsSelector } from "./selectors";

const mapStateToProps = (state) => stateToPropsSelector(state);

const mapDispatchToProps = (dispatch) => {
  return {
    onNameChange: (event) => dispatch(nameChanged(event.target.value)),
    onDurationChange: (event) => dispatch(durationChanged(event.target.value)),
    generate: () => dispatch(generatePlaylist()),
    onSelectAlbum: (id) => dispatch(albumSelected(id)),
    onReceiveToken: (accessToken) => {
      dispatch(tokenReceived(accessToken));
      dispatch(fetchUserInfo());
      dispatch(fetchAlbums());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reactify);
