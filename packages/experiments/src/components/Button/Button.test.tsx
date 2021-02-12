import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Button } from './Button';

describe('Button', () => {
  it('renders a default Button with content correctly', () => {
    const component = renderer.create(<Button content="Default button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
