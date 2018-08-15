import authReducer from '../../reducers/auth';
import {withUserRole} from '../fixtures/auth';

test('should set user object for login', () => {
  const action = {
    type: 'LOGIN',
    displayname: withUserRole.displayName,
    id: withUserRole.id,
    role: withUserRole.role 
  };
  const state = authReducer({}, action);
  expect(state.displayName).toEqual(action.displayName);
  expect(state.id).toEqual(action.id);
  expect(state.role).toEqual(action.role);
});

test('should clear on longout', () => {
  const initialAuthState = {
    displayname: withUserRole.displayName,
    id: withUserRole.id,
    role: withUserRole.role 
  }
  const action = {
    type: 'LOGOUT'
  };
  const state = authReducer(initialAuthState, action);
  expect(state).toEqual({});
})