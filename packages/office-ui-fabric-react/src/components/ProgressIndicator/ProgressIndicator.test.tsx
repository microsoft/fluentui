import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { ProgressIndicator } from './ProgressIndicator';

describe('ProgressIndicator', () => {
  it('renders ProgressIndicator correctly', () => {
    const component = renderer.create(<ProgressIndicator percentComplete={0.75} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders indeterminate ProgressIndicator correctly', () => {
    const component = renderer.create(<ProgressIndicator />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
