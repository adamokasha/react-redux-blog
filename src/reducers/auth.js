const defaultAuthState = () => {
  if (localStorage.getItem('auth')) {
    return JSON.parse(localStorage.getItem('auth'));
  } else {
    return {};
  }
} 

const authReducer = (state = defaultAuthState(), action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        displayName: action.displayName,
        id: action.id,
        role: action.role
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
}

export default authReducer;