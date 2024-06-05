import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Alert } from './Alert';
import { alertClassNames } from './useAlertStyles.styles';

describe('Alert', () => {
  isConformant({
    // eslint-disable-next-line deprecation/deprecation
    Component: Alert,
    displayName: 'Alert',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Test Icon',
            action: 'Test Action',
          },
          expectedClassNames: {
            root: alertClassNames.root,
            icon: alertClassNames.icon,
            action: alertClassNames.action,
          },
        },
      ],
    },
  });

  // TODO - create visual regression tests in /apps/vr-tests
  // TODO - add tests for aria attributes or any a11y behaviors

  it('renders a default state', () => {
    // eslint-disable-next-line deprecation/deprecation
    render(<Alert>Test</Alert>);
    expect(screen.getByText('Test')).toBeTruthy();
  });

  it('renders an icon', () => {
    // eslint-disable-next-line deprecation/deprecation
    render(<Alert icon={<div data-testid="foo" />}>Test</Alert>);
    expect(screen.getByTestId('foo')).toBeTruthy();
  });

  it('renders an avatar', () => {
    // eslint-disable-next-line deprecation/deprecation
    render(<Alert avatar={{ name: 'John Doe' }}>Test</Alert>);
    expect(screen.getByText('JD')).toBeTruthy();
  });

  it('renders a button', () => {
    render(
      // eslint-disable-next-line deprecation/deprecation
      <Alert action={{ children: 'Undo' }} appearance="inverted">
        Test
      </Alert>,
    );
    expect(screen.getByText('Undo')).toBeTruthy();
  });

  it('prioritizes icon over intent prop', () => {
    render(
      // eslint-disable-next-line deprecation/deprecation
      <Alert intent="success" icon={<div data-testid="foo" />}>
        Test
      </Alert>,
    );
    expect(screen.getByTestId('foo')).toBeTruthy();
  });

  it('sets alert role based on intent', () => {
    render(
      <>
        {/* eslint-disable-next-line deprecation/deprecation */}
        <Alert intent="error" data-testid="error">
          Test
        </Alert>
        {/* eslint-disable-next-line deprecation/deprecation */}
        <Alert intent="error" data-testid="warning">
          Test
        </Alert>
      </>,
    );
    expect(screen.getByTestId('error').getAttribute('role')).toBe('alert');
    expect(screen.getByTestId('warning').getAttribute('role')).toBe('alert');
  });

  it('sets status role by default', () => {
    // eslint-disable-next-line deprecation/deprecation
    render(<Alert data-testid="default">Test</Alert>);
    expect(screen.getByTestId('default').getAttribute('role')).toBe('status');
  });
});
