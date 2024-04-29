"use client";
import React, { useState } from 'react';
import './QueryManagement.scss';
import { TabQueryState } from '../TabQueryState';

import { Box, IconButton, Tab, Tabs } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setQuery, setSelectedIndex } from '../../redux/querySlice';


export type QueryManagementProps = {
	// types...
}

const QueryManagement: React.FC<QueryManagementProps> = React.memo((index) => {
	const [value, setValue] = useState(0);
	const [tab, setTab] = useState(1);
	const dispatch = useDispatch();

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
		dispatch(setSelectedIndex({ index: newValue }));
	};

	const addTab = () => {
		setTab(tab + 1);
		setValue(tab);
		dispatch(setQuery({ index: tab, query: "-- sql query  -- \n" }));
		dispatch(setSelectedIndex({ index: tab }));
	};



	return (
		<>
			<Box sx={{ width: '80%', bgcolor: 'background.paper', marginTop: '-40px', marginBottom: '0px', display: 'inline-flex' }}>
				<IconButton onClick={addTab} color="primary" aria-label="add to shopping cart" sx={{ display: 'inline-flex' }}>
					<AddCircleOutline />
				</IconButton>
				<Tabs
					className='w-full'
					value={value}
					onChange={handleChange}
					variant="scrollable"
					scrollButtons
					allowScrollButtonsMobile
					aria-label="scrollable force tabs example"
				>
					{Array.from({ length: tab }).map((_, index) => (
						<Tab key={index} label={"Query " + (index + 1)} value={index} />
					))}

				</Tabs>
			</Box >
			<TabQueryState></TabQueryState>
			{
				//Array.from({ length: tab }).map((_, index) => (
				//<TabQueryState index={index}></TabQueryState>
				//))
			}



		</>
	);
});

export default QueryManagement;
