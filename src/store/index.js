import { createStore } from 'redux'

const INITIAL_STATE = {
   user: {
      name: "",
      email: ""
   },
}

function user(state = INITIAL_STATE, action) {
   switch (action.type) {
      case 'LOGIN':
         return { user: action.user }
      case 'LOGOUT':
         return INITIAL_STATE
      default:
         return state
   }
}

const store = createStore(user)

export default store