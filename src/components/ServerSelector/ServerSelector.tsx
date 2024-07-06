
import { useEffect, useState } from "react";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { useDispatch, useSelector } from "react-redux";
import { DataSource } from "../../models/dataSource.model";
import { addDataSources } from "../../redux/contextDBSlice";
 
const dataSources: DataSource[] = [
	{ id:0, name: 'IDRAARHPDBE001', type: 'DEV' },
	{ id:1, name: 'ITRAARHPDBE001', type: 'TEST' },
	{ id:2, name: 'IDRAARHPDB004', type: 'PROD' }
];

export default function ServerSelector({ selectButtonPressed }) {
 
	const selectedTab = useSelector((state) => state.contextdb.selectedTab);
	const dataSourceList = useSelector((state) => state.contextdb.contextDB[selectedTab].dataSources);

	const [selectedServers, setSelectedServers] = useState<DataSource[]>(dataSourceList);
	const dispatch = useDispatch();

	useEffect(() => {
		if (selectButtonPressed) {			
			dispatch(addDataSources({datasources:selectedServers}));
		}
	}, [selectButtonPressed]);

	const handleServerSelect = (e: MultiSelectChangeEvent) => {
		setSelectedServers(e.value);
	}

	return (
		<div className="card flex justify-content-center">
			<MultiSelect
				value={selectedServers}
				onChange={handleServerSelect}
				options={dataSources}
				optionLabel="name"
				filter
				placeholder="Select Servers"
				maxSelectedLabels={3}
				className="w-full md:w-20rem" />
		</div>
	);
}