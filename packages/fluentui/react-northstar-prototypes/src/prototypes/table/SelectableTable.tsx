import {
  gridCellWithFocusableElementBehavior,
  gridNestedBehavior,
  gridCellBehavior,
  gridRowBehavior,
} from '@fluentui/accessibility';
import { Table, Checkbox, Text } from '@fluentui/react-northstar';
import * as React from 'react';
import * as _ from 'lodash';

interface SelectableTableAction {
  type: 'TOGGLE_ITEM' | 'TOGGLE_ALL';
  checked: boolean;
  itemKey?: string;
}

interface SelectableTableState {
  rows: Record<string, boolean>;
}

const selectableTableStateReducer: React.Reducer<SelectableTableState, SelectableTableAction> = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_ITEM': {
      return { rows: { ...state.rows, [action.itemKey]: action.checked } };
    }
    case 'TOGGLE_ALL': {
      return { rows: _.mapValues(state.rows, () => action.checked) };
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
    rows: rows.reduce((rows, row) => {
      rows[row.key] = false;
      return rows;
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
                checked={_.every(state.rows)}
                onClick={(event, props) => dispatch({ type: 'TOGGLE_ALL', checked: props.checked })}
              />
            }
          />
          {headers.map(item => (
            <Table.Cell content={item.title} accessibility={gridCellBehavior} key={item.key} />
          ))}
        </Table.Row>
        {rows.map(row => {
          return (
            <Table.Row accessibility={gridRowBehavior} selected={state.rows[row.key]} key={row.key}>
              <Table.Cell
                accessibility={gridCellWithFocusableElementBehavior}
                content={
                  <Checkbox
                    title="Select me"
                    checked={state.rows[row.key]}
                    onClick={(event, props) =>
                      dispatch({ type: 'TOGGLE_ITEM', checked: props.checked, itemKey: row.key })
                    }
                  />
                }
              />
              {row.items.map(item => (
                <Table.Cell content={item.content} accessibility={gridCellBehavior} key={item.key} />
              ))}
            </Table.Row>
          );
        })}
      </Table>
      <Text content={`Selected rows: ${_.filter(state.rows).length}`} />
    </>
  );
};

export default SelectableTable;
