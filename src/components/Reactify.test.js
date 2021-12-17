import { shallow } from "enzyme";
import React from "react";
import DurationInput from "./DurationInput";
import Reactify from "./Reactify";

const baseProps = () => {
  return {
    albums: [],
    onNameChange: () => {},
    onDurationChange: () => {},
    generate: () => {},
    onSelectAlbum: () => {},
    onReceiveToken: () => {},
  };
};

describe("Reactify", () => {
  beforeEach(() => {
    process.env.REACT_APP_CLIENT_ID = "foo";
  });
  it("renders the form", () => {
    const props = {
      ...baseProps(),
      profileImage: "123",
    };
    const wrapper = shallow(<Reactify {...props} />);
    expect(wrapper.find("AlbumGrid").exists()).toBe(true);
    expect(wrapper.find("DurationInput").exists()).toBe(true);
    expect(wrapper.find("Button").text()).toBe("Generate Playlist!");
    expect(wrapper.find("AuthInfo").exists()).toBe(true);
  });

  it("renders the AuthLink component when not authenticated with spotify", () => {
    const props = baseProps();

    const wrapper = shallow(<Reactify {...props} />);

    expect(wrapper.find("AuthInfo").exists()).toBe(false);
    expect(wrapper.find("AuthLink").exists()).toBe(true);
  });
});
