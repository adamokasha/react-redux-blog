import React from 'react';
import {shallow} from 'enzyme';

import {CommentBox} from '../../components/CommentBox';
import {withUserRole} from '../fixtures/auth';
import posts from '../fixtures/posts';

test('should render CommentBox correctly', () => {
  const wrapper = shallow(<CommentBox auth={{}} comments={[]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render CommentBox with comments', () => {
  const wrapper = shallow(<CommentBox auth={{}} comments={posts[0].comments} />);
  expect(wrapper.find('ul li').length).toBe(2);
});

test('should render CommentForm if user logged in', () => {
  const wrapper = shallow(<CommentBox id={posts[0]._id} auth={withUserRole} comments={[]} />);
  expect(wrapper).toMatchSnapshot();
});