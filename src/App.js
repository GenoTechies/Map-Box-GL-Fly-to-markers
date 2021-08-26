import "./App.css";
import Map from "./components/map";
import logo from "./Assets/img/logo.jpeg";

function App() {
  return (
    <div className="App">
      <h1>React with Mapbox GL</h1>
      <div className="container">
        <div className="map">
          <Map />
        </div>
        <div className="logo">
          <img src={logo} width="400px" height="400px"></img>
        </div>
      </div>
    </div>
  );
}

export default App;
