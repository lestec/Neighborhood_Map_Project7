import React, { Component } from 'react'

//generates items for SideBar
export default class ListItem extends Component {
	render() {
		return (
			<li 
				className="listItem" 
				tabIndex="0" 
				role="link"
				onClick={() => this.props.handleListItemClick(this.props)}>
			
			{this.props.name}
			</li>
		)
	}
}

