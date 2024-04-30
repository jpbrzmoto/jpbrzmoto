import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { CatalogSelector } from '../CatalogSelector';
import { IconButton } from '@mui/material';
import './QueryControls.scss';

export type QueryControlsProps = {
	// types...
}

const QueryControls: React.FC<QueryControlsProps> = ({ }) => {
	const [catalogsVisible, setCatalogsVisible] = useState(false);
	const [favorite, setFavorite] = useState(false);
	const handleFavorite = () => {
		setFavorite(!favorite);
	};
	const saveQuery = () => {
		alert("guardado");
	};

	const start = (
		<>
			<Button type="button" className='p-2 m-2' label="Tenants" icon="pi pi-database"
				outlined badge="0" badgeClassName="p-badge-danger" size="small"
				onClick={() => setCatalogsVisible(true)} />
			<Button type="button" className='p-2 m-2' label="Execute" icon="pi pi-caret-right" size="small" />
		</>
	);

	const end = (
		<div className="flex align-items-center gap-2">
			<IconButton color="primary" onClick={handleFavorite} title="Add/Drop to Favorite Query " >
				<span className={favorite ? "pi pi-star-fill" : "pi pi-star"} style={{ fontSize: '1.5rem', marginRight: '0' }}></span>
			</IconButton>
			<IconButton color="primary" onClick={saveQuery} title="save Query " >
				<span className={"pi pi-save"} style={{ fontSize: '1.5rem', marginRight: '0' }}></span>
			</IconButton>
		</div>);


	return (
		<>
			<div className="card flex justify-content-center">
				<Sidebar visible={catalogsVisible}
					onHide={() => setCatalogsVisible(false)}
					content={
						<CatalogSelector></CatalogSelector>
					}
				>

				</Sidebar>
			</div>

			<Menubar className='p-1' start={start} end={end} />
		</>
	);
};

export default QueryControls;
