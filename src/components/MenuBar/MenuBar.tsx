

import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';

import { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
//import FormServer from '../FormServer/FormServer';
import { Toast } from 'primereact/toast';
import './MenuBar.scss';
import { Sidebar } from 'primereact/sidebar';
import { ThemeList } from '../ThemeList';
import { IconButton } from '@mui/material';
import { FormServer } from '../FormServer';

export type MenuBarProps = {
	// types...
}

const MenuBar: React.FC<MenuBarProps> = ({ }) => {
	const toastTopCenter = useRef(null);

	const itemRenderer = (item) => (
		<a className="flex align-items-center p-menuitem-link">
			<span className={item.icon} />
			<span className="mx-2">{item.label}</span>
			{item.badge && <Badge className="ml-auto" value={item.badge} />}
			{item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
		</a>
	);
	const [newServerVisible, setNewServerVisible] = useState(false);
	const [visibleRight, setVisibleRight] = useState(false);
	const items = [

		{
			label: 'Features',
			icon: 'pi pi-star',
			items: [
				{
					label: 'New',
					icon: 'pi pi-pencil',
					template: itemRenderer
				},
				{
					label: 'List',
					icon: 'pi pi-align-justify',
					template: itemRenderer
				}
			]
		},
		{
			label: 'DataSource',
			icon: 'pi pi-server',
			items: [
				{
					label: 'New',
					icon: 'pi pi-pencil',
					template: itemRenderer,
					command: () => {
						setNewServerVisible(true);
					}
				},
				{
					label: 'List',
					icon: 'pi pi-align-justify',
					template: itemRenderer
				}
			]
		},
		{
			label: 'Querys',
			icon: 'pi pi-server',
			items: [
				{
					label: 'New',
					icon: 'pi pi-pencil',

					template: itemRenderer
				},
				{
					label: 'List',
					icon: 'pi pi-align-justify',

					template: itemRenderer
				}
			]
		}
	];

	const showMessage = (label, title, ref, severity) => {
		//const label = event.target.innerText;
		ref.current.show({ severity: severity, summary: title, detail: label, life: 3000 });
	};

	const save = (e) => {
		setNewServerVisible(false);
		showMessage("Successful", "New Server", toastTopCenter, 'info');
	}

	const footerContent = (
		<div>
			<Button label="Cancel" icon="pi pi-times" onClick={() => setNewServerVisible(false)} className="p-button-text" />
			<Button label="Save" icon="pi pi-check" onClick={(e) => save(e)} autoFocus />
		</div>
	);

	const end = (
		<IconButton color="primary" onClick={() => setVisibleRight(true)} title="Select Theme " >
			<span className={"pi pi-palette"} style={{ fontSize: '1.5rem', marginRight: '10px' }}></span>
			<span style={{ fontSize: "1.1rem" }}>Theme</span>
		</IconButton>
	);

	const customHeader = (
		<div className="flex align-items-center gap-2">
			<span className="font-bold">Themes</span>
		</div>
	);

	return (
		<>
			<Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)} header={customHeader}>
				<ThemeList></ThemeList>
			</Sidebar>
			<div className="flex w-full">
				<Toast ref={toastTopCenter} position="bottom-center" />
				<Menubar model={items} end={end} className='principal-menu w-full' />
				<Dialog header="New Server" visible={newServerVisible} style={{ width: '50vw' }} onHide={() => setNewServerVisible(false)} footer={footerContent}>
					<FormServer></FormServer>
				</Dialog>
			</div>
		</>
	)
};

export default MenuBar;
