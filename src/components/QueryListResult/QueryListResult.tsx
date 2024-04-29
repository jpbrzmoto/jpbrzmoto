
import React from 'react';
import './QueryListResult.scss';
import { QueryResult } from '../QueryResult';


export type QueryListResultProps = {
	// types...
}

const QueryListResult: React.FC<QueryListResultProps> = ({ }) => {

	return (
		<>
			<div className="block">
				<QueryResult></QueryResult>
			</div>
			<div className="block">
				<QueryResult></QueryResult>
			</div>
			<div className="block">
				<QueryResult></QueryResult>
			</div>

			<div className="block">
				<QueryResult></QueryResult>
			</div>
			<div className="block">
				<QueryResult></QueryResult>
			</div>

		</>
	);
};

export default QueryListResult;
