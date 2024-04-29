
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './QueryResult.scss';
import { ProductService } from '../../services/mock';


export type QueryResultProps = {
	// types...
}

const QueryResult: React.FC<QueryResultProps> = ({ }) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		ProductService.getProductsMini().then(data => setProducts(data));
	}, []);
	return (
		<div className='queryresult'>
			<DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
				<Column field="code" header="Code"></Column>
				<Column field="name" header="Name"></Column>
				<Column field="category" header="Category"></Column>
				<Column field="quantity" header="Quantity"></Column>
			</DataTable>
		</div>
	);
};

export default QueryResult;
