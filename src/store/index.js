import { createStore } from 'redux'

const INITIAL_STATE = {
   sidebar: false,
   user: {
      name: "",
      email: ""
   },
}

function user(state = INITIAL_STATE, action) {
   switch (action.type) {
      case 'LOGIN':
         return { sidebar: true, user: action.user, loginPage: false }
      case 'LOGOUT':
         return {...INITIAL_STATE, loginPage: true}
      case 'HIDE_SIDEBAR':
         return { ...state, sidebar: false}
      case 'SHOW_SIDEBAR':
         return { ...state, sidebar: true}
      default:
         return state
   }
}

const store = createStore(user)

export default store