import React from "react";
import { shallow } from "enzyme";

import { CommentForm } from "../../components/CommentForm";
import posts from "../fixtures/posts";

let wrapper, startAddComment;

beforeEach(() => {
  startAddComment = jest.fn();
  wrapper = shallow(
    <CommentForm id={posts[0]._id} startAddComment={startAddComment} />
  );
});

test("should render CommentForm correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should set comment on textarea change", () => {
  const value = "New comment";
  wrapper.find("textarea").simulate("change", {
    target: { value }
  });
  expect(wrapper.state("comment")).toBe(value);
});

test("should render an error if invalid comment input", () => {
  // Less than required char length
  wrapper.setState({ comment: "abc" });
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper.find(".error-msg").length).toBe(1);
});

test("should call startAddComment if comment input is valid", () => {
  const comment = "A valid comment";
  wrapper.setState({ comment });
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error").length).toBe(0);
  expect(startAddComment).toHaveBeenLastCalledWith(posts[0]._id, comment);
});
