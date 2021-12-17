import React from "react";

import { shallow } from "enzyme";
import AuthLink from "./AuthLink";
import config from "../app/config";

describe("AuthLink", () => {
  it("Generates the correct link", () => {
    process.env.REACT_APP_CLIENT_ID = "test_id";
    const wrapper = shallow(<AuthLink />);

    expect(wrapper.find("a").prop("href")).toBe(
      `https://accounts.spotify.com/authorize/?response_type=token&client_id=test_id&scopes=${encodeURIComponent(
        config.SCOPES
      )}&redirect_uri=${encodeURIComponent(config.REDIRECT)}`
    );
  });
});
