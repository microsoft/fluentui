import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { ToastAlert } from './ToastAlert';
import { toastAlertClassNames } from './useToastAlertStyles.styles';

describe('ToastAlert', () => {
  isConformant({
    Component: ToastAlert,
    displayName: 'ToastAlert',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            media: 'Test Icon',
            action: 'Test Action',
          },
          expectedClassNames: {
            root: toastAlertClassNames.root,
            media: toastAlertClassNames.media,
            action: toastAlertClassNames.action,
          },
        },
      ],
    },
  });

  // TODO - create visual regression tests in /apps/vr-tests
  // TODO - add tests for aria attributes or any a11y behaviors

  it('renders a default state', () => {
    render(<ToastAlert>Test</ToastAlert>);
    expect(screen.getByText('Test')).toBeTruthy();
  });

  it('renders an media', () => {
    render(<ToastAlert media={<div data-testid="foo" />}>Test</ToastAlert>);
    expect(screen.getByTestId('foo')).toBeTruthy();
  });

  it('renders a button', () => {
    render(
      <ToastAlert action={{ children: 'Undo' }} appearance="inverted">
        Test
      </ToastAlert>,
    );
    expect(screen.getByText('Undo')).toBeTruthy();
  });

  it('prioritizes media over intent prop', () => {
    render(
      <ToastAlert intent="success" media={<div data-testid="foo" />}>
        Test
      </ToastAlert>,
    );
    expect(screen.getByTestId('foo')).toBeTruthy();
  });

  it('sets alert role based on intent', () => {
    render(
      <>
        <ToastAlert intent="error" data-testid="error">
          Test
        </ToastAlert>
        <ToastAlert intent="error" data-testid="warning">
          Test
        </ToastAlert>
      </>,
    );
    expect(screen.getByTestId('error').getAttribute('role')).toBe('alert');
    expect(screen.getByTestId('warning').getAttribute('role')).toBe('alert');
  });

  it('sets status role by default', () => {
    render(<ToastAlert data-testid="default">Test</ToastAlert>);
    expect(screen.getByTestId('default').getAttribute('role')).toBe('status');
  });
});
