import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { VerticalBarChart } from './VerticalBarChart';

describe('VerticalBarChart', () => {
  it('renders VerticalBarChart correctly', () => {
    const points = [{ x: 0, y: 0 }, { x: 10, y: 10 }];
    const component = renderer.create(<VerticalBarChart data={points} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
