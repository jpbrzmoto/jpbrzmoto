"use client";
import React from 'react';
import './QueryControls.scss';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';

export type QueryControlsProps = {
	// types...
}

const QueryControls: React.FC<QueryControlsProps> = ({ }) => {
	const itemRenderer = (item) => (
		<a className="flex ">
			<span className={item.icon} />
			<span className="mx-0">{item.label}</span>
			{item.badge && <Badge className="ml-auto" value={item.badge} />}
		</a>
	);
	const items = [
		{
			label: 'DataSource',
			icon: 'pi pi-home'
		},
		{
			label: 'Execute',
			icon: 'pi pi-star'
		}
	];
	const start = (
		<div className="card flex flex-wrap justify-content-center gap-3">
			<Button type="button" className='p-1 m-2' label="Tenants" icon="pi pi-database" outlined badge="0" badgeClassName="p-badge-danger" size="small" />
			<Button type="button" className='p-1 m-2' label="Execute" icon="pi pi-caret-right" size="small" />
		</div>
	);
	const end = (
		<div className="flex align-items-center gap-2">

		</div>);

	return (
		<Menubar className='p-1' start={start} />
	);
};

export default QueryControls;
