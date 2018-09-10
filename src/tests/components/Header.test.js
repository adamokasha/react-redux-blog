import React from "react";
import { shallow } from "enzyme";

import { Header } from "../../components/Header";
import { startLogout } from "../../actions/auth";
import { withAdminRole, withUserRole } from "../fixtures/auth";

test("should render header component", () => {
  const wrapper = shallow(<Header auth={{}} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render signup and signin links if not signed in", () => {
  const wrapper = shallow(<Header auth={{}} />);
  expect(wrapper.find('Link[to="/signup"]').length).toBe(1);
  expect(wrapper.find('Link[to="/signin"]').length).toBe(1);
});

test("should render a signout button if user is logged in", () => {
  const wrapper = shallow(<Header auth={withUserRole} />);
  expect(wrapper.find('button[name="signout"]').length).toBe(1);
});

test("should call startLogOut when signout button clicked", () => {
  const startLogout = jest.fn();
  const wrapper = shallow(
    <Header auth={withUserRole} startLogout={startLogout} />
  );
  wrapper.find('button[name="signout"]').simulate("click");
  expect(startLogout).toHaveBeenCalled();
});
