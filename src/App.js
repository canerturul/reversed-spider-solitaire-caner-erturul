import "./App.css";
import Home from "../src/Pages/Home";
import BackgroundImage from "../src/assets/background.jpg";

function App() {
  return (
    <div className="App">
      <img className="App-Bg" src={BackgroundImage} alt=" background" />
      <div className="App-Content">
        <Home />
      </div>
    </div>
  );
}

export default App;
