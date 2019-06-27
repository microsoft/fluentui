import * as React from 'react';
import { mount } from 'enzyme';
import { SelectionMode, Selection } from '../../utilities/selection/index';
import { GroupedList } from './GroupedList';
import { DetailsRow } from '../DetailsList/DetailsRow';
import { IGroup } from './GroupedList.types';
import { IColumn } from '../DetailsList/DetailsList.types';
import { List } from '../List/List';

describe('GroupedList', () => {
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
        children: []
      }
    ];

    function _onRenderCell(nestingDepth: number, item: any, itemIndex: number): JSX.Element {
      return (
        <DetailsRow
          columns={Object.keys(item)
            .slice(0, 2)
            .map(
              (value): IColumn => {
                return {
                  key: value,
                  name: value,
                  fieldName: value,
                  minWidth: 300
                };
              }
            )}
          groupNestingDepth={nestingDepth}
          item={item}
          itemIndex={itemIndex}
          selection={_selection}
          selectionMode={SelectionMode.multiple}
        />
      );
    }

    const wrapper = mount(<GroupedList items={_items} groups={_groups} onRenderCell={_onRenderCell} selection={_selection} />);
    const listPage = wrapper
      .find(List)
      .find('.ms-List-page')
      .first();

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
        children: []
      }
    ];

    function _onRenderCell(nestingDepth: number, item: any, itemIndex: number): JSX.Element {
      return (
        <DetailsRow
          columns={Object.keys(item)
            .slice(0, 2)
            .map(
              (value): IColumn => {
                return {
                  key: value,
                  name: value,
                  fieldName: value,
                  minWidth: 300
                };
              }
            )}
          groupNestingDepth={nestingDepth}
          item={item}
          itemIndex={itemIndex}
          selection={_selection}
          selectionMode={SelectionMode.multiple}
        />
      );
    }

    const wrapper = mount(<GroupedList items={_items} groups={_groups} onRenderCell={_onRenderCell} selection={_selection} />);

    const listRows = wrapper.find(DetailsRow);
    expect(listRows.length).toBe(3);

    wrapper.unmount();
  });

  it("renders the number of rows specified by a group's count when startIndex is not zero", () => {
    const _selection = new Selection();
    const _items: Array<{ key: string }> = [{ key: '1' }, { key: '2' }, { key: '3' }];
    const _groups: Array<IGroup> = [
      {
        count: 3,
        hasMoreData: true,
        isCollapsed: false,
        key: 'group0',
        name: 'group 0',
        startIndex: 2,
        level: 0,
        children: []
      }
    ];

    function _onRenderCell(nestingDepth: number, item: any, itemIndex: number): JSX.Element {
      return (
        <DetailsRow
          columns={Object.keys(item)
            .slice(0, 2)
            .map(
              (value): IColumn => {
                return {
                  key: value,
                  name: value,
                  fieldName: value,
                  minWidth: 300
                };
              }
            )}
          groupNestingDepth={nestingDepth}
          item={item}
          itemIndex={itemIndex}
          selection={_selection}
          selectionMode={SelectionMode.multiple}
        />
      );
    }

    const wrapper = mount(<GroupedList items={_items} groups={_groups} onRenderCell={_onRenderCell} selection={_selection} />);

    const listRows = wrapper.find(DetailsRow);
    expect(listRows.length).toBe(1);

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
        children: []
      }
    ];

    function _onRenderCell(nestingDepth: number, item: any, itemIndex: number): JSX.Element {
      return (
        <DetailsRow
          columns={Object.keys(item)
            .slice(0, 2)
            .map(
              (value): IColumn => {
                return {
                  key: value,
                  name: value,
                  fieldName: value,
                  minWidth: 300
                };
              }
            )}
          groupNestingDepth={nestingDepth}
          item={item}
          itemIndex={itemIndex}
          selection={_selection}
          selectionMode={SelectionMode.multiple}
        />
      );
    }

    const wrapper = mount(<GroupedList items={_items} groups={_groups} onRenderCell={_onRenderCell} selection={_selection} />);

    const listRows = wrapper.find(DetailsRow);
    expect(listRows.length).toBe(0);

    wrapper.unmount();
  });
});
