import React from 'react';
import {shallow} from 'enzyme';

import {PostForm} from '../../components/PostForm';
import posts from '../fixtures/posts';

test('should render PostForm correctly', () => {
  const wrapper = shallow(<PostForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render PostForm with post data', () => {
  const wrapper = shallow(<PostForm post={posts[0]} />);
  expect(wrapper).toMatchSnapshot();
})

test('should render error if form input invalid', () => {
  const wrapper = shallow(<PostForm />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('errors')).toBeTruthy();
  expect(wrapper.find('ul.error-list li').length).toBeGreaterThan(0);
});

test('should set title on input change', () => {
  const value = 'A Title'
  const wrapper = shallow(<PostForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  })
  expect(wrapper.state('title')).toBe(value);
});

test('should set category on input change', () => {
  const value = 'A Category'
  const wrapper = shallow(<PostForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  })
  expect(wrapper.state('category')).toBe(value);
});

test('should set body on input change', () => {
  const value = 'The body of the post of at least 24 characters';
  const wrapper = shallow(<PostForm />);
  wrapper.find('textarea').simulate('change', {
    target: { value }
  })
  expect(wrapper.state('body')).toBe(value);
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<PostForm post={posts[1]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    _id: posts[1]._id,
    title: posts[1].title,
    category: posts[1].category,
    mainImage: "",
    thumbnail: "",
    body: posts[1].body,
    createdAt: posts[1].createdAt,
    errors: ''
  });
})