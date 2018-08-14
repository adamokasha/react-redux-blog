import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import 'jest-localstorage-mock';

import { 
  login, 
  startSignup,
  startLogin, 
  logout,
  startLogout
} from '../../actions/auth';
import { withAdminRole, withUserRole } from '../fixtures/auth';

const createMockStore = configureMockStore([thunk]);

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
})

test('should set up login object', () => {
  const { displayName, id, role } = withUserRole;
  const action = login(displayName, id, role);
  expect(action).toEqual({
    type: 'LOGIN',
    displayName,
    id,
    role
  });
});

test('should call login if signup successful', (done) => {
  const {displayName, email, password, role, id} = withUserRole;
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: {
        displayName,
        _id: id,
        token: '123abc',
        role,
      },
      headers: { 'x-auth': '123abc' }
    });
  });

  const store = createMockStore({});
  return store.dispatch(startSignup(displayName, email, password)).then(() => {
    const expectedAction = {
      type: 'LOGIN',
      displayName,
      id,
      role
    };
    expect(store.getActions()).toEqual([expectedAction]);
    done();
  });
});

test('should not call login if signup error', (done) => {
  const {displayName, email, password} = withUserRole;
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 400,
      response: {error: 'Could not sign up.'}
    });
  });

  const store = createMockStore({});
  return store.dispatch(startSignup(displayName, email, password)).catch(() => {
    expect(store.getActions()).toEqual([]);
    done();
  });
});

test('should call login if login successful', (done) => {
  const {email, password, displayName, role, id} = withUserRole;
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: {
        displayName,
        _id: id,
        token: '123abc',
        role
      },
      headers: { 'x-auth': '123abc' }
    });
  });

  const store = createMockStore({});
  return store.dispatch(startLogin(email, password)).then(() => {
    const expectedAction = {
      type: 'LOGIN',
      displayName,
      id,
      role
    };
    expect(store.getActions()).toEqual([expectedAction]);
    done();
  });
});

test('should not call login if login unsuccessful', (done) => {
  const {email, password} = withUserRole;
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 401,
      response: {error: 'Invalid login credentials.'}
    })
  });

  const store = createMockStore({});
  return store.dispatch(startLogin(email, password)).catch(() => {
    expect(store.getActions()).toEqual([]);
    done();
  });
});

test('should set up logout object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});

test('should call logout if no errors', (done) => {
  const auth = {
    token: '123abc456xyz'
  };
  localStorage.clear();
  localStorage.setItem('auth', JSON.stringify(auth));

  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: {message: 'Logout successful.'}
    });
  });

  const store = createMockStore({});
  return store.dispatch(startLogout()).then(() => {
    const expectedActions = {
      type: 'LOGOUT'
    };
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  })
});

test('should call logout if there are errors', (done) => {
  const auth = {
    token: '123abc456xyz'
  };
  localStorage.clear();
  localStorage.setItem('auth', JSON.stringify(auth));

  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 400,
      response: {error: 'An error occurred while logging out.'}
    });
  });

  const store = createMockStore({});
  return store.dispatch(startLogout()).then(() => {
    const expectedActions = {
      type: 'LOGOUT'
    };
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  })
});