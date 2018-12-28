import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ErrorsList from "../../components/ErrorsList";

configure({ adapter: new Adapter() });

test("should render ErrorsList component correctly when there are errors", () => {
  const wrapper = shallow(
    <ErrorsList errors={["Enter Username", "Enter Password"]} />
  );
  expect(wrapper.find(".list-group-item-danger").length).toBe(2);
});
