import { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, useJsApiLoader, Marker,Polyline, InfoWindow } from '@react-google-maps/api';

const center = {
    lat: 59.934280,
    lng: 30.335098
};
const zoom = 14;

const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
  };

const containerStyle = {
    width: '800px',
    height: '100vh'
  };

export default function Map() {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      });

    const dispatch = useDispatch();
    const markers = useSelector(state => state.points);

    const inputEl = useRef(null);
    
    const [map, setMap] = useState(null);
    const [mapref, setMapRef] = useState(null);
    const [path, setPath] = useState([]);
    const [infoWindowVisibility, setInfoWindowVisibility] = useState(false);
    const [clickedMarker, setClickedMarker] = useState(null);
    const [clickedMarkerPosition, setClickedMarkerPosition] = useState(null);

    useEffect(() => {
        pathConstuctor();
    },[markers])
  
  const handleCenterChanged = () => {
    if (mapref) {
      const newCenter = mapref.getCenter();
      dispatch({type: 'CHANGE_CURR_CENTER', payload: {lat: newCenter.lat(), lng: newCenter.lng()}});
    }
  };

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
        setMapRef(map);
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const pathConstuctor = () => {
        const p = markers.map(e => e.currCenter)
        setPath(p);
    }

    const moveMarker = (e) => {
        let markersCopy = markers;
        let lat = e.latLng.lat()
        let lng = e.latLng.lng();
        markersCopy.map(e => e.currPoint === inputEl.current.props.name ? e.currCenter = {lat, lng} : e);
        dispatch({type: 'REORDER', payload: markersCopy});
        pathConstuctor();
    }

    const openTooltip = (name, lat, lng) => {
        setClickedMarker(name);
        setClickedMarkerPosition({lat, lng});
        setInfoWindowVisibility(true);
    }

    const closeTooltip = () => {
        setInfoWindowVisibility(false)
    }

    return (
        isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={zoom}
              onLoad={onLoad}
              onUnmount={onUnmount}
              onCenterChanged={handleCenterChanged }
            >
              {markers.map(e => {
                  console.log(e)
                return (
                    <>
                    <Marker
                        position={{lat: e.currCenter.lat, lng: e.currCenter.lng}}
                        visible={true}
                        key={e.currPoint}
                        name={e.currPoint}
                        draggable={true}
                        onDragEnd={e => moveMarker(e)}
                        ref={inputEl}
                        onClick={() => openTooltip(e.currPoint, e.currCenter.lat, e.currCenter.lng)}
                    />    
                    <Polyline
                        path={path}
                        options={options}
                    />  
                    </>
                )
            })}
            {infoWindowVisibility && <InfoWindow
                            marker={clickedMarker}
                            position={clickedMarkerPosition}
                            onCloseClick={() => closeTooltip()}
                            visible={infoWindowVisibility}
                            >
                            <div>
                                <h4>{clickedMarker}</h4>
                            </div>
                        </InfoWindow>}
            </GoogleMap>
        ) : <></>
    )
}