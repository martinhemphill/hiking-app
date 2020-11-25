import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Col, Row, Container } from "../Grid";
import { Card } from "../Card";
import UserTrailsMap from "../UserTrailsMap";
import APITrailsMap from "../APITrailsMap";
import API from "../../utils/API";
import AUTH from "../../utils/AUTH";
import { withScriptjs } from "react-google-maps";
import extAPI from "../../utils/extAPI";

function Detail(props) {
  const [trail, setTrail] = useState({})
  const [url, setUrl] = useState({})

  // When this component mounts, grab the trail with the _id of props.match.params.id
  // e.g. localhost:3000/trails/599dcb67f0f16317844583fc
  const id = props.trailId;

  useEffect(() => {
    API.getTrail(id)
      .then(res =>
        // console.log(res.data)
        setTrail(res.data)
      )
      .catch(err => console.log(err));

    extAPI.getGoogleKey()
      .then(res =>
        setUrl(`https://maps.googleapis.com/maps/api/js?key=${res.data}`))
      .catch(err => console.log(err));
  }, [id]);

  function addFavorite() {
    AUTH.getUser()
    .then(res => 
      // console.log(res.data.user._id)
      API.addFavorite(res.data.user._id, id)
      .then(response => 
        console.log(response.data))
      )
    .catch(err => console.log(err));
  }

  function updateTrail(event) {

  }

  const date = new Date(trail.date);
  const formatDate = `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`;

  const MapLoader = withScriptjs(UserTrailsMap);
  return trail && (
    <div>
      <Container fluid>
        <Row>
          <Col size="md-2">
            <div className="mt-3"><Link to="/">←</Link>Home</div>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card
              name={trail.name}
            >
              <p onClick={addFavorite}>(STAR ICON)</p>
              <img className="card-img-top" src={trail.photos} alt="Card image cap"></img>
              <h6 className="card-subtitle mb-2 text-muted">{trail.city}, {trail.state}</h6>
              <p className="card-text" onClick={updateTrail}>Verified: {trail.userVerified}(CHECK ICON)</p>
              <p className="card-text">Rating: {trail.rating}</p>
              <p className="card-text">Length: {trail.length} miles</p>
              <p className="card-text">Elevation: +{trail.elevation}</p>
              <p className="card-text">Estimated duration: {trail.duration}</p>
              <p className="card-text">Trail Type: {trail.trailType}</p>
              <p className="card-text">Terrain: {trail.terrain}</p>
              <p className="card-text">User Comments: {trail.comments}</p>
              <p className="card-text">Current Conditions (as of {formatDate}): {trail.currentCondition}</p>
              <p className="card-text">Traffic Levels: {trail.trafficLevels}</p>
              <p className="card-text">Available Water Sources: {trail.waterSources}</p>
              <p>{trail.waypoints}</p>
            </Card>
          </Col>
        </Row>
      </Container>
      {
        trail.destination ?
          <MapLoader
            googleMapURL={url}
            loadingElement={<div style={{ height: `100%` }} />}
            originLat={trail.originLat}
            originLng={trail.originLng}
            destination={trail.destination}
            waypoints={trail.waypoints}
          />
          :
          <APITrailsMap
            name={trail.name}
            originLat={trail.originLat}
            originLng={trail.originLng}
          />
      }
    </div>
  );
}


export default Detail;