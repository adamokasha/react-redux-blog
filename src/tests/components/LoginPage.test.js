import React from 'react';
import {shallow} from 'enzyme';

import {LoginPage} from '../../components/LoginPage';

test('should render LoginPage correctly', () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});

test('should set email on input change', () => {
  const value = 'example@email.com';
  const wrapper = shallow(<LoginPage />);
  wrapper.find('input[name="email"]').simulate('change', {
    target: { value }
  })
  expect(wrapper.state('email')).toBe(value);
});

test('should set password on input change', () => {
  const value = '123abc';
  const wrapper = shallow(<LoginPage />);
  wrapper.find('input[name="password"]').simulate('change', {
    target: { value }
  })
  expect(wrapper.state('password')).toBe(value);
});


test('login button should be enabled if form input valid', () => {
  const user = {
    email: 'valid@email.com',
    password: '123abc'
  }
  const wrapper = shallow(<LoginPage />);
  wrapper.setState(user);
  expect(wrapper.find('button[disabled=false]').length).toBe(1);
});

test('should render and error message if email input is invalid', () => {
  const value = 'notanemail';
  const wrapper = shallow(<LoginPage />);
  wrapper.find('input[name="email"]').simulate('change', {
    target: { value }
  })
  expect(wrapper.find('p.error-msg').length).toBe(1);
});

test('should render and error message if password input is invalid', () => {
  const value = '';
  const wrapper = shallow(<LoginPage />);
  wrapper.find('input[name="password"]').simulate('change', {
    target: { value }
  })
  expect(wrapper.find('p.error-msg').length).toBe(1);
});

test('should call startLogin on valid form submit', () => {
  const user = {
    email: 'valid@email.com',
    password: '123abc'
  }
  const startLogin = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={startLogin} />);
  wrapper.setState(user);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(startLogin).toHaveBeenLastCalledWith(user.email, user.password);
});