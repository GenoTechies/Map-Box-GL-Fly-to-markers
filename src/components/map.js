import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import * as d3 from "d3-ease";
import MapGL, {
  Popup,
  Marker,
  NavigationControl,
  FullscreenControl,
  FlyToInterpolator,
} from "react-map-gl";
import CityPin from "./city-pin";
import CityInfo from "./city-info";
import Data from "./cities.json";

class map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 7.791418, //latitude value of the place you want to focus the map
        longitude: 81.3999972, //longitude value of the place you want to focus the map
        zoom: 6, // zoom level
        bearing: 0,
        pitch: 0,
        Data: Data,
      },
      popupInfo: null,
    };
    window.test = () => {
      this.setState({
        ...this.state,
        viewport: {
          ...this.state.viewport,
          zoom: this.state.viewport.zoom === 5 ? 1 : 5,
        },
      });
    };
  }

  _updateViewport = (viewport) => {
    this.setState({ viewport });
  };
  // the method to render the markers
  _renderCityMarker = (City, index) => {
    console.log(City, "city");
    return (
      <Marker
        key={`marker-${index}`}
        longitude={City.longitude}
        latitude={City.latitude}
      >
        <CityPin
          size={20}
          onMouseEnter={() => this.setState({ popupInfo: City })}
        />
      </Marker>
    );
  };
  //zoom function for the auto complete
  AutoCompletezoom(placeDetail) {
    console.log(Data[0], "dataa");
    if (placeDetail == null) {
      placeDetail = Data[0];
    }

    let Platitude = placeDetail.longitude;
    let Plongitude = placeDetail.latitude;
    this.setState({
      viewport: {
        latitude: Plongitude,
        longitude: Platitude,
        zoom: 8,
        transitionDuration: 500,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: d3.easeCubic,
      },
    });
  }
  // method to render the Popup
  _renderPopup() {
    const { popupInfo } = this.state;
    console.log("popup");
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <CityInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    var { viewport } = this.state;

    const fullscreenControlStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      padding: "10px",
    };

    const navStyle = {
      position: "absolute",
      top: 36,
      left: 0,
      padding: "10px",
    };

    //zoom function

    return (
      ///////////////////////////////////////////////////////////
      <div className="screens">
        <div className="container">
          <div className="row">
            <div className="subContainer">
              <Autocomplete
                className="w-100"
                id="combo-box-demo"
                options={Data}
                getOptionLabel={(option) => option.city}
                onChange={(e, v) => {
                  this.AutoCompletezoom(v);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ස්ථානය සොයන්න"
                    variant="outlined"
                  />
                )}
              />
            </div>
            <div className="mapContainer">
              <div>
                <MapGL
                  {...viewport}
                  width="400px"
                  height="400px"
                  mapStyle="mapbox://styles/mapbox/light-v10"
                  onViewportChange={this._updateViewport}
                  mapboxApiAccessToken={
                    "pk.eyJ1Ijoia3NhbmthbHBhIiwiYSI6ImNrZ2tuYXVxMjBqNGgycnFwajMyY2Rpb3UifQ.4XEbhyaiL5uCvKFpgMISXA"
                  }
                >
                  {Data.map(this._renderCityMarker)}
                  {this._renderPopup()}
                  <div className="fullscreen" style={fullscreenControlStyle}>
                    <FullscreenControl />
                  </div>
                  <div className="nav" style={navStyle}>
                    <NavigationControl />
                  </div>
                </MapGL>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default map;
