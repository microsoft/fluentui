import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { HorizontalBarChart } from './HorizontalBarChart';

describe('HorizontalBarChart', () => {
  it('renders HorizontalBarChart correctly', () => {
    const points = [{ x: 0, y: 0 }, { x: 10, y: 10 }];
    const component = renderer.create(<HorizontalBarChart data={points} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
