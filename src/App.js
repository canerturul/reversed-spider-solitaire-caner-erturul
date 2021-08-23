import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import BackgroundImage from "../src/assets/images/background.jpg";
import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback";
import Landing from "./pages/Landing/Landing";

function App() {
  return (
    <Router>
      <div className="App">
        <img className="App-Bg" src={BackgroundImage} alt=" background" />
        <div className="App-Content">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Switch>
              <Route exact path="/" component={Landing}>
                <Landing />
              </Route>
              <Route exact path="/home" component={Home}>
                <Home />
              </Route>
            </Switch>
            <ToastContainer />
          </ErrorBoundary>
        </div>
      </div>
    </Router>
  );
}

export default App;
