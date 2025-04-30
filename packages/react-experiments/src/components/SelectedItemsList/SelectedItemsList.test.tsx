import * as React from 'react';
import { create } from 'react-test-renderer';

import { SelectedItemsList } from './SelectedItemsList';
import { render } from '@testing-library/react';
import type { ISelectedItemProps } from './SelectedItemsList.types';

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
      const wrapper = render(
        <SelectedItemsList
          onRenderItem={basicItemRenderer}
          selectedItems={[
            { key: '1', name: 'a' },
            { key: '2', name: 'b' },
          ]}
        />,
      );
      expect(wrapper.container).toBeTruthy();
      expect(wrapper.container.querySelectorAll('div').length).toEqual(2);
      expect(wrapper.container.querySelector('div')!.textContent).toEqual('a');
      expect(wrapper.container.querySelectorAll('div')[1].textContent).toEqual('b');
    });
  });

  it('render between selected and default selected items in selectedItemsList', () => {
    const removeItems = jest.fn();
    const wrapper = render(
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
    expect(wrapper.container).toBeTruthy();
    expect(wrapper.container.querySelectorAll('div').length).toEqual(2);
    expect(wrapper.container.querySelector('div')!.textContent).toEqual('da');
    expect(wrapper.container.querySelectorAll('div')[1].textContent).toEqual('db');
  });

  it('renders items that are passed in as default', () => {
    const wrapper = render(
      <SelectedItemsList
        onRenderItem={basicItemRenderer}
        defaultSelectedItems={[
          { key: 'd1', name: 'Person A' },
          { key: 'd2', name: 'Person B' },
        ]}
      />,
    );
    expect(wrapper.container).toBeTruthy();
    expect(wrapper.container.querySelectorAll('div').length).toEqual(2);
    expect(wrapper.container.querySelector('div')!.textContent).toEqual('Person A');
    expect(wrapper.container.querySelectorAll('div')[1].textContent).toEqual('Person B');
  });
});
