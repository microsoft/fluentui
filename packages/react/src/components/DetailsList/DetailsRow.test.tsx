import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { DetailsList } from './DetailsList';
import { CheckboxVisibility } from './DetailsList.types';
import { SelectionMode, Selection } from '../../Selection';
import { DetailsRow } from './DetailsRow';
import { getTheme } from '../../Styling';
import type { IDetailsRowProps } from './DetailsRow.types';
import type { IDetailsListProps, IColumn } from './DetailsList.types';

const _columns: IColumn[] = [
  {
    key: 'key',
    minWidth: 8,
    name: 'key',
  },
  {
    key: 'name',
    minWidth: 8,
    name: 'name',
  },
  {
    key: 'value',
    minWidth: 8,
    name: 'value',
  },
];

// Populate mock items for testing
function mockItems(count: number): any[] {
  const items = [];

  for (let i = 0; i < count; i++) {
    items.push({
      key: i,
      name: 'Item ' + i,
      value: i,
    });
  }

  return items;
}

const renderRow = (row: IDetailsRowProps) => <div>{row.item.name}</div>;

const mockProps: IDetailsListProps = {
  items: mockItems(5),
  columns: _columns,
  onRenderRow: renderRow,
  skipViewportMeasures: true,
  onShouldVirtualize: () => false,
};

describe('DetailsRow', () => {
  it('renders details list row correctly', () => {
    const component = renderer.create(<DetailsList {...mockProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders details list row with multiple selections correctly', () => {
    const component = renderer.create(<DetailsList {...mockProps} selectionMode={SelectionMode.multiple} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders details list row with one row selected correctly', () => {
    const selection = new Selection();
    selection.setKeySelected('0', true, true);

    const component = renderer.create(
      <DetailsList {...mockProps} selectionMode={SelectionMode.multiple} selection={selection} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders details list row with all rows selected correctly', () => {
    const selection = new Selection();
    selection.setAllSelected(true);

    const component = renderer.create(
      <DetailsList {...mockProps} selectionMode={SelectionMode.multiple} selection={selection} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders details list row with correct row index by default', () => {
    const component = renderer.create(<DetailsList {...mockProps} onRenderRow={undefined} />);

    const rows = component.root.findAllByType(DetailsRow);

    expect(rows[0].props.flatIndexOffset).toBe(2);
    expect(rows[0].findByProps({ role: 'row' }).props['aria-rowindex']).toBe(2);
    expect(rows[4].findByProps({ role: 'row' }).props['aria-rowindex']).toBe(6);
  });

  it('renders details list row with correct row index with no headers', () => {
    const component = renderer.create(<DetailsList {...mockProps} onRenderRow={undefined} isHeaderVisible={false} />);

    const rows = component.root.findAllByType(DetailsRow);

    expect(rows[0].props.flatIndexOffset).toBe(1);
    expect(rows[0].findByProps({ role: 'row' }).props['aria-rowindex']).toBe(1);
    expect(rows[4].findByProps({ role: 'row' }).props['aria-rowindex']).toBe(5);
  });

  it('renders details list row with checkbox visible always correctly', () => {
    const component = renderer.create(
      <DetailsRow
        item={mockProps.items[0]}
        itemIndex={0}
        columns={_columns}
        checkboxVisibility={CheckboxVisibility.always}
        selectionMode={SelectionMode.single}
        selection={new Selection()}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders details list row with custom checkbox render', () => {
    const onRenderCheckboxMock = jest.fn();

    renderer.create(
      <DetailsRow
        item={mockProps.items[0]}
        itemIndex={0}
        columns={_columns}
        checkboxVisibility={CheckboxVisibility.always}
        selectionMode={SelectionMode.single}
        selection={new Selection()}
        onRenderDetailsCheckbox={onRenderCheckboxMock}
      />,
    );

    expect(onRenderCheckboxMock).toHaveBeenCalledWith({ checked: false, theme: getTheme() }, expect.any(Function));
  });
});
