import React from 'react';
import {shallow} from 'enzyme';

import ErrorMessages from '../../components/ErrorMessages';

test('should render ErrorMessages component correctly when there are errors', () => {
  const wrapper = shallow(<ErrorMessages errors={['Enter Username', 'Enter Password']} />);
  expect(wrapper.find('.list-group-item-danger').length).toBe(2);
});