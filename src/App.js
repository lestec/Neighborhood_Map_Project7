import React, { Component } from 'react'
import './App.css'
import Map from './components/Map';
import ListItem from './components/ListItem'
import SideBar from './components/SideBar'
import VenueList from './components/VenueList'
import SquareAPI from './API/APIhelper'
import ErrorHelp from './components/ErrorHelp'

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj)
      }
    }
  }
  
  closeAllMarkers = () => {
      //returns markers to default state
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false
      return marker
    })
    this.setState({ markers: Object.assign(this.state.markers, markers) })
  }

  //Function for user marker click
  handleMarkerClick = (marker) => {
  //close all markers by mapping over all of them and setting isOpen to F
  this.closeAllMarkers()
  marker.isOpen = true
  this.setState({ markers: Object.assign(this.state.markers, marker) })
  const venue = this.state.venues.find(venue => venue.id === marker.id)
  
  SquareAPI.getVenueDetails(marker.id)
   .then(res => {
   const newVenue = Object.assign(venue, res.response.venue)
   this.setState({ venues: Object.assign(this.state.venues, newVenue) })
  })
  }

  //function to handle list item click
  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id)
    //marker.animation = window.google.maps.Animation.BOUNCE
    this.handleMarkerClick(marker)
    console.log(venue)
    //console.log(marker)
    }
  
  //search query to foursquare API
  componentDidMount() {
    SquareAPI.search({
      near: 'Las Vegas, NV',
      query: 'coffee',
      limit: '5'
    }).then(results => {
      const { venues } = results.response
      const { center } = results.response.geocode.feature.geometry
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true, 
          id: venue.id
        }
      })
        this.setState({ venues, markers, center })
        console.log(results)
        //error for foursquare API call failure
    }).catch(error => {
      alert('FourSquare API Failed')
      console.log(error);
    })
  }
  
  render() {
    return (
    <div className="app">
      <ErrorHelp>    
        <SideBar {...this.state} handleListItemClick={this.handleListItemClick}/>
        <div className="map" role="application"  id="map" aria-hidden="true">
          <Map {...this.state} handleMarkerClick={this.handleMarkerClick} closeAllMarkers={this.closeAllMarkers}/>
        </div>
      </ErrorHelp>  
  
    </div>      
    )
  }

}

export default App;