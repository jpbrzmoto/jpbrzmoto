import React, { useEffect, useState } from 'react';
import './CatalogSelector.scss';

import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { useSelector } from 'react-redux';
import { DataSourceItem } from '../DataSourceItem';
import { Dialog } from 'primereact/dialog';
import { ServerSelector } from '../ServerSelector';
import { Button } from 'primereact/button';

export type CatalogSelectorProps = {
	// types...
}

const CatalogSelector: React.FC<CatalogSelectorProps> = () => {
	const [serversVisible, setServersVisible] = useState(false);
	const [selectButtonPressed, setSelectButtonPressed] = useState(false);
	
	const selectedTab = useSelector((state) => state.contextdb.selectedTab);	
	const selectedDataSources = useSelector((state) => state.contextdb.contextDB[selectedTab].dataSources);	
	
	const [dataSourceList, setDataSourceList] = useState(selectedDataSources);


	useEffect(() => {		
		if (selectedDataSources?.length<1){
			setSelectButtonPressed(false);
			setServersVisible(true);
		}
	},[]);

	useEffect(() => {
		setDataSourceList(selectedDataSources);
	}, [selectedDataSources]);



	const items: MenuItem[] = [
		{
			label: "Server",
			icon: "pi pi-server",
			items: [
				{
					label: "Connect",
					command: () => {
						setSelectButtonPressed(false);
						setServersVisible(true);
					}
				}
			],
		},
		{
			label: "Favorite",
			icon: "pi pi-star",
			command: () => {
				alert(true);
			},
		}
	];

	const selectingServers = () => {
		setSelectButtonPressed(true);
		setServersVisible(false);
		setDataSourceList(selectedDataSources);
	}

	const footerContent = (
		<div>
			<Button label="Cancel" icon="pi pi-times" onClick={() => setServersVisible(false)} className="p-button-text" />
			<Button label="Select" icon="pi pi-check" onClick={() => selectingServers()} autoFocus />
		</div>
	);

	return (
		<>
			<Dialog header="Servers" visible={serversVisible} style={{ width: '50vw' }} onHide={() => setServersVisible(false)} footer={footerContent}>
				<ServerSelector selectButtonPressed={selectButtonPressed}></ServerSelector>
			</Dialog>
			<Menubar model={items} />
			{dataSourceList?.map(element => (
				<DataSourceItem dataSource={element.name} key={"0" + element.name}></DataSourceItem>
			))}
		</>
	);
};

export default CatalogSelector;
