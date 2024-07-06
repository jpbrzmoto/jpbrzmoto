import React, { useEffect, useRef, useState } from 'react';

import './DataSourceItem.scss';
import { TreeNode } from 'primereact/treenode';
import { Tree } from 'primereact/tree';
import { ContextMenu } from 'primereact/contextmenu';
import { getDataBases, getProgrammability } from '../../services/api.services';
import { Checkbox } from "primereact/checkbox";
import { useDispatch, useSelector } from 'react-redux';
//import { addCatalog, removeCatalog } from '../../redux/dataSourceSlice';
import { addDataBase, removeDataBase } from '../../redux/contextDBSlice';
import { DataBase } from "./dataBase.model";


export type DataSourceItemProps = {
	dataSource: string
}

const DataSourceItem: React.FC<DataSourceItemProps> = ({ dataSource }) => {
	const cm = useRef(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [nodes, setNodes] = useState<TreeNode[]>([]);
	const [selectedKeys, setSelectedKeys] = useState(null);
	const [level, setLevel] = useState(0);
 
	const selectedTab = useSelector((state) => state.contextdb.selectedTab);	
	const selectedCatalogs = useSelector((state) => state.contextdb.contextDB[selectedTab].dataBases);	

	const dispatch = useDispatch();

	useEffect(() => {
		const firstNode = [
			{
				key: '0',
				label: dataSource,
				data: 'Documents Folder',
				icon: 'pi pi-fw pi-server',
				leaf: false
			}
		];
		setNodes(firstNode);
	}, []);


	const menu = [
		{
			label: 'View Key',
			icon: 'pi pi-search',
			command: () => {
			}
		},
		{
			label: 'Toggle',
			icon: 'pi pi-sort',
			command: () => {
			}
		}
	];

	const loadOnExpand = async (event) => {

		if (!event.node.children && !event.node.leaf && !event.node.isAction) {
			setLevel(level + 1);
			setLoading(true);
			const allDevDataBases = await getDataBases(dataSource);
			const newChildren = allDevDataBases.map(database => ({
				key: `${database.name}`,
				label: database.name,
				data: database.name,
				leaf: false,
				isAction: true,
				type: "DataBase",
				level: level,
				nodeTemplate: nodeTemplate
			}));

			event.node.children = [...(event.node.children || []), ...newChildren];
			const value = [...nodes];
			value[0].children?.map(e => {
				if (e.key === event.node.key) {
					e.children = event.node.children;
				}
			});
			setNodes(value);

		} else {
			if (event.node.isAction && !event.node.leaf) {
				switch (event.node.type) {
					case "DataBase": {
						setLevel(level + 1);
						setLoading(true);

						event.node.children = [
							{ key: event.node.key + '#0', label: 'Tables', icon: 'pi pi-fw pi-table', data: 'Tables', leaf: false, isAction: true, type: "Tables", level: level },
							{ key: event.node.key + '#1', label: 'Views', icon: 'pi pi-fw pi-eye', data: 'Views', leaf: false, isAction: true, type: "Views", level: level },
							{ key: event.node.key + '#2', label: 'Programmability', icon: 'pi pi-fw pi-bolt', data: 'Programmability', leaf: false, isAction: true, type: "Programmability", level: level }
						];

						const value = [...nodes];
						value[0].children?.map(e => {
							if (e.key === event.node.key) {
								e.children = event.node.children;
							}
						});
						setNodes(value);
						break;
					}
					case "Tables":
					case "Views":
					case "Programmability": {
						setLoading(true);
						setLevel(level + 1);
						const catalog = event.node.key.split('#')[0].trim();
						const allElements = await getProgrammability(dataSource, catalog);
						const newChildren = allElements.map(p => ({
							key: `${p.name}`,
							label: p.name,
							data: p.name,
							leaf: true,
							isAction: true,
							type: "Proc",
							level: 2
						}));

						event.node.children = [...(event.node.children || []), ...newChildren];

						const value = [...nodes];
						value[0].children?.map(e => {
							if (e.key === event.node.key) {
								e.children = event.node.children;
							}
						});
						setNodes(value);
						break;
					}
					default: {
						console.log("default");
						break;
					}
				}
			}
		}

		setLoading(false);
	}
	const setDataBaseChecked = (e) => {
		const dataBaseSelected: DataBase = { id:0, name:e.value, dataSource:"IDRAARHPDBE001"};		
		
		if (e.checked)
			dispatch(addDataBase({ database: dataBaseSelected}));			
		else
			dispatch(removeDataBase({ database: dataBaseSelected }));
	}

	const nodeTemplate = (node) => {

		switch (node.level) {
			case 0: {
				return (
					<div className='item-db'>
						<Checkbox onChange={e => setDataBaseChecked(e)} value={node.label}
							checked={selectedCatalogs?.some((database:DataBase) => database.name === node.label)}
						></Checkbox>
						<label className="">{node.label}</label>
					</div>
				);
			}
			case 2: {
				return <div className='leaf-db'>{node.label}  </div>;
			}

			default: {
				return <div className='item-db'>{node.label} </div>;
			}
		}
	};

	return (
		<>
			<ContextMenu model={menu} ref={cm} />
			<Tree
				nodeTemplate={nodeTemplate}
				value={nodes}
				className="w-full p-0 custom-ptree"
				loading={loading}
				onExpand={loadOnExpand}
				selectionKeys={selectedKeys}
				onSelectionChange={(e) => setSelectedKeys(e.value)}
			/>
		</>
	);
};

export default DataSourceItem;

