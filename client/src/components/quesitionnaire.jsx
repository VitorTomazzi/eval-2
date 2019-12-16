import React, { Component } from 'react';
import Question from './question';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

export default class Questionnaire extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			fullname: '',
			email: '',
			repo: '',
			URL: '',
			displayed: false,
			emailSent: null,
			questions: [
				{
					id: 0,
					evaluation: 'Using best practices OOP',
					score: ''
				},
				{
					id: 1,
					evaluation: 'Modular Development',
					score: ''
				},
				{
					id: 2,
					evaluation: 'Full-stack workflow understanding',
					score: ''
				},
				{
					id: 3,
					evaluation: 'Testing',
					score: ''
				},
				{
					id: 4,
					evaluation: 'Database knowledge',
					score: ''
				},
				{
					id: 5,
					evaluation: 'Debugging',
					score: ''
				},
				{
					id: 6,
					evaluation: 'Problem solving skills',
					score: ''
				},
				{
					id: 7,
					evaluation: 'Javascript',
					score: ''
				},
				{
					id: 8,
					evaluation: 'HTML',
					score: ''
				},
				{
					id: 9,
					evaluation: 'CSS',
					score: ''
				},
				{
					id: 10,
					evaluation: 'Working on a team',
					score: ''
				},
				{
					id: 11,
					evaluation: 'Self motivation',
					score: ''
				},
				{
					id: 12,
					evaluation: 'Communication skills',
					score: ''
				},
				{
					id: 13,
					evaluation: 'Your own energy level',
					score: ''
				},
				{
					id: 14,
					evaluation: 'Intelligence Aptitude',
					score: ''
				}
			]
		};
	}

	handleChange = (event, score) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		let name = target.name;

		//console.log(name, value, score, '<<<<<<');

		if (name === 'score') {
			let questions = [ ...this.state.questions ];
			questions[score].score = value;
			this.setState({
				questions: questions
			});
		} else {
			this.setState({
				[name]: value
			});
		}
	};

	makeQuestions = (questions) => {
		return questions.map((question) => {
			return (
				<Question
					question={question}
					key={question.id}
					//value={question.score}
					onTextChange={this.handleChange}
				/>
			);
		});
	};

	handleSubmit = (event) => {
		//depends if you want form to reset on submission
		//event.preventDefault();

		//disable to stop from pressing submit button 1000x
		this.setState({
			disabled: true
		});

		axios.post('http://localhost:5000/user/submit', this.state).then((res) => console.log(res.data));

		axios
			.post('http://localhost:5000/api/sendMail', this.state)
			.then((res) => {
				this.setState({
					disabled: false,
					emailSent: true
				});
			})
			.catch((err) => {
				this.setState({
					disabled: false,
					emailSent: false
				});
			});
	};
	//updating for heroku

	render() {
		return (
			<Container
				fluid
				style={{
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center',
					backgroundColor: '#114B5F'
				}}>
				<Form
					onSubmit={this.handleSubmit}
					style={{
						margin: '1rem',
						padding: '1.5rem',
						backgroundColor: '#446990'
					}}
					className="font">
					<div>
						<input
							id="fullname"
							name="fullname"
							type="text"
							placeholder="FULL NAME"
							value={this.state.fullname}
							onChange={this.handleChange}
							style={{
								backgroundColor: '#E4FDE0',
								color: '#114B5F',
								borderStyle: 'none',
								marginBottom: '1rem',
								width: '100%',
								padding: '.5rem 1rem'
							}}
							className="font"
						/>
					</div>
					<div>
						<input
							id="email"
							name="email"
							type="email"
							placeholder="EMAIL"
							value={this.state.email}
							onChange={this.handleChange}
							style={{
								backgroundColor: '#E4FDE0',
								color: '#114B5F',
								borderStyle: 'none',
								marginBottom: '1rem',
								width: '100%',
								padding: '.5rem 1rem'
							}}
							className="font"
						/>
					</div>
					<div>
						<input
							id="repo"
							name="repo"
							type="text"
							placeholder="PROJECT REPO"
							value={this.state.repo}
							onChange={this.handleChange}
							style={{
								backgroundColor: '#E4FDE0',
								color: '#114B5F',
								borderStyle: 'none',
								marginBottom: '1rem',
								width: '100%',
								padding: '.5rem 1rem'
							}}
						/>
					</div>
					<div>
						<input
							id="URL"
							name="URL"
							type="text"
							placeholder="PROJECT URL"
							value={this.state.URL}
							onChange={this.handleChange}
							style={{
								backgroundColor: '#E4FDE0',
								color: '#114B5F',
								borderStyle: 'none',
								marginBottom: '1rem',
								width: '100%',
								padding: '.5rem 1rem'
							}}
						/>
					</div>

					<p className="font" style={{ padding: '1rem' }}>
						Each category scores from 1 to 5. Total of 50 pts can be used
					</p>
					<hr />

					{/* evaluation questions */}
					{this.makeQuestions(this.state.questions)}

					<button
						style={{
							color: '#E4FDE0',
							backgroundColor: '#F45B69',
							border: '#F45B69',
							width: '100%',
							padding: '.5rem',
							letterSpacing: '.2rem'
						}}
						type="submit"
						disabled={this.state.disabled}>
						Submit
					</button>

					{/* Success message for user */}
					{/* {this.state.emailSent === true && <p className="d-inline success-msg">Email sent!</p>}
					{this.state.emailSent === false && <p className="d-inline error-msg">Hmm, try again</p>} */}
				</Form>
			</Container>
		);
	}
}
