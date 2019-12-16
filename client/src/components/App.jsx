import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage';

export default function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/">
					<HomePage />
				</Route>
				<Route render={() => <h2>404</h2>} />
			</Switch>
		</div>
	);
}
