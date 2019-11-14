/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Helmet from 'preact-helmet';

import Header from './header';
import Dot from './dot';
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

	getGeolocation()  {
		if ('geolocation' in navigator) {   // Lo primero que deben hacer es validar si el dispositivo soporta geolocacion
			console.log('has geolocation');


			const success = position => {   // Esta funcion va a ser un callback que va a recibir la posición del dispositivo
				console.log('success', position);
				//this.state.currPosition.latitude = position.coords.latitude;
				//this.state.currPosition.longitude = position.coords.longiude;
				const coords = { x: position.coords.latitude, y: position.coords.longitude };
				this.setState({ currPosition: coords });

				/*
					Position acá es un objeto con las siguientes propiedades:
	
					latitude : la latitud
					longitude : la longitud
					altitude : la altitud en metros sobre el nivel del mar
					accuracy : el radio, en metros que indica la incertidumbre de la medida de la posición
					altitudeAccuracy : el radio, en metros que indica la incertidumbre de la medida de la altitud
					heading : indica la direccion en la que este dispositivo se esta moviendo (con relacion al norte absoluto)
					speed : la velocidad a la que se mueve en metros sobre segundo
				*/
			};

			const error = err => {
				console.log('error', err);

				/*
					El error tiene dos valores, un código de error y un texto
	
					el codigo puede ser
					- 0 si es un error generico
					- 1 si el usuario respondio que "no" al prompt de "This webpage wants to know your location"
					- 2 si no se pudo determinar la ubicacion, por ejemplo, si no tiene acceso a los satelites de GPS ni a wifi
					- 3 si no se pudo acceder al sensor en el tiempo limite
				*/
			};

			// Este metodo nos da la ubicación una unica vez
			const loc = navigator.geolocation.getCurrentPosition(
				success, // esta funcion se va a llamar si fue exitosa la medida
				error,  // esta se va a llamar si no
				{ // estos parametros son para configurar la medida
					maximumAge: 1000000,  // esto controla la cache de las mediciones, no necesitan cambiarlo
					timeout: 1000, // si la medida toma un tiempo mayor a este parametro, se va a generar el error 3
					enableHighAccurancy: true // highAccurancy gasta mas bateria y toma mas tiempo, pero tiene mejor accurancy
				}
			);


			// Este metodo nos da la ubicacion cada vez que el usuario se mueva
			const watcher = navigator.geolocation.watchPosition(
				success,  // success se va a llamar dos veces por cada cambio de ubicacion
				error,
				{
					maximumAge: 0,
					enableHighAccurancy: true
				}
			);

			// Para debuggear, usen sus developer tools > el menu de los tres puntos > More tools > Sensors > geolocation
			// Pueden cambiar su ubicacion mientras desarrollan

		}
		else {
			console.log('doesnt have geolocation');
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			currPosition: {},
			posList: [{ x: 60, y: 80 }, { x: 30, y: -50 }, { x: 23, y: 50 }]
		};
	}

	componentDidMount() {
		this.getGeolocation();
	}

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
					<Home path="/" posList={this.state.posList} currPosition={this.state.currPosition} />

				</Router>
			</div>
		);
	}
}
