"use client";
import React from 'react';
import './TabQueryState.scss';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { QueryEditor } from '../QueryEditor';
import { QueryListResult } from '../QueryListResult';
import { QueryControls } from '../QueryControls';

export type QuerySplitterProps = {
	/* */
}

//const TabQueryState: React.FC<QuerySplitterProps> = (props: QuerySplitterProps) => {
const TabQueryState: React.FC<QuerySplitterProps> = () => {
	
	return (
		<>
			<Splitter style={{ height: 'calc(100vh - 150px)', overflow: "auto" }} layout="vertical"  >
				<SplitterPanel className="splitterdivisor notoverflow align-items-top justify-content-left" size={40} minSize={5}>
					<QueryControls></QueryControls>
					<QueryEditor></QueryEditor>
				</SplitterPanel>
				<SplitterPanel className="splitterdivisor align-items-top justify-content-center sql-back" size={60} minSize={20}>
					<QueryListResult></QueryListResult>
				</SplitterPanel>
			</Splitter>
		</>
	);
};

export default TabQueryState;
