"use client";
import React, { useEffect, useRef, useState } from 'react';

import './DataSourceItem.scss';
import { Checkbox, FormControlLabel, List, ListItem } from '@mui/material';
import { StyleClass } from "primereact/StyleClass";
import { Ripple } from 'primereact/Ripple';
import { TreeNode } from 'primereact/treenode';
import { NodeService } from '../../services/tenant.service';
import { Tree } from 'primereact/tree';
import { isAction } from '@reduxjs/toolkit';
import { ContextMenu } from 'primereact/contextmenu';
export type DataSourceItemProps = {
	// types...
}

/*const _connectionStrings = [
	{ name: "ITRAARHPDBE001", value: "Server=tcp:ITRAARHPDBE001.Vlatamdev.azure;Initial Catalog=MetaDB;Persist Security Info=False;User ID=rhproadmin;Password=rL[PO2Ua74Pg7Y%;MultipleActiveResultSets=False;Connection Timeout=30;" },
	{ name: "IDRAARHPDBE001", value: "Server=tcp:IDRAARHPDBE001.Vlatamdev.azure;Persist Security Info=False;User ID=rhproadmin;Password=rhpro#2018ADMIN;TrustServerCertificate=False;Connection Timeout=30;" },
	{ name: "IDRAARHPDB004", value: "Server=tcp:IDRAARHPDB004.Vlatamdev.azure;Persist Security Info=False;User ID=rhproadmin;Password=rhpro#2018ADMIN;TrustServerCertificate=False;Connection Timeout=30;" }
];*/
const DataSourceItem: React.FC<DataSourceItemProps> = ({ }) => {
	const [catalogList, setData] = useState([{ name: "xxxx", state: "xxx", datasource: "xxx" }]);
	const cm = useRef(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [expandedKeys, setExpandedKeys] = useState({});
	const [selectedNodeKey, setSelectedNodeKey] = useState(null);
	//const btnRef1 = useRef<any>(null);
	const [nodes, setNodes] = useState<TreeNode[]>([]);
	const [selectedKeys, setSelectedKeys] = useState(null);

	useEffect(() => {
		NodeService.getTreeNodes().then((data) => { setNodes(data); });
	}, []);


	const menu = [
		{
			label: 'View Key',
			icon: 'pi pi-search',
			command: () => {
				//toast.current.show({ severity: 'success', summary: 'Node Key', detail: selectedNodeKey });
			}
		},
		{
			label: 'Toggle',
			icon: 'pi pi-sort',
			command: () => {
				/*const _expandedKeys = { ...expandedKeys };

				if (_expandedKeys[selectedNodeKey]) delete _expandedKeys[selectedNodeKey];
				else _expandedKeys[selectedNodeKey] = true;

				setExpandedKeys(_expandedKeys);*/
			}
		}
	];

	const loadOnExpand = (event) => {
		console.log("NODE", event.node);
		console.log("event.node.children", !event.node.children);
		if (!event.node.children && !event.node.leaf && !event.node.isAction) {
			setLoading(true);
			setTimeout(() => {
				event.node.children = [
					{ key: event.node.key + '-0', label: 'Tables', icon: 'pi pi-fw pi-cog', data: 'Tables', leaf: false, isAction: true },
					{ key: event.node.key + '-1', label: 'Views', icon: 'pi pi-fw pi-cog', data: 'Views', leaf: false, isAction: true },
					{ key: event.node.key + '-2', label: 'Programmability', icon: 'pi pi-fw pi-cog', data: 'Programmability', leaf: false, isAction: true }
				];

				const value = [...nodes];
				value[0].children?.map(e => {
					if (e.key === event.node.key) {
						e.children = event.node.children;
					}
				});

				setNodes(value);
				setLoading(false);
			}, 200);
		} else {
			if (event.node.isAction && !event.node.leaf) {
				switch (event.node.label) {
					case "Tables": {
						setLoading(true);
						setTimeout(() => {
							event.node.children = [
								{ checkbox: false, key: event.node.key + '-0', label: 'empleado', icon: 'pi pi-fw pi-table', data: '<span>empleado</span>', leaf: true, isAction: true },
								{ checkbox: false, key: event.node.key + '-1', label: 'reportes', icon: 'pi pi-fw pi-table', data: 'reportes', leaf: true, isAction: true },
								{ checkbox: false, key: event.node.key + '-2', label: 'user_per', icon: 'pi pi-fw pi-table', data: 'user_per', leaf: true, isAction: true }
							];

							const value = [...nodes];
							value[0].children?.map(e => {
								if (e.key === event.node.key) {
									e.children = event.node.children;
								}
							});

							setNodes(value);
							setLoading(false);
						}, 200);
						break;
					}
					case "Views": {
						setLoading(true);
						setTimeout(() => {
							event.node.children = [
								{ checkbox: false, key: event.node.key + '-0', label: 'v_empleado', icon: 'pi pi-fw pi-eye', data: 'v_empleado', leaf: true, isAction: true },
								{ checkbox: false, key: event.node.key + '-1', label: 'v_reportes', icon: 'pi pi-fw pi-eye', data: 'v_reportes', leaf: true, isAction: true },
								{ checkbox: false, key: event.node.key + '-2', label: 'v_users', icon: 'pi pi-fw pi-eye', data: 'v_users', leaf: true, isAction: true }
							];

							const value = [...nodes];
							value[0].children?.map(e => {
								if (e.key === event.node.key) {
									e.children = event.node.children;
								}
							});

							setNodes(value);
							setLoading(false);
						}, 200);
						break;
					}
					case "Programmability": {
						console.log("Programmability >>>>>>>>> ");
						break;
					}
					default: {
						console.log("default >>>>>>>>> ");
						break;
					}
				}
			}
		}
	}

	return (
		<>

			{/*<Tree value={nodes} className="w-full"
				loading={loading}
				onExpand={loadOnExpand}
			/>*/}
			<ContextMenu model={menu} ref={cm} />
			<Tree value={nodes} selectionMode="checkbox" className="w-full"
				loading={loading}
				onExpand={loadOnExpand}
				selectionKeys={selectedKeys}
				onSelectionChange={(e) => setSelectedKeys(e.value)}
				filter filterMode="lenient"
			/>
			{/*<Tree value={nodes} selectionMode="checkbox" className="w-full"
				loading={loading}
				onExpand={loadOnExpand}
				selectionKeys={selectedKeys}
				onSelectionChange={(e) => setSelectedKeys(e.value)}
		/>*/}

			{/*<StyleClass nodeRef={btnRef1}
				selector="@next"
				enterClassName="hidden"
				leaveToClassName="hidden"
				enterActiveClassName="slidedown"
				leaveActiveClassName="slideup">
				<div ref={btnRef1} className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer">
					<i className='pi pi-server' style={{ fontSize: '1.5rem' }}></i>
					<span className="font-medium">{"source"}</span>
					<i className="pi pi-chevron-down"></i>
					<Ripple />
				</div>
			</StyleClass>

			<List className="p-0 m-0 hidden overflow-y-hidden transition-all transition-duration-50 transition-ease-in-out">
				{
					catalogList?.map((catalog) => (

						<ListItem key={catalog.name} className="itemList" style={{ padding: "0px" }}>
							<FormControlLabel
								className="align-items-center cursor-pointer p-0 border-round text-800 hover:surface-300 transition-duration-10 transition-colors w-full"
								control={<Checkbox sx={{ marginLeft: 2 }}
									name={catalog.name}
									value={catalog.datasource}
								/>
								}
								label={catalog.name}
								disabled={catalog.state === 'OFFLINE'}

							/>
						</ListItem>
					))
				}
			</List >*/}

		</>
	);
};

export default DataSourceItem;
