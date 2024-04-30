import React from 'react';
import './CatalogSelector.scss';

import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { useSelector } from 'react-redux';
import { DataSourceItem } from '../DataSourceItem';

export type CatalogSelectorProps = {
	// types...
}

const CatalogSelector: React.FC<CatalogSelectorProps> = ({ }) => {
	const dataSourceList = useSelector((state) => state.query.selectedDataSource);
	const items: MenuItem[] = [
		{
			label: "Server",
			icon: "pi pi-server",
			items: [
				{
					label: "Connect",
					command: () => {
						alert(true);
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
	return (
		<div className='catalogselector'>
			<Menubar model={items} />
			{dataSourceList?.map(element => (
				<div className="overflow-y-auto" key={element.name}>
					<DataSourceItem></DataSourceItem>
				</div>
			))}
		</div>
	);
};

export default CatalogSelector;
