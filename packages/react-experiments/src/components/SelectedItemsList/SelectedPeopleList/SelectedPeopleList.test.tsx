import * as React from 'react';
import { create } from 'react-test-renderer';

import { people } from '@fluentui/example-data';
import { fireEvent, render } from '@testing-library/react';
import { SelectedPeopleList, SelectedPersona, ItemWithContextMenu, TriggerOnContextMenu } from '../index';
import type { ISelectedPeopleList, ItemCanDispatchTrigger } from '../index';

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
    expect(personANodes.length).toEqual(2);
    expect(personBNodes.length).toEqual(2);

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('renders personas that are passed in as default', () => {
    const pickerRef: React.RefObject<ISelectedPeopleList> = React.createRef();
    const rendered = create(
      <SelectedPeopleList defaultSelectedItems={[{ text: 'Person A' }, { text: 'Person B' }]} ref={pickerRef} />,
    );

    const personANodes = rendered.root.findAll(x => !!x.children.length && x.children.indexOf('Person A') !== -1);
    const personBNodes = rendered.root.findAll(x => !!x.children.length && x.children.indexOf('Person B') !== -1);
    expect(personBNodes.length).toEqual(2);
    expect(personANodes.length).toEqual(2);

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('remove personas', () => {
    const onItemsRemoved = jest.fn();
    const wrapper = render(
      <SelectedPeopleList
        key="normal"
        removeButtonAriaLabel="Remove"
        selectedItems={[people[0]]}
        onItemsRemoved={onItemsRemoved}
      />,
    );

    fireEvent.click(wrapper.container.querySelectorAll('button.ms-PickerItem-removeButton')[1]);

    expect(onItemsRemoved).toHaveBeenCalledTimes(1);
  });

  it('edit render of the items in selected items list', () => {
    const SelectedItem: ItemCanDispatchTrigger<any> = ItemWithContextMenu({
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
    const wrapper = render(
      <SelectedPeopleList
        key="normal"
        removeButtonAriaLabel="Remove"
        selectedItems={[people[0]]}
        onItemsRemoved={onItemsRemoved}
        onRenderItem={SelectedItem}
      />,
    );

    // Simulate right click to get the context menu
    fireEvent.contextMenu(wrapper.container.querySelector('.ms-PickerPersona-container')!);

    // Remove and copy should show up in the menu
    expect(wrapper.baseElement.querySelectorAll('.ms-ContextualMenu-item')).toHaveLength(2);
    expect(wrapper.baseElement.querySelector('.ms-ContextualMenu-item')!.textContent).toEqual('Remove');

    expect(wrapper.baseElement.querySelectorAll('.ms-ContextualMenu-item')[1].textContent).toEqual('Copy');

    fireEvent.click(wrapper.baseElement.querySelector('.ms-ContextualMenu-item')!);
    expect(removeItems).toHaveBeenCalledTimes(1);
  });
});
