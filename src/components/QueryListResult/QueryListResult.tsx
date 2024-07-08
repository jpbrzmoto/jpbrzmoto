import React, { useEffect, useState } from "react";
import "./QueryListResult.scss";
import { useSelector } from "react-redux";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import emptyViewResults from "../../assets/illustration/empty-view-results.svg"; // ajusta la ruta según la ubicación de tu imagen

import { Row } from "primereact/row";
import { TableResult } from "../../models/dataGrid.model";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Badge } from "@mui/material";
export type QueryListResultProps = {
  // types...
};

const QueryListResult: React.FC<QueryListResultProps> = React.memo(({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const selectedTab = useSelector((state) => state.contextdb.selectedTab);
  const results = useSelector(
    (state) => state.contextdb.contextDB[selectedTab].results
  );
  const [listResult, setListResult] = useState<TableResult[]>([]);

  useEffect(() => {
    setResults();
  }, [results]);

  const setResults = () => {
    setIsLoading(true);
    const list: TableResult[] = [];
    if (results && results.length > 0) {
      results.forEach((value, i) => {
        const columns: GridColDef[] = results[i].headers.map(
          (header, index) => ({
            field: `col${index + 1}`,
            headerName: header,
          })
        );

        const rows: GridRowsProp = results[i].records.map((record, index) => {
          const row: Row = { id: index };
          record.forEach((value, colIndex) => {
            row[`col${colIndex + 1}`] = value === "NULL" ? null : value;
          });
          return row;
        });

        list.push({
          columns: columns,
          rows: rows,
          dataBase: value.dataBase,
          dataSource: value.dataSource,
        });
      });

      setIsLoading(false);
    } else setIsLoading(false);

    setListResult(list);
  };

  return (
    <>
      {listResult?.length == 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <img
            src={emptyViewResults}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            alt="Empty view results"
          />
        </div>
      )}

      {listResult?.length > 0 &&
        listResult.map((result, index) => (
          <div className="css-ta1zu1">
            <Accordion key={index} style={{ width: "90%" }} defaultExpanded={index===0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Badge
                  badgeContent={result.rows?.length}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  max={10000}
                  showZero
                  color="success"
                >
                  {result.dataBase}
                </Badge>
              </AccordionSummary>
              <AccordionDetails>
                <div className="block css-ta0zu1">
                  <DataGrid
                    initialState={{
                      density: "compact",
                    }}
                    columns={result.columns}
                    rows={result.rows}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                      loadingOverlay: {
                        variant: "linear-progress",
                        noRowsVariant: "skeleton",
                      },
                    }}
                    loading={isLoading}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
    </>
  );
});

export default QueryListResult;
