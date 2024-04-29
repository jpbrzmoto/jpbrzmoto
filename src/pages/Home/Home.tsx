"use client";
import React from 'react';
import { Provider } from 'react-redux';

import { NavBar } from '../../components/NavBar';
import { MenuBar } from '../../components/MenuBar';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-blue/theme.css';
import { QueryManagement } from '../../components/QueryManagement';
import { store } from '../../redux/store';
import "./Home.scss"
//import 'primereact/resources/themes/lara-dark-blue/theme.css';
export type HomeProps = {
	// types...
}

const Home: React.FC<HomeProps> = () => {
	return (
		<>
			<Provider store={store}>

				<NavBar></NavBar>
				<MenuBar></MenuBar>

				<QueryManagement></QueryManagement>
			</Provider>
		</>
	);
};

export default Home;
