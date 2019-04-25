import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { MicroFeedback } from './MicroFeedback';

describe('MicroFeedback', () => {
  it('renders correctly with no props', () => {
    const tree = renderer.create(<MicroFeedback />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
