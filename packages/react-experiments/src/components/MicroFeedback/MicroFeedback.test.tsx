import * as React from 'react';
import { render } from '@testing-library/react';

import { MicroFeedback } from './MicroFeedback';

describe('MicroFeedback', () => {
  it('renders correctly with no props', () => {
    const { container } = render(<MicroFeedback />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with inline prop set', () => {
    const { container } = render(<MicroFeedback inline />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
