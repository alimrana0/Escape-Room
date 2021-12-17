import { albumSelected, fetchAlbums } from "./albumsSlice";
import configureMockStore from "redux-mock-store";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import spotify from "../spotify/client";

const mockStore = configureMockStore([thunk]);

describe("albumSelected", () => {
  it("should create an action to select an album", () => {
    const expectedAction = {
      type: "albums/albumSelected",
      payload: "id",
    };
    expect(albumSelected("id")).toEqual(expectedAction);
  });
});

describe("fetchAlbums", () => {
  it("fetches albums correctly", () => {
    const store = mockStore({});

    const spy = jest
      .spyOn(spotify, "getMySavedAlbums")
      .mockImplementation(() => {
        return new Promise((resolve) => {
          resolve({
            items: [],
          });
        });
      });

    const expectedActions = [
      { type: "albums/fetchAlbums/pending" },
      { type: "albums/fetchAlbums/fulfilled", payload: {} },
    ];

    store.dispatch(fetchAlbums()).then(() => {
      expect(store.getActions()).toHaveLength(2);
      expect(spy).toHaveBeenCalled();
    });
  });
});
