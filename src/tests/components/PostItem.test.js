import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { PostItem } from "../../components/PostItem";
import posts from "../fixtures/posts";
import { withAdminRole, withUserRole } from "../fixtures/auth";

configure({ adapter: new Adapter() });

test("should render a single post", () => {
  const wrapper = shallow(<PostItem post={posts[0]} auth={withUserRole} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render edit button if user role is admin", () => {
  const wrapper = shallow(<PostItem post={posts[0]} auth={withAdminRole} />);
  expect(wrapper.find("Link i.fa-edit").length).toBe(1);
});

test("should not render edit button if user role is user", () => {
  const wrapper = shallow(<PostItem post={posts[0]} auth={withUserRole} />);
  expect(wrapper.find("Link button").length).toBe(0);
});
