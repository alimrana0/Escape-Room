import React from "react";
import { shallow } from "enzyme";
import Album from "./Album";
import { constants } from "./constants";

const baseProps = () => {
  return {
    id: "1",
    isSelected: false,
    toggleSelected: () => {},
  };
};

describe("Album", () => {
  it("displays the image", () => {
    const wrapper = shallow(<Album {...baseProps()} />);
    expect(wrapper.find("img").exists()).toBe(true);
  });

  it("uses the default image url", () => {
    const wrapper = shallow(<Album {...baseProps()} />);
    expect(wrapper.find("img").prop("src")).toBe(constants.DEFAULT_IMG);
  });

  it("has the correct click behavior", () => {
    const props = baseProps();
    props.toggleSelected = jest.fn();
    const wrapper = shallow(<Album {...props} />);
    wrapper.find("img").simulate("click");
    expect(props.toggleSelected).toBeCalled();
  });

  it("dislpays selected albums", () => {
    const props = baseProps();
    props.isSelected = true;

    const wrapper = shallow(<Album {...props} />);

    expect(wrapper.find("img").hasClass("selected")).toBe(true);
  });
});
