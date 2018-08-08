import React from 'react';
import {shallow} from 'enzyme';

import {PostsList} from '../../components/PostsList';
import posts from '../fixtures/posts';

test('should render posts list with posts', () => {
  const wrapper = shallow(<PostsList posts={posts} />)
  expect(wrapper).toMatchSnapshot();
});

test('should call startSetPosts when componentDidMount', () => {
  // Set spy
  const startSetPosts = jest.fn();
  const wrapper = shallow(<PostsList posts={[]} startSetPosts={startSetPosts} />);
  // Check if spy was called
  expect(startSetPosts).toHaveBeenCalled();
});
