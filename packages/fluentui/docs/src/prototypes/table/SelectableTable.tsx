import {
  gridCellWithFocusableElementBehavior,
  gridNestedBehavior,
  gridCellBehavior,
  gridRowBehavior,
} from '@fluentui/accessibility';
import { Table, Checkbox, Text } from '@fluentui/react-northstar';
import * as React from 'react';

interface SelectableTableAction {
  type: 'TOGGLE_ITEM' | 'TOGGLE_ALL';
  checked: boolean;
  itemKey?: string;
}

interface SelectableTableState {
  allRowsSelected: boolean;
  selectedRows: {};
}

const selectableTableStateReducer: React.Reducer<SelectableTableState, SelectableTableAction> = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_ITEM': {
      const selectedRows = { ...state.selectedRows };
      selectedRows[action.itemKey] = action.checked;
      return { allRowsSelected: !Object.values(selectedRows).includes(false), selectedRows };
    }
    case 'TOGGLE_ALL': {
      const selectedRows = { ...state.selectedRows };
      Object.keys(selectedRows).forEach(key => (selectedRows[key] = action.checked));
      return { allRowsSelected: action.checked, selectedRows };
    }
    default:
      throw new Error(`Action ${action.type} is not supported`);
  }
};

const SelectableTable = () => {
  const rows = [
    {
      key: '1',
      items: [
        { key: '1-1', content: 'Test name 1' },
        { key: '1-2', content: 'General' },
        { key: '1-3', content: 'Office' },
      ],
    },
    {
      key: '2',
      items: [
        { key: '2-1', content: 'Test name 2' },
        { key: '2-2', content: 'Commander' },
        { key: '2-3', content: 'Office' },
      ],
    },
    {
      key: '3',
      items: [
        { key: '3-1', content: 'Test name 3' },
        { key: '3-2', content: 'Surgeon' },
        { key: '3-3', content: 'Field' },
      ],
    },
  ];
  const headers = [
    { title: 'Name', key: 'name', name: 'name' },
    { title: 'Title', key: 'title', name: 'title' },
    { title: 'Location', key: 'location', name: 'location' },
  ];

  const initialState: SelectableTableState = {
    allRowsSelected: false,
    selectedRows: rows.reduce((selectedRows, row) => {
      selectedRows[row.key] = false;
      return selectedRows;
    }, {}),
  };
  const [state, dispatch] = React.useReducer(selectableTableStateReducer, initialState);

  return (
    <>
      <Table aria-label="Selectable table" accessibility={gridNestedBehavior}>
        <Table.Row header accessibility={gridRowBehavior}>
          <Table.Cell
            accessibility={gridCellWithFocusableElementBehavior}
            content={
              <Checkbox
                title="Select all"
                checked={state.allRowsSelected}
                onClick={(event, props) => dispatch({ type: 'TOGGLE_ALL', checked: props.checked })}
              ></Checkbox>
            }
          />
          {headers.map(item => (
            <Table.Cell content={item.title} accessibility={gridCellBehavior} key={item.key} />
          ))}
        </Table.Row>
        {rows.map(row => {
          return (
            <Table.Row accessibility={gridRowBehavior} selected={state.selectedRows[row.key]} key={row.key}>
              <Table.Cell
                accessibility={gridCellWithFocusableElementBehavior}
                content={
                  <Checkbox
                    title="Select me"
                    checked={state.selectedRows[row.key]}
                    onClick={(event, props) =>
                      dispatch({ type: 'TOGGLE_ITEM', checked: props.checked, itemKey: row.key })
                    }
                  ></Checkbox>
                }
              />
              {row.items.map(item => (
                <Table.Cell content={item.content} accessibility={gridCellBehavior} key={item.key} />
              ))}
            </Table.Row>
          );
        })}
      </Table>
      <Text
        content={`Selected rows: ${Object.keys(state.selectedRows).filter(x => Boolean(state.selectedRows[x])).length}`}
      />
    </>
  );
};

export default SelectableTable;
