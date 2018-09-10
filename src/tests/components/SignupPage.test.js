import React from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';

import { SignupPage } from '../../components/SignupPage';

test('should render SignupPage correctly', () => {
  const wrapper = shallow(<SignupPage />);
  expect(wrapper).toMatchSnapshot();
});

test('should render error if form input invalid', () => {
  const wrapper = mount(<SignupPage />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('errors')).toBeTruthy();
  expect(wrapper.find('.list-group-item-danger').length).toBeGreaterThan(0);
});

test('should set displayName on input change', () => {
  const value = 'aNewUser';
  const wrapper = shallow(<SignupPage />);
  wrapper.find('input[name="displayname"]').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('displayName')).toBe(value);
});

test('should set email on input change', () => {
  const value = 'email@example.com';
  const wrapper = shallow(<SignupPage />);
  wrapper.find('input[name="email"]').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('email')).toBe(value);
});

test('should set password on input change', () => {
  const value = '123abc';
  const wrapper = shallow(<SignupPage />);
  wrapper.find('input[name="password"]').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('password')).toBe(value);
});

test('should call startSignup if form input completely valid', () => {
  const user = {
    displayName: 'validUser',
    email: 'valid@email.com',
    password: '123abc',
    passwordConfirm: '123abc'
  };
  const startSignup = jest.fn();
  const wrapper = shallow(<SignupPage startSignup={startSignup} />);
  wrapper.setState(user);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  const { displayName, email, password } = user;
  expect(startSignup).toHaveBeenLastCalledWith(displayName, email, password);
});
