import React from 'react';
import {shallow} from 'enzyme';

import BlogDashboardPage from '../../components/BlogDashboardPage';

test('should render ExpenseDashBoardPage correctly', () => {
  const wrapper = shallow(<BlogDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});