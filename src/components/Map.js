import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';

window.gm_authFailure = ()=> {alert("Please check your Google API key")}

const MyMapComponent = withScriptjs(
	withGoogleMap(props => (
		<GoogleMap
			defaultZoom={10}
			zoom={props.zoom}
			defaultCenter={{ lat: 36.169941, lng: -115.139832 }}
			center={{
				lat: parseFloat(props.center.lat),
				lng: parseFloat(props.center.lng)
			}}
		>
			{props.markers && props.markers.filter(marker => 
				marker.isVisible).map((marker, index, arr) => {
					const venueInfo = props.venues.find(venue => venue.id === marker.id)
					return (
						<Marker
							key={index}
							tabIndex="0"
							position={{ lat: marker.lat, lng: marker.lng }}
							onClick={() => props.handleMarkerClick(marker)}
							animation = {
									arr.length === 1 ? window.google.maps.Animation.DROP : window.google.maps.Animation.DROP }				
						>
					    {marker.isOpen && (
									<InfoWindow onCloseClick={() => props.closeAllMarkers()}>
										<div>
											<h4 className="venue-name">{venueInfo.name}</h4>
											<p className="venue-address"> {venueInfo.location['address']}</p>
											<p className="attrib">(Information from Foursquare)</p>
										</div>
									</InfoWindow>
								)}
						</Marker>
					)
				})}
		</GoogleMap>
	))
)


export default class Map extends Component {
	render() {
		return (
		  <MyMapComponent
		    {...this.props}
		    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=ADD-YOUR-API-KEY"
			loadingElement={<div style={{ height: `100%` }} />}
		    containerElement={<div id="map" style={{ height: `100vh`, width: `100%` }} />}
		    mapElement={<div className="map-flex" style={{ height: `100%` }} />}
		  />  
		)
	}
}

