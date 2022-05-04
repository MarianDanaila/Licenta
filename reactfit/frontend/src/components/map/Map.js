import "../../app.css";
import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import { format } from "timeago.js";
import AuthService from "../../services/AuthService";
import MapService from "../../services/MapService";
import "mapbox-gl/dist/mapbox-gl.css";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      pins: [],
      currentPlaceId: null,
      newPlace: null,
      title: "",
      desc: "",
      star: 1,
      viewport: {
        latitude: 47.040182,
        longitude: 17.071727,
        zoom: 4,
      },
    };
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    MapService.getPins()
      .then((res) => {
        this.setState({
          pins: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  handleMarkerClick(id, lat, long) {
    this.setState({
      currentPlaceId: id,
      viewport: { latitude: lat, longitude: long, zoom: 4 },
    });
  }
  handleAddClick(e) {
    const [longitude, latitude] = e.lngLat;
    this.setState({
      newPlace: {
        lat: latitude,
        long: longitude,
      },
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const newPin = {
      username: this.state.currentUser.username,
      title: this.state.title,
      description: this.state.desc,
      rating: this.state.star,
      lat: this.state.newPlace.lat,
      long: this.state.newPlace.long,
    };
    MapService.addPin(newPin)
      .then((res) => {
        this.setState({
          pins: [...this.state.pins, res.data],
          newPlace: null,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        {this.state.currentUser ? (
          <ReactMapGL
            {...this.state.viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
            width="100%"
            height="100%"
            transitionDuration="200"
            mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
            onViewportChange={(viewport) => this.setState({ viewport })}
            onDblClick={this.handleAddClick}
          >
            {this.state.pins.map((p) => (
              <>
                <Marker
                  latitude={p.lat}
                  longitude={p.long}
                  offsetLeft={-3.5 * this.state.viewport.zoom}
                  offsetTop={-7 * this.state.viewport.zoom}
                >
                  <Room
                    style={{
                      fontSize: 7 * this.state.viewport.zoom,
                      color:
                        this.state.currentUser.username === p.username
                          ? "tomato"
                          : "slateblue",
                      cursor: "pointer",
                    }}
                    onClick={() => this.handleMarkerClick(p._id, p.lat, p.long)}
                  />
                </Marker>
                {p._id === this.state.currentPlaceId && (
                  <Popup
                    key={p._id}
                    latitude={p.lat}
                    longitude={p.long}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() =>
                      this.setState({
                        currentPlaceId: null,
                      })
                    }
                    anchor="left"
                  >
                    <div className="card">
                      <label>Place</label>
                      <h4 className="place">{p.title}</h4>
                      <label>Review</label>
                      <p className="desc">{p.description}</p>
                      <label>Rating</label>
                      <div className="stars">
                        {Array(p.rating).fill(<Star className="star" />)}
                      </div>
                      <label>Information</label>
                      <span className="username">
                        Created by <b>{p.username}</b>
                      </span>
                      <span className="date">{format(p.createdAt)}</span>
                    </div>
                  </Popup>
                )}
              </>
            ))}
            {this.state.newPlace && (
              <>
                <Marker
                  latitude={this.state.newPlace.lat}
                  longitude={this.state.newPlace.long}
                  offsetLeft={-3.5 * this.state.viewport.zoom}
                  offsetTop={-7 * this.state.viewport.zoom}
                >
                  <Room
                    style={{
                      fontSize: 7 * this.state.viewport.zoom,
                      color: "tomato",
                      cursor: "pointer",
                    }}
                  />
                </Marker>
                <Popup
                  latitude={this.state.newPlace.lat}
                  longitude={this.state.newPlace.long}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() =>
                    this.setState({
                      newPlace: null,
                    })
                  }
                  anchor="left"
                >
                  <div>
                    <form onSubmit={this.handleSubmit}>
                      <label>Title</label>
                      <input
                        placeholder="Enter a title"
                        autoFocus
                        onChange={(e) =>
                          this.setState({
                            title: e.target.value,
                          })
                        }
                      />
                      <label>Description</label>
                      <textarea
                        placeholder="Say us something about this place."
                        onChange={(e) =>
                          this.setState({
                            desc: e.target.value,
                          })
                        }
                      />
                      <label>Rating</label>
                      <select
                        onChange={(e) => {
                          this.setState({
                            star: e.target.value,
                          });
                        }}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <button type="submit" className="submitButton">
                        Add Pin
                      </button>
                    </form>
                  </div>
                </Popup>
              </>
            )}
          </ReactMapGL>
        ) : (
          "No token provided"
        )}
      </div>
    );
  }
}

export default Map;
