"use client";
import React, { useRef, useState } from 'react';
import './ServerItem.scss';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';
import { Checkbox, FormControlLabel, List, ListItem } from '@mui/material';

export type ServerItemProps = {
	// types...
}

const ServerItem: React.FC<ServerItemProps> = ({ }) => {
	const [catalogList, setData] = useState([{ name: "xxxx", state: "xxx", datasource: "xxx" }]);
	const btnRef1 = useRef<any>(null);
	return (
		<>
			<StyleClass nodeRef={btnRef1}
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
			</List>
		</>
	);
};

export default ServerItem;
