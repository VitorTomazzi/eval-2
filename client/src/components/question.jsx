import React, { Component } from 'react';

export default class Question extends Component {
	render() {
		const { id, evaluation, score } = this.props.question;
		//const { onTextChange } = this.props.onTextChange;
		//console.log(this.props.onTextChange);
		return (
			<div
				className="font"
				style={{
					//border: '1px solid black',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					color: '#E4FDE0',
					paddingLeft: '.5rem',
					letterSpacing: '.1rem'
				}}>
				<label htmlFor="score">{evaluation}:</label>
				<input
					id="score"
					name="score"
					type="text"
					//placeholder="1"
					min="1"
					max="5"
					style={{
						width: '15%',
						backgroundColor: '#E4FDE0',
						color: '#114B5F',
						borderStyle: 'none',
						marginBottom: '1rem',
						textAlign: 'center'
					}}
					value={score}
					onChange={(event) => this.props.onTextChange(event, id)}
				/>
			</div>
		);
	}
}
