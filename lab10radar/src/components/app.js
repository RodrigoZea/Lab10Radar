import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Helmet from 'preact-helmet';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';

export default class App extends Component {
	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<noscript>Put Sample code here for execution when JavaScript is Disabled</noscript>
				<Helmet
					title="Laboratorio 10 Radar"
					noscript={[
						{ innerHTML: `<link rel="stylesheet" type="text/css" href="foo.css" />` }
					]}
					link={[
						{ rel: 'apple-touch-icon', href: '../assets/icons/apple-touch-icon.png' },
						{ rel: 'icon', sizes: '192x192', href: '../assets/icons/android-chrome-192x192' }
					]}
				/>
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
				</Router>
			</div>
		);
	}
}
