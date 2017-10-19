import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { ProgressIndicator } from './ProgressIndicator';

describe('ProgressIndicator', () => {
  it('renders ProgressIndicator correctly', () => {
    const component = renderer.create(<ProgressIndicator />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});