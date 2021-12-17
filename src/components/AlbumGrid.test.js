import React from "react";
import { shallow } from "enzyme";
import AlbumGrid from "./AlbumGrid";

const baseProps = () => {
  return {
    albums: [],
    toggleSelected: () => {},
  };
};

describe("AlbumGrid", () => {
  it("displays empty albums correctly", () => {
    const wrapper = shallow(<AlbumGrid {...baseProps()} />);
    expect(wrapper.find("div").children()).toHaveLength(0);
  });

  it("renders albums", () => {
    const albums = [
      { id: "1", isSelected: false, toggleSelected: () => {} },
      { id: "2", isSelected: false, toggleSelected: () => {} },
      { id: "3", isSelected: false, toggleSelected: () => {} },
      { id: "4", isSelected: false, toggleSelected: () => {} },
    ];

    const wrapper = shallow(
      <AlbumGrid albums={albums} toggleSelected={() => {}} />
    );
    expect(wrapper.find("div").children()).toHaveLength(albums.length);
  });
});
