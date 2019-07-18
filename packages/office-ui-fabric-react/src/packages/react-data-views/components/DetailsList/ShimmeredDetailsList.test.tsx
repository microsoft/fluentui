import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { ShimmeredDetailsList } from './ShimmeredDetailsList';

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

describe('ShimmeredDetailsList', () => {
  it('renders List correctly', () => {
    ShimmeredDetailsList.prototype.componentDidMount = jest.fn();

    const component = renderer.create(
      <ShimmeredDetailsList
        items={mockItems(5)}
        // tslint:disable-next-line:jsx-no-lambda
        onRenderRow={() => null}
        enableShimmer={true}
        skipViewportMeasures={true}
        // tslint:disable-next-line:jsx-no-lambda
        onShouldVirtualize={() => false}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
