import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './api';
import LogEntryForm from './LogEntryForm';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntry, setAddEntry] = useState(null);

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.5,
    longitude: -95.665,
    zoom: 3,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    // immediately invoked function expression
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    setAddEntry({
      latitude: event.lngLat[1],
      longitude: event.lngLat[0],
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/qiujiaaa/cktfuid5501ne17mpgjyzbcri"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
      doubleClickZoom={false}
    >
      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker latitude={entry.latitude} longitude={entry.longitude}>
            <div
              onClick={() =>
                setShowPopup({
                  [entry._id]: true,
                })
              }
            >
              <svg
                className="marker"
                style={{
                  width: `${6 * viewport.zoom}px`,
                  height: `${6 * viewport.zoom}px`,
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
            </div>
          </Marker>

          {showPopup[entry._id] && (
            <Popup
              className="popup"
              dynamicPosition={true}
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup({})}
              anchor="top"
            >
              <div>
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>
                  Visited on: {new Date(entry.visitDate).toLocaleDateString()}
                </small>
                {entry.image && <img src={entry.image} alt={entry.title} />}
              </div>
            </Popup>
          )}
        </React.Fragment>
      ))}
      {addEntry && (
        <>
          <Marker latitude={addEntry.latitude} longitude={addEntry.longitude}>
            <svg
              className="marker"
              style={{
                width: `${6 * viewport.zoom}px`,
                height: `${6 * viewport.zoom}px`,
              }}
              viewBox="0 0 24 24"
              width="48"
              height="48"
              stroke="lightblue"
              stroke-width="1.5"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </Marker>
          <Popup
            className="popup"
            dynamicPosition={true}
            latitude={addEntry.latitude}
            longitude={addEntry.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setAddEntry(null)}
            anchor="top"
          >
            <div className="popup">
              <LogEntryForm
                onClose={() => {
                  setAddEntry(null);
                  getEntries();
                }}
                location={addEntry}
              />
            </div>
          </Popup>
        </>
      )}
    </ReactMapGL>
  );
};

export default App;
