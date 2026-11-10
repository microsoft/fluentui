import * as React from 'react';
import { people } from '@fluentui/example-data';
import { fireEvent, render } from '@testing-library/react';
import { SelectedPeopleList, SelectedPersona, ItemWithContextMenu, TriggerOnContextMenu } from '../index';
import type { ISelectedPeopleList, ItemCanDispatchTrigger } from '../index';

describe('SelectedPeopleList', () => {
  it('renders nothing if nothing is provided', () => {
    const pickerRef: React.RefObject<ISelectedPeopleList | null> = React.createRef();
    const { container } = render(<SelectedPeopleList ref={pickerRef} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders personas that are passed in', () => {
    const pickerRef: React.RefObject<ISelectedPeopleList | null> = React.createRef();
    const { container, getAllByText } = render(
      <SelectedPeopleList selectedItems={[{ text: 'Person A' }, { text: 'Person B' }]} ref={pickerRef} />,
    );

    expect(getAllByText('Person A')).toHaveLength(2);
    expect(getAllByText('Person B')).toHaveLength(2);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders personas that are passed in as default', () => {
    const pickerRef: React.RefObject<ISelectedPeopleList | null> = React.createRef();
    const { container, getAllByText } = render(
      <SelectedPeopleList defaultSelectedItems={[{ text: 'Person A' }, { text: 'Person B' }]} ref={pickerRef} />,
    );

    expect(getAllByText('Person A')).toHaveLength(2);
    expect(getAllByText('Person B')).toHaveLength(2);

    expect(container.firstChild).toMatchSnapshot();
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
