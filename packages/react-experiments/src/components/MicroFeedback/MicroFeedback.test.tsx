import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { MicroFeedback } from './MicroFeedback';

describe('MicroFeedback', () => {
  it('renders correctly with no props', () => {
    const tree = renderer.create(<MicroFeedback />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with inline prop set', () => {
    const tree = renderer.create(<MicroFeedback inline />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
