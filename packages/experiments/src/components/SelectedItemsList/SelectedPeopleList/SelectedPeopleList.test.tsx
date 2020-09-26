import * as React from 'react';
import { create } from 'react-test-renderer';

import { people } from '@uifabric/example-data';
import { mount } from 'enzyme';
import {
  SelectedPeopleList,
  ISelectedPeopleList,
  SelectedPersona,
  ISelectedItemProps,
  ItemWithContextMenu,
  TriggerOnContextMenu,
} from '../index';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { groupOne } from '@uifabric/example-data';

describe('SelectedPeopleList', () => {
  it('renders nothing if nothing is provided', () => {
    const pickerRef: React.RefObject<ISelectedPeopleList> = React.createRef();
    const rendered = create(<SelectedPeopleList ref={pickerRef} />);
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('renders personas that are passed in', () => {
    const pickerRef: React.RefObject<ISelectedPeopleList> = React.createRef();
    const rendered = create(
      <SelectedPeopleList selectedItems={[{ text: 'Person A' }, { text: 'Person B' }]} ref={pickerRef} />,
    );

    const personANodes = rendered.root.findAll(x => !!x.children.length && x.children.indexOf('Person A') !== -1);
    const personBNodes = rendered.root.findAll(x => !!x.children.length && x.children.indexOf('Person B') !== -1);
    expect(personANodes.length).toEqual(1);
    expect(personBNodes.length).toEqual(1);

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('renders personas that are passed in as default', () => {
    const pickerRef: React.RefObject<ISelectedPeopleList> = React.createRef();
    const rendered = create(
      <SelectedPeopleList defaultSelectedItems={[{ text: 'Person A' }, { text: 'Person B' }]} ref={pickerRef} />,
    );

    const personANodes = rendered.root.findAll(x => !!x.children.length && x.children.indexOf('Person A') !== -1);
    const personBNodes = rendered.root.findAll(x => !!x.children.length && x.children.indexOf('Person B') !== -1);
    expect(personANodes.length).toEqual(1);
    expect(personBNodes.length).toEqual(1);

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('remove personas', () => {
    const onItemsRemoved = jest.fn();
    const wrapper = mount(
      <SelectedPeopleList
        key="normal"
        removeButtonAriaLabel="Remove"
        selectedItems={[people[0]]}
        onItemsRemoved={onItemsRemoved}
      />,
    );

    wrapper
      .find('button.ms-PickerItem-removeButton')
      .at(1)
      .simulate('click');

    expect(onItemsRemoved).toBeCalledTimes(1);
  });

  it('group expansion as one of the items in the list', () => {
    const _getExpandedGroupItems = (item: IPersonaProps): IPersonaProps[] => {
      switch (item.text) {
        case 'Group One':
          return groupOne;
        default:
          return [];
      }
    };
    const _canExpandItem = (item: IPersonaProps): boolean => {
      return item.text !== undefined && item.text.indexOf('Group') !== -1;
    };
    const SelectedItem = (props: ISelectedItemProps<IPersonaProps>) => (
      <SelectedPersona canExpand={_canExpandItem} getExpandedItems={_getExpandedGroupItems} {...props} />
    );

    const onItemsRemoved = jest.fn();
    const wrapper = mount(
      <SelectedPeopleList
        key="normal"
        removeButtonAriaLabel="Remove"
        selectedItems={[people[40]]}
        onItemsRemoved={onItemsRemoved}
        onRenderItem={SelectedItem}
      />,
    );

    // Expanded group
    expect(wrapper.find('.ms-PickerPersona-container')).toHaveLength(1);
    wrapper
      .find('button.ms-PickerItem-removeButton')
      .at(0)
      .simulate('click');

    // After expanding,there should be 4 items
    expect(wrapper.find('.ms-PickerPersona-container')).toHaveLength(4);
  });

  it('edit render of the items in selected items list', () => {
    const SelectedItem = ItemWithContextMenu({
      menuItems: item => [
        {
          key: 'remove',
          text: 'Remove',
          onClick: removeItems(),
        },
        {
          key: 'copy',
          text: 'Copy',
          onClick: () => _getCopyItemsText(),
        },
      ],
      itemComponent: TriggerOnContextMenu(SelectedPersona),
    });

    const removeItems = jest.fn();
    const _getCopyItemsText = jest.fn();
    const onItemsRemoved = jest.fn();
    const wrapper = mount(
      <SelectedPeopleList
        key="normal"
        removeButtonAriaLabel="Remove"
        selectedItems={[people[0]]}
        onItemsRemoved={onItemsRemoved}
        onRenderItem={SelectedItem}
      />,
    );

    // Simulate right click to get the context menu
    wrapper.find('.ms-PickerPersona-container').simulate('contextmenu');

    // Remove and copy should show up in the menu
    expect(wrapper.find('.ms-ContextualMenu-item')).toHaveLength(2);
    expect(
      wrapper
        .find('.ms-ContextualMenu-item')
        .at(0)
        .text(),
    ).toEqual('Remove');

    expect(
      wrapper
        .find('.ms-ContextualMenu-item')
        .at(1)
        .text(),
    ).toEqual('Copy');

    wrapper
      .find('.ms-ContextualMenu-item')
      .at(0)
      .simulate('click');
    expect(removeItems).toBeCalledTimes(1);
  });
});
