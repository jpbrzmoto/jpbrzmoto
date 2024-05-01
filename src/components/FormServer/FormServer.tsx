/*
import React from 'react';
import './FormServer.scss';

export type FormServerProps = {
	// types...
}

const FormServer: React.FC<FormServerProps>  = ({}) => {
	return (
		<div className='formserver'>
				FormServer works!
			</div>
	);
};

export default FormServer;
*/


import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

interface IDataSourceForm {
	host: string;
	port: number | null;
	databaseName: string;
	username: string;
	password: string;
}

const FormServer = () => {
	const [dataSource, setDataSource] = useState<IDataSourceForm>({
		host: '',
		port: null,
		databaseName: '',
		username: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {

		if (e.target.id && (e.target.id === 'username' || e.target.id === 'password' || e.target.id === 'host' || e.target.id === 'databaseName')) {
			setDataSource({ ...dataSource, [e.target.id]: e.target.value });
		} else if (e.value !== null && e.target.id === 'port') {
			setDataSource({ ...dataSource, port: e.value as number });
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(dataSource);
		const connectionString = `Server=${dataSource.host};Database=${dataSource.databaseName};User Id=${dataSource.username};Password=${dataSource.password};Port=${dataSource.port};`;
		console.log(connectionString);
	};

	return (<>
		<form onSubmit={handleSubmit}>
			<div className="p-fluid">
				<div className="p-field">
					<label htmlFor="host">Host</label>
					<InputText id="host" value={dataSource.host} onChange={handleChange} />
				</div>
				<div className="p-field">
					<label htmlFor="port">Port</label>
					<InputNumber id="port" value={dataSource.port} onValueChange={handleChange} mode="decimal" useGrouping={false} />
				</div>
				<div className="p-field">
					<label htmlFor="databaseName">InitialCatalog</label>
					<InputText id="databaseName" value={dataSource.databaseName} onChange={handleChange} />
				</div>
				<div className="p-field">
					<label htmlFor="username">User</label>
					<InputText id="username" value={dataSource.username} onChange={handleChange} />
				</div>
				<div className="p-field">
					<label htmlFor="password">Password</label>
					<InputText id="password" value={dataSource.password} onChange={handleChange} />
				</div>

			</div>
		</form>
	</>);

}
export default FormServer