import logo from './logo.svg';
import Card from "./Logic/Card";
import store from './store';
import './App.css';


function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Card store={store}/>
      </div>
    </div>
  );
}

export default App;
