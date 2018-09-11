import React from 'react';
import {shallow} from 'enzyme';

import ErrorsList from '../../components/ErrorsList';

test('should render ErrorsList component correctly when there are errors', () => {
  const wrapper = shallow(<ErrorsList errors={['Enter Username', 'Enter Password']} />);
  expect(wrapper.find('.list-group-item-danger').length).toBe(2);
});