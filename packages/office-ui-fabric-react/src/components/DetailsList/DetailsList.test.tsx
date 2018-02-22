import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as ReactTestUtils from 'react-dom/test-utils';
import { mount } from 'enzyme';

import {
  DetailsList
} from './DetailsList';

import {
  IDetailsList,
  IColumn
} from './DetailsList.types';

// Populate mock items for testing
function mockItems(count: number): any {
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
        items={ mockItems(5) }
        // tslint:disable-next-line:jsx-no-lambda
        onRenderRow={ () => null }
        skipViewportMeasures={ true }
        // tslint:disable-next-line:jsx-no-lambda
        onShouldVirtualize={ () => false }
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('focuses row by index', () => {
    jest.useFakeTimers();

    let component: any;
    const wrapper = mount(
      <DetailsList
        items={ mockItems(5) }
        // tslint:disable-next-line:jsx-no-lambda
        componentRef={ ref => component = ref }
        skipViewportMeasures={ true }
        // tslint:disable-next-line:jsx-no-lambda
        onShouldVirtualize={ () => false }
      />);

    expect(component).toBeDefined();
    (component as IDetailsList).focusIndex(2);
    setTimeout(() => {
      expect(document.activeElement.className.split(' ')).toContain('ms-DetailsRow');
      expect(document.activeElement.textContent).toEqual('2');
    }, 0);
    jest.runOnlyPendingTimers();
  });

  it('focuses into row element', () => {
    const onRenderColumn = (item: any, index: number, column: IColumn) => {
      let value = (item && column && column.fieldName) ? item[column.fieldName] : '';
      if (value === null || value === undefined) {
        value = '';
      }
      console.log('Rendered column');
      return (
        <div className={ 'test-column' } data-is-focusable={ true } >
          { value }
        </div>
      );
    };

    jest.useFakeTimers();

    let component: any;
    const wrapper = mount(
      <DetailsList
        items={ mockItems(5) }
        // tslint:disable-next-line:jsx-no-lambda
        componentRef={ ref => component = ref }
        skipViewportMeasures={ true }
        // tslint:disable-next-line:jsx-no-lambda
        onShouldVirtualize={ () => false }
        onRenderItemColumn={ onRenderColumn }
      />);

    expect(component).toBeDefined();
    (component as IDetailsList).focusIndex(2);
    setTimeout(() => {
      expect(document.activeElement.className.split(' ')).toContain('ms-DetailsRow');
      expect(document.activeElement.textContent).toEqual('2');
    }, 0);
    jest.runOnlyPendingTimers();

    (component as IDetailsList).focusIndex(2, true);
    setTimeout(() => {
      expect(document.activeElement.className.split(' ')).toContain('test-column');
      expect(document.activeElement.textContent).toEqual('2');
    }, 0);
    jest.runOnlyPendingTimers();
  });
});