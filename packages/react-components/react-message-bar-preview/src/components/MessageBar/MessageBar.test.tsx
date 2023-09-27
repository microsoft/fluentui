import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { MessageBar } from './MessageBar';

describe('MessageBar', () => {
  isConformant({
    Component: MessageBar,
    displayName: 'MessageBar',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<MessageBar>Default MessageBar</MessageBar>);
    expect(result.container).toMatchSnapshot();
  });
});
