import * as React from 'react';

// import { Delete16Filled } from '@fluentui/react-icons';
import { render, screen } from '@testing-library/react';

import { isConformant } from '../../common/isConformant';
import { Alert } from './Alert';

describe('Alert', () => {
  isConformant({
    Component: Alert,
    displayName: 'Alert',
  });

  // TODO - create visual regression tests in /apps/vr-tests
  // TODO - add tests for aria attributes or any a11y behaviors

  it('renders a default state', () => {
    render(<Alert content="Default Alert" />);
    expect(screen.getByText('Default')).toBeTruthy();
  });

  // it('renders an icon', () => {
  //   render(<Alert content="Default Alert" icon={<Delete16Filled />} />);
  //   expect(screen.getByText('Default')).toBeTruthy();
  // });

  // it renders expected icon for intent prop
  // it renders a button
  // it prioritizes intent over icon
});
