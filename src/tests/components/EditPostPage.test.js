import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import moxios from "moxios";
import axios from "axios";

import { EditPostPage } from "../../components/EditPostPage";
import posts from "../fixtures/posts";

configure({ adapter: new Adapter() });

let wrapper, startEditPost, startDeletePost;

beforeEach(() => {
  startEditPost = jest.fn();
  startDeletePost = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditPostPage
      startEditPost={startEditPost}
      startDeletePost={startDeletePost}
      history={history}
      post={posts[1]}
    />
  );
});

test("should render EditPostPage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render error div if any error", () => {
  wrapper.setState({ error: "An error occurred" });
  expect(wrapper.find("div.error-msg").length).toBe(1);
});

describe("async tests", () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest(`http://localhost:3000/${posts[1].id}/`, {
      status: 200,
      response: {
        post: posts[0]
      }
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("should handle onSubmit", () => {
    wrapper.find("PostForm").prop("onSubmit")(posts[1]);
    moxios.wait(() => {
      expect(startEditPost).toHaveBeenLastCalledWith(posts[1], posts[1]._id);
      expect(history.push).toHaveBeenLastCalledWith("/");
    });
  });

  test("should handle deletePost", () => {
    wrapper.find("button.btn-delete").simulate("click");
    moxios.wait(() => {
      expect(startDeletePost).toHaveBeenLastCalledWith(posts[1]._id);
      expect(history.push).toHaveBeenLastCalledWith("/");
    });
  });
});
