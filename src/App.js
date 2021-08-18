import "./App.css";
import Home from "./pages/Home";
import BackgroundImage from "../src/assets/background.jpg";
import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback";

function App() {
  return (
    <div className="App">
      <img className="App-Bg" src={BackgroundImage} alt=" background" />
      <div className="App-Content">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Home />
          <ToastContainer />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
