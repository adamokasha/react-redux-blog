import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { PostsList } from "../../components/PostsList";
import posts from "../fixtures/posts";

configure({ adapter: new Adapter() });

test("should render posts list with posts", () => {
  const wrapper = shallow(<PostsList posts={posts} />);
  expect(wrapper).toMatchSnapshot();
});

test("should call startSetPosts when componentDidMount", () => {
  // Set spy
  const startSetPosts = jest.fn();
  const wrapper = shallow(
    <PostsList posts={[]} startSetPosts={startSetPosts} />
  );
  // Check if spy was called
  expect(startSetPosts).toHaveBeenCalled();
});
