import React, { useEffect, useState } from "react";
import "./QueryListResult.scss";
import { useSelector } from "react-redux";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";

export type QueryListResultProps = {
  // types...
};

interface Row {
  id: number;
  [key: string]: any;
}

interface Result {
  columns: GridColDef[];
  rows: GridRowsProp;
}

const QueryListResult: React.FC<QueryListResultProps> = ({}) => {
  const [listResult, setListResult] = useState<Result[]>([]); 
  const selectedTab = useSelector((state) => state.contextdb.selectedTab);
  const results = useSelector((state) => state.contextdb.contextDB[selectedTab].results);

  useEffect(() => {
    const list: Result[] = [];
    if (results && results.length > 0) {
      results.forEach((value, colIndex) => {
        const columns: GridColDef[] = results[0].headers.map(
          (header, index) => ({
            field: `col${index + 1}`,
            headerName: header,
          })
        );

        const rows: GridRowsProp = results[0].records.map((record, index) => {
          const row: Row = { id: index + 1 };
          record.forEach((value, colIndex) => {
            row[`col${colIndex + 1}`] = value === "NULL" ? null : value;
          });
          return row;
        });
        list.push({ columns: columns, rows: rows });        
      });

      setListResult(list);
    }
  }, [results]);

  return (
    <>
      {listResult.map((result) => (
        <div className="block">
          <DataGrid
            columns={result.columns}
            rows={result.rows}
            slots={{ toolbar: GridToolbar }}
          />
        </div>
      ))}
    </>
  );
};

export default QueryListResult;
