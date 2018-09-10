import React from "react";
import { shallow } from "enzyme";
import moxios from "moxios";
import axios from "axios";

import { AddPostPage } from "../../components/AddPostPage";
import posts from "../fixtures/posts";

let startAddPost, wrapper, history;

beforeEach(() => {
  startAddPost = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <AddPostPage startAddPost={startAddPost} history={history} />
  );
});

test("should render AddPostPage component", () => {
  expect(wrapper).toMatchSnapshot();
});

// Known issue with moxios and webpack where moxios.requests.mostRecent() returns undefined;
test("should render error div if any error", () => {
  wrapper.setState({ error: "Could not add Post" });

  expect(wrapper.find("div.error-msg p").length).toBe(1);
});

describe("async", () => {
  beforeEach(() => {
    moxios.install(axios);
    moxios.stubRequest("http://localhost:3000/posts", {
      status: 200,
      response: {
        post: posts[0]
      }
    });
  });

  afterEach(() => {
    moxios.uninstall;
  });

  test("should handle onSubmit successfully", done => {
    wrapper.find("PostForm").prop("onSubmit")(posts[0]);
    moxios.wait(() => {
      expect(history.push).toHaveBeenLastCalledWith("/");
      expect(startAddPost).toHaveBeenLastCalledWith(posts[0]);
      done();
    });
  });
});
