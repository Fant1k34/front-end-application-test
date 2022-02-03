import Cards from "./Components/Cards";
import store from "./store";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Cards store={store} />
      </div>
    </div>
  );
}

export default App;
