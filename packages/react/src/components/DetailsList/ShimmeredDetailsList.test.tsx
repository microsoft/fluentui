import * as React from 'react';
import { render } from '@testing-library/react';
import { ShimmeredDetailsList } from './ShimmeredDetailsList';

// Populate mock items for testing
function mockItems(count: number): any {
  const items = [];

  for (let i = 0; i < count; i++) {
    items.push({
      key: i,
      name: 'Item ' + i,
      value: i,
    });
  }

  return items;
}

describe('ShimmeredDetailsList', () => {
  it('renders List correctly', () => {
    const { container } = render(
      <ShimmeredDetailsList
        items={mockItems(5)}
        onRenderRow={() => null}
        enableShimmer={true}
        skipViewportMeasures={true}
        onShouldVirtualize={() => false}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
