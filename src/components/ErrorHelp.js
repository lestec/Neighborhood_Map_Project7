import React, { Component } from 'react'

export default class ErrorHelp extends Component {
	constructor(props) {
		super(props)
		this.state = {hasError: false, errorInfo: null}
	}

	componentDidCatch(error, info) {
		this.setState({ hasError: true, errorInfo: info })
	}

	render() {
		if (this.state.hasError) {
			return <h1>Google Maps API had failed. Please check your connection.</h1>
		}
		return this.props.children
	}
}