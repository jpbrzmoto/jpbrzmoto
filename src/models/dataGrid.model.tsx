import { GridColDef, GridRowsProp } from "@mui/x-data-grid";

export interface Row {
    id: number;
    [key: string]: any;
  }
  
export interface TableResult {
    columns: GridColDef[];
    rows: GridRowsProp;
    dataBase: string;
    dataSource: string;
  }
  