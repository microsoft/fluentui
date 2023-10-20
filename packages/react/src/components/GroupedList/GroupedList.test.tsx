import * as React from 'react';
import { mount } from 'enzyme';
import { SelectionMode, Selection } from '../../Selection';
import { GroupedList } from './GroupedList';
import { DetailsRow } from '../DetailsList/DetailsRow';
import { List } from '../../List';
import { GroupShowAll } from './GroupShowAll';
import { Link } from '../../Link';
import { GroupHeader } from './GroupHeader';
import { getTheme } from '../../Styling';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';
import type { IGroup } from './GroupedList.types';
import type { IColumn } from '../DetailsList/DetailsList.types';

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

    function _onRenderCell(nestingDepth: number, item: any, itemIndex: number): JSX.Element {
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
          selection={_selection}
          selectionMode={SelectionMode.multiple}
        />
      );
    }

    const wrapper = mount(
      <GroupedList items={_items} groups={_groups} onRenderCell={_onRenderCell} selection={_selection} />,
    );
    const listPage = wrapper.find(List).find('.ms-List-page').first();

    expect(listPage.key()).toBe('group0');

    wrapper.unmount();
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

    function _onRenderCell(nestingDepth: number, item: any, itemIndex: number): JSX.Element {
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
          selection={_selection}
          selectionMode={SelectionMode.multiple}
        />
      );
    }

    const wrapper = mount(
      <GroupedList items={_items} groups={_groups} onRenderCell={_onRenderCell} selection={_selection} />,
    );

    const listRows = wrapper.find(DetailsRow);
    expect(listRows).toHaveLength(3);

    wrapper.unmount();
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

    function _onRenderCell(nestingDepth: number, item: any, itemIndex: number): JSX.Element {
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
          selection={_selection}
          selectionMode={SelectionMode.multiple}
        />
      );
    }

    const wrapper = mount(
      <GroupedList items={_items} groups={_groups} onRenderCell={_onRenderCell} selection={_selection} />,
    );

    const listRows = wrapper.find(DetailsRow);
    expect(listRows).toHaveLength(3);

    expect(listRows.at(0).parent().key()).toBe('3');
    expect(listRows.at(1).parent().key()).toBe('4');
    expect(listRows.at(2).parent().key()).toBe('5');

    wrapper.unmount();
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

    function _onRenderCell(nestingDepth: number, item: any, itemIndex: number): JSX.Element {
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
          selection={_selection}
          selectionMode={SelectionMode.multiple}
        />
      );
    }

    const wrapper = mount(
      <GroupedList items={_items} groups={_groups} onRenderCell={_onRenderCell} selection={_selection} />,
    );

    const listRows = wrapper.find(DetailsRow);
    expect(listRows).toHaveLength(0);

    wrapper.unmount();
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

    function _onRenderCell(nestingDepth: number, item: any, itemIndex: number): JSX.Element {
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
          selection={_selection}
          selectionMode={SelectionMode.multiple}
        />
      );
    }

    const wrapper = mount(
      <GroupedList items={_items} groups={_groups} onRenderCell={_onRenderCell} selection={_selection} />,
    );

    let listRows = wrapper.find(DetailsRow);
    expect(listRows).toHaveLength(1);

    const groupShowAllElement = wrapper.find(GroupShowAll);

    groupShowAllElement.find(Link).simulate('click');

    listRows = wrapper.find(DetailsRow);
    expect(listRows).toHaveLength(3);

    wrapper.unmount();
  });

  it('renders group header with custom checkbox render', () => {
    const onRenderCheckboxMock = jest.fn();

    mount(
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

    function _onRenderCell(nestingDepth: number, item: { key: string }, itemIndex: number): JSX.Element {
      const id = `rendered-item-${item.key}`;
      return <div id={id} />;
    }

    const wrapper = mount(<GroupedList items={initialItems} groups={_groups} onRenderCell={_onRenderCell} />);
    expect(wrapper.contains(<div id="rendered-item-initial" />)).toEqual(true);

    wrapper.setProps({ items: nextItems });
    expect(wrapper.contains(<div id="rendered-item-changed" />)).toEqual(true);
    expect(wrapper.contains(<div id="rendered-item-initial" />)).toEqual(false);

    wrapper.setProps({ items: initialItems });
    expect(wrapper.contains(<div id="rendered-item-initial" />)).toEqual(true);
  });
});
