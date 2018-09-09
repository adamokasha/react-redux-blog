import React from 'react';
import { shallow } from 'enzyme';

import { BlogDashboardPage } from '../../components/BlogDashboardPage';
import { withUserRole } from '../fixtures/auth';

test('should render ExpenseDashBoardPage correctly', () => {
  const wrapper = shallow(
    <BlogDashboardPage displayName={withUserRole.displayName} />
  );
  expect(wrapper).toMatchSnapshot();
});
