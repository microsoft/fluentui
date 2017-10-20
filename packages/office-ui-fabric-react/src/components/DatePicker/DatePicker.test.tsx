import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { DatePicker } from './DatePicker';

describe('Checkbox', () => {
  it('renders Checkbox correctly', () => {
    // This will only render the input. Calendar component has its own snapshot.
    const component = renderer.create(<DatePicker />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});