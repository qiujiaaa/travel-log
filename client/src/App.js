import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import { listLogEntries } from './api';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.5,
    longitude: -95.665,
    zoom: 3,
  });

  useEffect(() => {
    // immediately invoked function expression
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/qiujiaaa/cktfuid5501ne17mpgjyzbcri"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {logEntries.map((entry) => (
        <Marker
          key={entry._id}
          latitude={entry.latitude}
          longitude={entry.longitude}
          offsetLeft={-12}
          offsetTop={-24}
        >
          <svg
            className="marker"
            style={{
              width: `24px`,
              height: `24px`,
            }}
            viewBox="0 0 24 24"
            width="48"
            height="48"
            stroke="pink"
            stroke-width="1.5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default App;
