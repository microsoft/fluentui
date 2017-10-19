import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Icon } from './Icon';

describe('Icon', () => {
  it('renders Icon correctly', () => {
    const component = renderer.create(<Icon iconName='CompassNW' />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});