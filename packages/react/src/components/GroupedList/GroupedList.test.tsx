import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { getBySelector, getByAllSelector } from '../../common/testUtilities';
import { SelectionMode, Selection } from '../../Selection';
import { GroupedList } from './GroupedList';
import { DetailsRow } from '../DetailsList/DetailsRow';
import { GroupHeader } from './GroupHeader';
import { getTheme } from '../../Styling';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';
import type { IGroup } from './GroupedList.types';
import type { IColumn } from '../DetailsList/DetailsList.types';

/**
 * Helper function to render a cell for GroupedList tests
 */
function createOnRenderCell(selection: Selection) {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return function _onRenderCell(nestingDepth: number, item: any, itemIndex: number): JSX.Element {
    return (
      <DetailsRow
        columns={Object.keys(item)
          .slice(0, 2)
          .map((value): IColumn => {
            return {
              key: value,
              name: value,
              fieldName: value,
              minWidth: 300,
            };
          })}
        groupNestingDepth={nestingDepth}
        item={item}
        itemIndex={itemIndex}
        selection={selection}
        selectionMode={SelectionMode.multiple}
      />
    );
  };
}

describe('GroupedList', () => {
  isConformant({
    Component: GroupedList,
    displayName: 'GroupedList',
    componentPath: path.join(__dirname, 'GroupedList.ts'),
    requiredProps: {
      items: [],
      onRenderCell: () => {
        return <div />;
      },
    },
    // Problem: Ref is not supported
    // Solution: Convert to FunctionComponent and support using forwardRef
    disabledTests: ['component-handles-ref', 'component-has-root-ref'],
  });

  it("sets inner List page key to IGroup's key attribute for uniqueness", () => {
    const _selection = new Selection();
    const _items: Array<any> = [];
    const _groups: Array<IGroup> = [
      {
        count: 1,
        key: 'group0',
        name: 'group 0',
        startIndex: 0,
        level: 0,
        children: [],
      },
    ];

    const { container } = render(
      <GroupedList
        items={_items}
        groups={_groups}
        onRenderCell={createOnRenderCell(_selection)}
        selection={_selection}
      />,
    );

    const listPage = getBySelector(getBySelector(container, '[aria-label="group 0"]') as HTMLElement, '.ms-List-page');

    expect(listPage).not.toEqual(null);
  });

  it("renders the number of rows specified by a group's count when startIndex is zero", () => {
    const _selection = new Selection();
    const _items: Array<{ key: string }> = [{ key: '1' }, { key: '2' }, { key: '3' }];
    const _groups: Array<IGroup> = [
      {
        count: 3,
        hasMoreData: true,
        isCollapsed: false,
        key: 'group0',
        name: 'group 0',
        startIndex: 0,
        level: 0,
        children: [],
      },
    ];

    const { container } = render(
      <GroupedList
        items={_items}
        groups={_groups}
        onRenderCell={createOnRenderCell(_selection)}
        selection={_selection}
      />,
    );

    const detailsRows = getByAllSelector(container, '[data-automationid="DetailsRow"]');
    expect(detailsRows.length).toBe(3);
  });

  it("renders the number of rows specified by a group's count when startIndex is not zero", () => {
    const _selection = new Selection();
    const _items: Array<{ key: string }> = [{ key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }];
    const _groups: Array<IGroup> = [
      {
        count: 3,
        hasMoreData: true,
        isCollapsed: false,
        key: 'group0',
        name: 'group 0',
        startIndex: 2,
        level: 0,
        children: [],
      },
    ];

    const { container } = render(
      <GroupedList
        items={_items}
        groups={_groups}
        onRenderCell={createOnRenderCell(_selection)}
        selection={_selection}
      />,
    );

    const detailsRows = getByAllSelector(container, '[data-automationid="DetailsRow"]');
    expect(detailsRows.length).toBe(3);

    // Check correct items are rendered based on startIndex
    // We can check data attributes or inner text to verify the correct rows
    const detailsRowsContents = Array.from(detailsRows).map(
      row => row.querySelector('[data-automation-key="key"]')?.textContent,
    );

    expect(detailsRowsContents).toEqual(['3', '4', '5']);
  });

  it('renders no rows if group is collapsed', () => {
    const _selection = new Selection();
    const _items: Array<{ key: string }> = [{ key: '1' }, { key: '2' }, { key: '3' }];
    const _groups: Array<IGroup> = [
      {
        count: 3,
        hasMoreData: true,
        isCollapsed: true,
        key: 'group0',
        name: 'group 0',
        startIndex: 0,
        level: 0,
        children: [],
      },
    ];

    const { container } = render(
      <GroupedList
        items={_items}
        groups={_groups}
        onRenderCell={createOnRenderCell(_selection)}
        selection={_selection}
      />,
    );

    const detailsRows = getByAllSelector(container, '[data-automationid="DetailsRow"]');
    expect(detailsRows.length).toBe(0);
  });

  // eslint-disable-next-line @fluentui/max-len
  it('renders the specified count of rows if "Show All" is to be displayed and all rows once "Show All" is clicked', () => {
    const _selection = new Selection();
    const _items: Array<{ key: string }> = [{ key: '1' }, { key: '2' }, { key: '3' }];
    const _groups: Array<IGroup> = [
      {
        count: 1,
        hasMoreData: true,
        isCollapsed: false,
        key: 'group0',
        name: 'group 0',
        startIndex: 0,
        level: 0,
      },
    ];

    const { container } = render(
      <GroupedList
        items={_items}
        groups={_groups}
        onRenderCell={createOnRenderCell(_selection)}
        selection={_selection}
      />,
    );

    // Initially we should see only one row (count: 1)
    let detailsRows = getByAllSelector(container, '[data-automationid="DetailsRow"]');
    expect(detailsRows.length).toBe(1);

    // Find the "Show All" link and click it
    const showAllLink = getBySelector(container, '.ms-GroupShowAll > .ms-Link') as HTMLAnchorElement;

    fireEvent.click(showAllLink);

    // After clicking "Show All", we should see all 3 rows
    detailsRows = getByAllSelector(container, '[data-automationid="DetailsRow"]');
    expect(detailsRows.length).toBe(3);
  });

  it('renders group header with custom checkbox render', () => {
    const onRenderCheckboxMock = jest.fn();

    render(
      <GroupHeader
        selectionMode={SelectionMode.multiple}
        onRenderGroupHeaderCheckbox={onRenderCheckboxMock}
        isCollapsedGroupSelectVisible={true}
        group={{
          count: 1,
          hasMoreData: true,
          isCollapsed: false,
          key: 'group0',
          name: 'group 0',
          startIndex: 0,
          level: 0,
        }}
      />,
    );

    expect(onRenderCheckboxMock).toHaveBeenCalledTimes(1);
    expect(onRenderCheckboxMock.mock.calls[0][0]).toEqual({ checked: false, theme: getTheme() });
  });

  it('re-renders when items change back to the initial items', () => {
    const initialItems: Array<{ key: string }> = [{ key: 'initial' }];
    const nextItems: Array<{ key: string }> = [{ key: 'changed' }];
    const _groups: Array<IGroup> = [
      {
        count: 1,
        hasMoreData: true,
        isCollapsed: false,
        key: 'group0',
        name: 'group 0',
        startIndex: 0,
        level: 0,
      },
    ];

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    function _onRenderCell(nestingDepth: number, item: { key: string }, itemIndex: number): JSX.Element {
      const id = `rendered-item-${item.key}`;
      return <div id={id} data-testid={id} />;
    }

    const { container, rerender } = render(
      <GroupedList items={initialItems} groups={_groups} onRenderCell={_onRenderCell} />,
    );

    expect(container.querySelector('#rendered-item-initial')).not.toBeNull();

    rerender(<GroupedList items={nextItems} groups={_groups} onRenderCell={_onRenderCell} />);
    expect(container.querySelector('#rendered-item-changed')).not.toBeNull();
    expect(container.querySelector('#rendered-item-initial')).toBeNull();

    rerender(<GroupedList items={initialItems} groups={_groups} onRenderCell={_onRenderCell} />);
    expect(container.querySelector('#rendered-item-initial')).not.toBeNull();
  });
});
