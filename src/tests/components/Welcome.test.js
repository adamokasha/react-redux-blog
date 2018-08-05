import React from 'react';
import { shallow } from 'enzyme';

import Welcome from '../../components/Welcome';

test('should render welcome component', () => {
  const wrapper = shallow(<Welcome />);
  expect(wrapper).toMatchSnapshot();
});