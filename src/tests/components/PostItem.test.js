import React from 'react';
import {shallow} from 'enzyme';

import {PostItem} from '../../components/PostItem';
import posts from '../fixtures/posts';
import {withAdminRole, withUserRole} from '../fixtures/auth';

test('should render a single post', () => {
  const wrapper = shallow(<PostItem post={posts[0]} auth={withUserRole}/>);
  expect(wrapper).toMatchSnapshot();
})

test('should render edit button if user role is admin', () => {
  const wrapper = shallow(<PostItem post={posts[0]} auth={withAdminRole}/>);
  expect(wrapper.find('Link i.fa-edit').length).toBe(1);
});

test('should not render edit button if user role is user', () => {
  const wrapper = shallow(<PostItem post={posts[0]} auth={withUserRole}/>);
  expect(wrapper.find('Link button').length).toBe(0);
});