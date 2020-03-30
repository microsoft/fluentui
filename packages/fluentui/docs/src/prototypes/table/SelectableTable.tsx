import {
  gridCellWithFocusableElementBehavior,
  gridNestedBehavior,
  gridCellBehavior,
  gridRowBehavior,
} from '@fluentui/accessibility';
import { Table, Checkbox, Box } from '@fluentui/react-northstar';
import * as React from 'react';

const SelectableTable = () => {
  const rows = [
    ['Test name 1', 'General', 'Office'],
    ['Test name 2', 'Commander', 'Office'],
    ['Test name 3', 'Other', 'Field'],
  ];

  const rowsLength = rows.length;

  const [selectedRows, setSelectedRows] = React.useState(Array(rowsLength).fill(false));
  const [allRowsSelected, setAllRowsSelected] = React.useState(false);

  const header = [
    { title: 'Name', key: 'name', name: 'name' },
    { title: 'Title', key: 'title', name: 'title' },
    { title: 'Location', key: 'location', name: 'location' },
  ];
  const handleSelectAll = checked => {
    setAllRowsSelected(checked);
    const updateSelectedRows = selectedRows.slice(0);
    updateSelectedRows.forEach((item, index) => {
      updateSelectedRows[index] = checked;
    });
    setSelectedRows(updateSelectedRows);
  };

  const handleRowSelected = (index, checked) => {
    const updateSelectedRows = selectedRows.slice(0);
    updateSelectedRows[index] = checked;
    setSelectedRows(updateSelectedRows);
    setAllRowsSelected(updateSelectedRows.filter(item => item === false).length === 0);
  };

  return (
    <>
      <Table aria-label={'Selectable table'} accessibility={gridNestedBehavior}>
        <Table.Row header key="header" accessibility={gridRowBehavior}>
          <Table.Cell
            accessibility={gridCellWithFocusableElementBehavior}
            key="header-0"
            content={
              <Checkbox
                title="Select all"
                checked={allRowsSelected}
                onClick={(event, props) => handleSelectAll(props.checked)}
              ></Checkbox>
            }
          ></Table.Cell>
          {header.map((item, index) => (
            <Table.Cell content={item.title} id={item.key} accessibility={gridCellBehavior} key={`header-${index}`} />
          ))}
        </Table.Row>
        {rows.map((row, index) => {
          return (
            <Table.Row
              key={`selectableTable${index}`}
              accessibility={gridRowBehavior}
              aria-selected={selectedRows[index]}
            >
              <Table.Cell
                accessibility={gridCellWithFocusableElementBehavior}
                key={`selectableTable${index}-0`}
                content={
                  <Checkbox
                    title="Select me"
                    checked={selectedRows[index] || allRowsSelected}
                    onClick={(event, props) => handleRowSelected(index, props.checked)}
                  ></Checkbox>
                }
              />
              {row.map((content, key) => (
                <Table.Cell content={content} accessibility={gridCellBehavior} key={`selectableTable${index}-${key}`} />
              ))}
            </Table.Row>
          );
        })}
      </Table>
      <Box content={`Selected rows: ${selectedRows.filter(item => item === true).length}`} />
    </>
  );
};

export default SelectableTable;
