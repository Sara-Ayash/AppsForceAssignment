import { createStore } from 'redux';
import users from './Reducers/Users' 

const store = createStore(users);
 
export default store;

