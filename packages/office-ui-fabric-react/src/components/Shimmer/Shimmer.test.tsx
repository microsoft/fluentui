import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Shimmer } from './Shimmer';

describe('Shimmer', () => {
  it('renders Shimmer correctly', () => {
    const component = renderer.create(<Shimmer />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
