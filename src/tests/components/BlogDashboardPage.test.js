import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BlogDashboardPage } from "../../components/BlogDashboardPage";
import { withUserRole } from "../fixtures/auth";

configure({ adapter: new Adapter() });

test("should render ExpenseDashBoardPage correctly", () => {
  const wrapper = shallow(
    <BlogDashboardPage displayName={withUserRole.displayName} />
  );
  expect(wrapper).toMatchSnapshot();
});
