import * as React from 'react';
import { render } from '@testing-library/react';
import { Toast } from './Toast';
import { isConformant } from '../../testing/isConformant';

describe('Toast', () => {
  isConformant({
    Component: Toast,
    displayName: 'Toast',
  });

  it('renders a default state', () => {
    const result = render(<Toast>Default Toast</Toast>);
    expect(result.container).toMatchSnapshot();
  });
});
