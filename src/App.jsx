import React, { useEffect, useState } from "react";
import Papa from "papaparse";

import StickyHeadTable from "./components/StickyTable";

const TableDisplay = () => {
  const [tableData, setTableData] = useState([]);
  const [processedValues, setProcessedValues] = useState([]);

  useEffect(() => {
    Papa.parse("${process.env.PUBLIC_URL}/data.csv", {
      download: true,
      header: true,
      complete: (results) => {
        const data = results.data;
        setTableData(data);

        const valueMap = {};
        data.forEach((row) => {
          valueMap[row["Index #"]] = parseInt(row["Value"]);
        });

        // Compute values for Table 2
        const alpha = valueMap["A5"] + valueMap["A20"];
        const beta = Math.floor(valueMap["A15"] / valueMap["A7"]); // Ensure integer
        const charlie = valueMap["A13"] * valueMap["A12"];

        setProcessedValues([
          { category: "alpha", value: alpha },
          { category: "beta", value: beta },
          { category: "charlie", value: charlie },
        ]);
      },
    });
  }, []);

  return (
    <div className="container" style={styles.container}>
      <div className="wrapper">
        <h2 className="title" style={styles.title}>
          Table 1
        </h2>
        <StickyHeadTable
          rows={tableData}
          columns={[
            { id: "Index #", label: "Index", minWidth: 1000 },
            { id: "Value", label: "Value", minWidth: 1000 },
          ]}
        ></StickyHeadTable>
        {/* <table className="table">
          <thead>
            <tr>
              <th className="tableHeader" style={styles.tableHeader}>
                Index #
              </th>
              <th className="tableHeader" style={styles.tableHeader}>
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="tableData" style={styles.tableData}>
                  {row["Index #"]}
                </td>
                <td className="tableData" style={styles.tableData}>
                  {row["Value"]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>  */}
      </div>
      <div className="wrapper">
        <h2 className="title" style={styles.title}>
          Table 2
        </h2>
        <StickyHeadTable
          rows={processedValues}
          columns={[
            { id: "category", label: "Category", minWidth: 500 },
            { id: "value", label: "Value", minWidth: 250 },
          ]}
        ></StickyHeadTable>

        {/* <table className="table">
          <thead>
            <tr>
              <th className="tableHeader" style={styles.tableHeader}>
                Category
              </th>
              <th className="tableHeader" style={styles.tableHeader}>
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tableData" style={styles.tableData}>
                Alpha
              </td>
              <td className="tableData" style={styles.tableData}>
                {processedValues.alpha}
              </td>
            </tr>
            <tr>
              <td className="tableData" style={styles.tableData}>
                Beta
              </td>
              <td className="tableData" style={styles.tableData}>
                {processedValues.beta}
              </td>
            </tr>
            <tr>
              <td className="tableData" style={styles.tableData}>
                Charlie
              </td>
              <td className="tableData" style={styles.tableData}>
                {processedValues.charlie}
              </td>
            </tr>
          </tbody>
        </table> */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  title: {
    fontSize: "2em",
    textAlign: "center ",
    color:"black"
  },
//   tableHeader: {
//     border: "2px solid white",
//     padding: "10px 50px",
//   },
//   tableData: {
//     border: "2px solid white",
//     padding: "10px",
//   },
};
export default TableDisplay;
