"use client";
import React, { useEffect, useRef, useState } from 'react';

import './DataSourceItem.scss';
import { TreeNode } from 'primereact/treenode';
import { Tree } from 'primereact/tree';
import { ContextMenu } from 'primereact/contextmenu';
import { getDataBases, getProgrammability, getTables, getViews } from '../../services/api.services';
import { Checkbox } from "primereact/checkbox";

export type DataSourceItemProps = {
	dataSource: string
}

const DataSourceItem: React.FC<DataSourceItemProps> = ({ dataSource }) => {
	const cm = useRef(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [nodes, setNodes] = useState<TreeNode[]>([]);
	const [selectedKeys, setSelectedKeys] = useState(null);
	const [level, setLevel] = useState(0);

	useEffect(() => {
		const firstNode = [
			{
				key: '0',
				label: dataSource,
				data: 'Documents Folder',
				icon: 'pi pi-fw pi-inbox',
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

	const loadOnExpand = async (event) => {

		if (!event.node.children && !event.node.leaf && !event.node.isAction) {
			setLevel(level + 1);
			setLoading(true);
			const allDevDataBases = await getDataBases(dataSource);
			const newChildren = allDevDataBases.map(database => ({
				key: `${database.name}`,
				label: database.name,
				icon: 'pi pi-fw pi-cog',
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
			setLoading(false);

		} else {
			if (event.node.isAction && !event.node.leaf) {
				switch (event.node.type) {
					case "DataBase": {
						setLevel(level + 1);
						setLoading(true);
						setTimeout(() => {
							event.node.children = [
								{ key: event.node.key + '#0', label: 'Tables', icon: 'pi pi-fw pi-cog', data: 'Tables', leaf: false, isAction: true, type: "Tables", level: level },
								{ key: event.node.key + '#1', label: 'Views', icon: 'pi pi-fw pi-cog', data: 'Views', leaf: false, isAction: true, type: "Views", level: level },
								{ key: event.node.key + '#2', label: 'Programmability', icon: 'pi pi-fw pi-cog', data: 'Programmability', leaf: false, isAction: true, type: "Programmability", level: level }
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
					case "Tables": {
						setLoading(true);
						setLevel(level + 1);
						const catalog = event.node.key.split('#')[0].trim();
						const allElements = await getTables(dataSource, catalog);
						const newChildren = allElements.map(table => ({
							key: `${table.name}`,
							label: table.name,
							data: table.name,
							leaf: true,
							isAction: true,
							type: "Table",
							classNames: "item-db",
							level: level
						}));

						event.node.children = [...(event.node.children || []), ...newChildren];

						const value = [...nodes];
						value[0].children?.map(e => {
							if (e.key === event.node.key) {
								e.children = event.node.children;
							}
						});

						setNodes(value);
						setLoading(false);

						break;
					}
					case "Views": {
						setLoading(true);
						setLevel(level + 1);
						const catalog = event.node.key.split('#')[0].trim();
						const allElements = await getViews(dataSource, catalog);
						const newChildren = allElements.map(view => ({
							key: `${view.name}`,
							label: view.name,
							data: view.name,
							leaf: true,
							isAction: true,
							type: "View",
							classNames: "item-db",
							level: level
						}));

						event.node.children = [...(event.node.children || []), ...newChildren];

						const value = [...nodes];
						value[0].children?.map(e => {
							if (e.key === event.node.key) {
								e.children = event.node.children;
							}
						});

						setNodes(value);
						setLoading(false);

						break;
					}
					case "Programmability": {
						setLoading(true);
						setLevel(level + 1);
						const catalog = event.node.key.split('#')[0].trim();
						const allElements = await getProgrammability(dataSource, catalog);
						console.log(catalog);
						const newChildren = allElements.map(p => ({
							key: `${p.name}`,
							label: p.name,
							data: p.name,
							leaf: true,
							isAction: true,
							type: "Proc",
							classNames: "item-db",
							level: level
						}));

						event.node.children = [...(event.node.children || []), ...newChildren];

						const value = [...nodes];
						value[0].children?.map(e => {
							if (e.key === event.node.key) {
								e.children = event.node.children;
							}
						});

						setNodes(value);
						setLoading(false);

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

	const setChecked = (e) => {
		console.log(e.value);
	}

	const nodeTemplate = (node) => {
		if (node.level === 0) {
			return (
				<div className='item-db'>
					{/*checked={selectedCategories.some((item) => item.key === category.key)} */}
					<Checkbox onChange={e => setChecked(e)} value={node.label} checked={false} ></Checkbox>
					<label htmlFor="ingredient1" className="ml-2">{node.label}</label>
				</div>
			);
		} else {
			return <div className='item-db'>{node.label}</div>;
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
