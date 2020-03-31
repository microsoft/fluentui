import {
  gridCellWithFocusableElementBehavior,
  gridNestedBehavior,
  gridCellBehavior,
  gridRowBehavior,
} from '@fluentui/accessibility';
import { Table, Checkbox, Box } from '@fluentui/react-northstar';
import * as React from 'react';

interface SelectableTableAction {
  type: 'TOGGLE_ITEM' | 'TOGGLE_ALL';
  checked: boolean;
  itemIndex?: number;
}

interface SelectableTableState {
  allRowsSelected: boolean;
  selectedRows: boolean[];
}

const selectableTableStateReducer: React.Reducer<SelectableTableState, SelectableTableAction> = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_ITEM': {
      const selectedRows = state.selectedRows.slice(0);
      selectedRows[action.itemIndex] = action.checked;
      return { allRowsSelected: !selectedRows.includes(false), selectedRows };
    }
    case 'TOGGLE_ALL': {
      const selectedRows = state.selectedRows.map(() => action.checked);
      return { allRowsSelected: action.checked, selectedRows };
    }
    default:
      throw new Error(`Action ${action.type} is not supported`);
  }
};

const SelectableTable = () => {
  const rows = [
    ['Test name 1', 'General', 'Office'],
    ['Test name 2', 'Commander', 'Office'],
    ['Test name 3', 'Other', 'Field'],
  ];
  const headers = [
    { title: 'Name', key: 'name', name: 'name' },
    { title: 'Title', key: 'title', name: 'title' },
    { title: 'Location', key: 'location', name: 'location' },
  ];

  const initialState: SelectableTableState = {
    allRowsSelected: false,
    selectedRows: Array(rows.length).fill(false),
  };
  const [state, dispatch] = React.useReducer(selectableTableStateReducer, initialState);

  return (
    <>
      <Table aria-label="Selectable table" accessibility={gridNestedBehavior}>
        <Table.Row header key="header" accessibility={gridRowBehavior}>
          <Table.Cell
            accessibility={gridCellWithFocusableElementBehavior}
            key="header-0"
            content={
              <Checkbox
                title="Select all"
                checked={state.allRowsSelected}
                onClick={(event, props) => dispatch({ type: 'TOGGLE_ALL', checked: props.checked })}
              ></Checkbox>
            }
          />
          {headers.map((item, index) => (
            <Table.Cell content={item.title} id={item.key} accessibility={gridCellBehavior} key={`header-${index}`} />
          ))}
        </Table.Row>
        {rows.map((row, index) => {
          return (
            <Table.Row
              key={`selectableTable${index}`}
              accessibility={gridRowBehavior}
              aria-selected={state.selectedRows[index]}
            >
              <Table.Cell
                accessibility={gridCellWithFocusableElementBehavior}
                key={`selectableTable${index}-0`}
                content={
                  <Checkbox
                    title="Select me"
                    checked={state.selectedRows[index]}
                    onClick={(event, props) =>
                      dispatch({ type: 'TOGGLE_ITEM', checked: props.checked, itemIndex: index })
                    }
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
      <Box content={`Selected rows: ${state.selectedRows.filter(Boolean).length}`} />
    </>
  );
};

export default SelectableTable;
