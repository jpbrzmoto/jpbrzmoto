import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { CatalogSelector } from '../CatalogSelector';
import { IconButton } from '@mui/material';
import './QueryControls.scss';
import { useDispatch, useSelector } from 'react-redux';
import { InputSwitch } from 'primereact/inputswitch';
import { postQuery } from '../../services/api.services';
import { QueryModel } from '../../models/query.model';
import { DataBase } from '../../models/dataBase.model';
import { addContextResult, cleanContextResult } from '../../redux/contextDBSlice';


export type QueryControlsProps = {
	// types...
}

const QueryControls: React.FC<QueryControlsProps> = React.memo(({ }) => {
	const dispatch = useDispatch();
	const [databasesVisible, setCatalogsVisible] = useState(false);
	const [groupedSelected, setGroupedSelected] = useState(false);

	const selectedTab = useSelector((state) => state.contextdb.selectedTab);	
	const selectedQuery = useSelector((state) => state.contextdb.contextDB[selectedTab].sql);	
	const selectedDataBases = useSelector((state) => state.contextdb.contextDB[selectedTab].dataBases);	

	const [favorite, setFavorite] = useState(false);
	const handleFavorite = () => {
		setFavorite(!favorite);
	};
	const saveQuery = () => {
		alert("guardado");
	};
	const executeQuery = async () => {
		dispatch(cleanContextResult());
		selectedDataBases.forEach(async (database: DataBase) => {
			const model : QueryModel =  { query:selectedQuery, catalog:database.name, source:database.dataSource }
			const result = await postQuery(model);				
			result.dataBase = database.name;
			result.dataSource = database.dataSource;
			dispatch(addContextResult({ result: result }));			
		});		
	};

	const start = (
		<>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<div style={{ display: 'flex', alignItems: 'center', marginRight: '1.5rem' }}>
					<InputSwitch
						checked={groupedSelected}
						onChange={(e) => setGroupedSelected(e.value)}
					/>
					<span style={{ marginLeft: '0.5rem' }}>Grouped Execution</span>
				</div>
				<Button type="button" className='p-2 m-2' label="Tenants" icon="pi pi-database"
					outlined badge={selectedDataBases?.length} badgeClassName="p-badge-info catalog-badge" size="small"
					onClick={() => setCatalogsVisible(true)} />
				<Button type="button" disabled={selectedDataBases?.length<1} className='p-2 m-2' label="Execute" icon="pi pi-caret-right" size="small" 
					onClick={() => executeQuery()}/>
			</div>


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
				<Sidebar
					className='w-full md:w-20rem lg:w-30rem custom-datasource-sidebar'
					visible={databasesVisible}
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
});

export default QueryControls;
