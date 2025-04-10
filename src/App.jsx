import React, { useEffect, useState } from 'react';

const App = () => {
  const [table1, setTable1] = useState([]);
  const [table2, setTable2] = useState([]);

  useEffect(() => {
    fetch('/data.csv')
      .then(response => response.text())
      .then(text => {
        const rows = text.trim().split('\n').slice(1); // skip header
        const map = {};

        rows.forEach(row => {
          const [index, value] = row.split(',');
          map[index.trim()] = parseInt(value.trim(), 10);
        });

        
        const tableOne = [
          { category: 'Alpha', value: 'A5 + A20' },
          { category: 'Beta', value: 'A15 / A7' },
          { category: 'Charlie', value: 'A13 * A12' },
        ];

        
        const tableTwo = [
          {
            category: 'Alpha',
            value: map['A5'] + map['A20'],
          },
          {
            category: 'Beta',
            value: Math.floor(map['A15'] / map['A7']),
          },
          {
            category: 'Charlie',
            value: map['A13'] * map['A12'],
          },
        ];

        setTable1(tableOne);
        setTable2(tableTwo);
      })
      .catch(error => console.error('Failed to load CSV:', error));
  }, []);

  const renderTable = (title, data) => (
    <>
      <h2>{title}</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.category}>
              <td>{row.category}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      {renderTable('Table 1', table1)}
      <div style={{ marginTop: '2rem' }} />
      {renderTable('Table 2', table2)}
    </div>
  );
};

export default App;
