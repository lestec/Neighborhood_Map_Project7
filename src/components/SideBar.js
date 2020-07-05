import React, { Component } from 'react'
import VenueList from "./VenueList"
//for Hamb menu
import { slide as Menu } from 'react-burger-menu'

export default class SideBar extends Component {
	constructor() {
		super()
		this.state = {
			query: "",
			venues: []
		}
	}
	handleFilterVenues = () => {
		if(this.state.query.trim() !== "") {
			const venues = this.props.venues.filter(venue => venue.name
				.toLowerCase().includes(this.state.query.toLowerCase()))
				return venues
		} else {
		return this.props.venues
	}
	}
	handleChange = event => {
		//hide markers based on user input
		this.setState({ query: event.target.value })
		const markers = this.props.venues.map(venue => {
			const isMatched = venue.name.toLowerCase().includes(event.target.value.toLowerCase())
			//grab the marker associated with each venue
			const marker = this.props.markers.find(marker => marker.id === venue.id)
			if(isMatched) {
				marker.isVisible = true
			} else {
				marker.isVisible = false
			}
			return marker
		})
		this.props.updateSuperState({ markers })
	}
	render() {
		return(
			<Menu noOverlay left>
				<div className="sidebar">
					<header><b>Find coffee</b></header>
					<input type={"search"} id={"search"} aria-label={"Search Venues"} placeholder={"Search Venues"} onChange={this.handleChange} />
					<VenueList {...this.props} venues = {this.handleFilterVenues()} handleListItemClick={this.props.handleListItemClick} />
				</div>	
			</Menu>	
		)
	}
}

