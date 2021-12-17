import { shallow } from "enzyme";
import React from "react";
import DurationInput from "./DurationInput";

describe("DurationInput", () => {
  it("renders numerical input and a drop-down", () => {
    const wrapper = shallow(<DurationInput />);
    expect(wrapper.find("input").prop("type")).toBe("number");

    expect(wrapper.find("input").prop("placeholder")).toBe(
      "Duration in minutes"
    );
  });
});
