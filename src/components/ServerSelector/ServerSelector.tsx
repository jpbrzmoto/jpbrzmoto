
import { useEffect, useState } from "react";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { useDispatch, useSelector } from "react-redux";
import { setDataSources } from "../../redux/dataSourceSlice";

const servers: Server[] = [
	{ name: 'IDRAARHPDBE001', type: 'DEV' },
	{ name: 'ITRAARHPDBE001', type: 'TEST' },
	{ name: 'IDRAARHPDB004', type: 'PROD' }
];

export default function ServerSelector({ selectButtonPressed }) {

	//const dataSourceList = useSelector((state) => state.datasource?.selectedDataSources);
	const selectedTab = useSelector((state) => state.datasource.selectedTab);
	const dataSourceList = useSelector((state) => state.datasource?.selectedDataSources[selectedTab]);
	//const dataSourceList = useSelector((state) => state.datasource?.selectedDataSources[state.datasource.selectedTab]);
	const [selectedServers, setSelectedServers] = useState<Server[] | null>(dataSourceList);

	const dispatch = useDispatch();

	useEffect(() => {
		if (selectButtonPressed) {
			dispatch(setDataSources(selectedServers));
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
				options={servers}
				optionLabel="name"
				filter
				placeholder="Select Servers"
				maxSelectedLabels={3}
				className="w-full md:w-20rem" />
		</div>
	);
}