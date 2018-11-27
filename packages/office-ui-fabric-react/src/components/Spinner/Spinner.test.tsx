import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Spinner } from './index';

describe('Spinner', () => {
  it('renders Spinner correctly', () => {
    const component = renderer.create(<Spinner label="Standard checkbox" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
