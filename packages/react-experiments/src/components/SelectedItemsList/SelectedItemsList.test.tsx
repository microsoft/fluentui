import * as React from 'react';
import { create } from 'react-test-renderer';

import { SelectedItemsList } from './SelectedItemsList';
import { mount } from 'enzyme';
import type { ISelectedItemProps, ISelectedItemsList } from './SelectedItemsList.types';

export interface ISimple {
  key: string;
  name: string;
}

const basicItemRenderer = (props: ISelectedItemProps<ISimple>) => {
  return <div id={props.item.name}>{props.item.name}</div>;
};

// See SelectedPeopleList.test for more tests on items manipulation.
describe('SelectedItemsList', () => {
  describe('SelectedItemsList', () => {
    const renderNothing = () => <></>;

    it('renders SelectedItemsList correctly when no specific render component is provided', () => {
      const component = create(<SelectedItemsList onRenderItem={renderNothing} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders SelectedItemsList correctly', () => {
      const component = create(<SelectedItemsList onRenderItem={basicItemRenderer} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('render all items in selectedItemsList', () => {
      const wrapper = mount<ISelectedItemsList<ISimple>>(
        <SelectedItemsList
          onRenderItem={basicItemRenderer}
          selectedItems={[
            { key: '1', name: 'a' },
            { key: '2', name: 'b' },
          ]}
        />,
      );
      expect(wrapper.exists()).toBeTruthy();
      expect(wrapper.find('div').length).toEqual(2);
      expect(wrapper.find('div').first().text()).toEqual('a');
      expect(wrapper.find('div').last().text()).toEqual('b');
    });
  });

  it('render between selected and default selected items in selectedItemsList', () => {
    const removeItems = jest.fn();
    const wrapper = mount<ISelectedItemsList<ISimple>>(
      <SelectedItemsList
        onRenderItem={basicItemRenderer}
        selectedItems={[
          { key: 'd1', name: 'da' },
          { key: 'd2', name: 'db' },
        ]}
        defaultSelectedItems={[
          { key: 'd1', name: 'da' },
          { key: 'd2', name: 'db' },
        ]}
        onItemsRemoved={removeItems}
      />,
    );
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('div').length).toEqual(2);
    expect(wrapper.find('div').first().text()).toEqual('da');
    expect(wrapper.find('div').last().text()).toEqual('db');
  });

  it('renders items that are passed in as default', () => {
    const wrapper = mount<ISelectedItemsList<ISimple>>(
      <SelectedItemsList
        onRenderItem={basicItemRenderer}
        defaultSelectedItems={[
          { key: 'd1', name: 'Person A' },
          { key: 'd2', name: 'Person B' },
        ]}
      />,
    );
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('div').length).toEqual(2);
    expect(wrapper.find('div').first().text()).toEqual('Person A');
    expect(wrapper.find('div').last().text()).toEqual('Person B');
  });
});
