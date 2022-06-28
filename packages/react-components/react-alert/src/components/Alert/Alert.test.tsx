import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { isConformant } from '../../common/isConformant';
import { Alert } from './Alert';
import { alertClassNames } from './useAlertStyles';

describe('Alert', () => {
  isConformant({
    Component: Alert,
    displayName: 'Alert',
    disabledTests: ['component-has-static-classname-exported'],
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
    render(<Alert>Test</Alert>);
    expect(screen.getByText('Test')).toBeTruthy();
  });

  it('renders an icon', () => {
    render(<Alert icon={<div data-testid="foo" />}>Test</Alert>);
    expect(screen.getByTestId('foo')).toBeTruthy();
  });

  it('renders an avatar', () => {
    render(<Alert avatar={{ name: 'John Doe' }}>Test</Alert>);
    expect(screen.getByText('JD')).toBeTruthy();
  });

  it('renders a button', () => {
    render(<Alert action={{ children: 'Undo' }}>Test</Alert>);
    expect(screen.getByText('Undo')).toBeTruthy();
  });

  it('prioritizes icon over intent prop', () => {
    render(
      <Alert intent="success" icon={<div data-testid="foo" />}>
        Test
      </Alert>,
    );
    expect(screen.getByTestId('foo')).toBeTruthy();
  });
});
