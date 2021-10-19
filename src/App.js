import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from "./redux/Store.js"
import UsersList from './components/UsersList'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <UsersList />
      </Provider >
    </div>
  );
}

export default App;
