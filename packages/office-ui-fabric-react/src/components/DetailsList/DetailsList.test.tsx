import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { DetailsList } from './DetailsList';
import { IDetailsList, IColumn } from './DetailsList.types';
import { AnimationVariables } from '../../Styling';

const _columns: IColumn[] = [
  {
    key: 'key',
    minWidth: 8,
    name: 'key'
  },
  {
    key: 'name',
    minWidth: 8,
    name: 'name'
  },
  {
    key: 'value',
    minWidth: 8,
    name: 'value'
  }
];

// Populate mock items for testing
function mockItems(count: number): any[] {
  const items = [];

  for (let i = 0; i < count; i++) {
    items.push({
      key: i,
      name: 'Item ' + i,
      value: i
    });
  }

  return items;
}

describe('DetailsList', () => {
  it('renders List correctly', () => {
    DetailsList.prototype.componentDidMount = jest.fn();

    const component = renderer.create(
      <DetailsList
        items={mockItems(5)}
        columns={_columns}
        // tslint:disable-next-line:jsx-no-lambda
        onRenderRow={() => null}
        skipViewportMeasures={true}
        // tslint:disable-next-line:jsx-no-lambda
        onShouldVirtualize={() => false}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders updates correctly', () => {
    jest.useFakeTimers();

    const testItems = mockItems(5);
    const detailsList = mount(
      <DetailsList
        items={testItems}
        columns={_columns}
        skipViewportMeasures={true}
        // tslint:disable-next-line:jsx-no-lambda
        onShouldVirtualize={() => false}
      />
    );

    const modifiedTestItems = testItems.slice();
    modifiedTestItems[0] = { ...modifiedTestItems[0], ...{ key: 'newKey 0', name: 'newName 0' } };
    const endIndex = modifiedTestItems.length - 1;
    modifiedTestItems[endIndex] = { ...modifiedTestItems[endIndex], ...{ name: 'newName ' + endIndex } };
    detailsList.setProps({ items: modifiedTestItems });
    detailsList.update();

    setTimeout(() => {
      expect(detailsList.getDOMNode()).toMatchSnapshot();
      // triple the length of the longest animation, to wait for update animations to finish, which should take only double
      // also convert to ms
    }, Number(AnimationVariables.durationValue4) * 3 * 1000);
    jest.runOnlyPendingTimers();
  });

  it('focuses row by index', () => {
    jest.useFakeTimers();

    let component: any;
    mount(
      <DetailsList
        items={mockItems(5)}
        // tslint:disable-next-line:jsx-no-lambda
        componentRef={ref => (component = ref)}
        skipViewportMeasures={true}
        // tslint:disable-next-line:jsx-no-lambda
        onShouldVirtualize={() => false}
      />
    );

    expect(component).toBeDefined();
    (component as IDetailsList).focusIndex(2);
    setTimeout(() => {
      expect(document.activeElement.querySelector('[data-automationid=DetailsRowCell]')!.textContent).toEqual('2');
      expect(document.activeElement.className.split(' ')).toContain('ms-DetailsRow');
    }, 0);
    jest.runOnlyPendingTimers();
  });

  it('focuses into row element', () => {
    const onRenderColumn = (item: any, index: number, column: IColumn) => {
      let value = item && column && column.fieldName ? item[column.fieldName] : '';
      if (value === null || value === undefined) {
        value = '';
      }
      return (
        <div className={'test-column'} data-is-focusable={true}>
          {value}
        </div>
      );
    };

    jest.useFakeTimers();

    let component: any;
    mount(
      <DetailsList
        items={mockItems(5)}
        // tslint:disable-next-line:jsx-no-lambda
        componentRef={ref => (component = ref)}
        skipViewportMeasures={true}
        // tslint:disable-next-line:jsx-no-lambda
        onShouldVirtualize={() => false}
        onRenderItemColumn={onRenderColumn}
      />
    );

    expect(component).toBeDefined();
    (component as IDetailsList).focusIndex(3);
    setTimeout(() => {
      expect(document.activeElement.querySelector('[data-automationid=DetailsRowCell]')!.textContent).toEqual('3');
      expect(document.activeElement.className.split(' ')).toContain('ms-DetailsRow');
    }, 0);
    jest.runOnlyPendingTimers();

    // Set element visibility manually as a test workaround
    (component as IDetailsList).focusIndex(4);
    setTimeout(() => {
      (document.activeElement.children[1] as any).isVisible = true;
      (document.activeElement.children[1].children[0] as any).isVisible = true;
      (document.activeElement.children[1].children[0].children[0] as any).isVisible = true;
    }, 0);

    jest.runOnlyPendingTimers();
    (component as IDetailsList).focusIndex(4, true);
    setTimeout(() => {
      expect(document.activeElement.textContent).toEqual('4');
      expect(document.activeElement.className.split(' ')).toContain('test-column');
    }, 0);
    jest.runOnlyPendingTimers();
  });

  it('reset focusedItemIndex when setKey updates', () => {
    jest.useFakeTimers();

    let component: any;
    const detailsList = mount(
      <DetailsList
        items={mockItems(5)}
        setKey={'key1'}
        initialFocusedIndex={0}
        // tslint:disable-next-line:jsx-no-lambda
        componentRef={ref => (component = ref)}
        skipViewportMeasures={true}
        // tslint:disable-next-line:jsx-no-lambda
        onShouldVirtualize={() => false}
      />
    );

    expect(component).toBeDefined();
    component.setState({ focusedItemIndex: 3 });
    setTimeout(() => {
      expect(component.state.focusedItemIndex).toEqual(3);
    }, 0);
    jest.runOnlyPendingTimers();

    // update props to new setKey
    const testItems = mockItems(7);
    const newProps = { items: testItems, setKey: 'set2', initialFocusedIndex: 0 };
    detailsList.setProps(newProps);
    detailsList.update();

    // verify that focusedItemIndex is reset to 0 and 0th row is focused
    setTimeout(() => {
      expect(component.state.focusedItemIndex).toEqual(0);
      expect(document.activeElement.querySelector('[data-automationid=DetailsRowCell]')!.textContent).toEqual('0');
      expect(document.activeElement.className.split(' ')).toContain('ms-DetailsRow');
    }, 0);
    jest.runOnlyPendingTimers();
  });
});
