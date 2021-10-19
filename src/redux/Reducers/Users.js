import produce from 'immer';
import createReducer from "./ReducerUtils";

const initialState = {
  users: []
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case 'SET_USERS': {

      return state = { users: action.payload }
    }
    case 'ADD_USER': {
      debugger
      return state = {
        users:
          [...state.users, action.payload]


      }
    }
    case 'UPDATE_USER': {

      return state = {
        users:
          state.users.map((user, index) => {
            if (action.payload[0] === index) {
              return action.payload[1];
            }
            else return user;
          })

      }
    }

    case 'DELETE_USER': {
      // 
      // state.users.splice(action.payload, 1)
      // return state
      return state = {
        users:
          state.users.map((user, index) => {
            if (action.payload !== index) {
              return user;
            }


          })

      }
    }





    default: {

      return state
    }

  }
}


