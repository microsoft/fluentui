import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { isConformant } from '../../common/isConformant';
import { Alert } from './Alert';

describe('Alert', () => {
  isConformant({
    Component: Alert,
    displayName: 'Alert',
    // TODO - Follow up on the best option here
    // testOptions: {
    //   'has-static-classnames': [
    //     {
    //       props: {
    //         action: { children: 'Test button ' },
    //       },
    //     },
    //   ],
    // },
    disabledTests: [
      // 'component-has-static-classname',
      // 'component-has-static-classname-exported',
      'component-has-static-classnames-object',
    ],
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

  it('renders a button', () => {
    render(<Alert action={{ appearance: 'transparent', children: 'Undo' }}>Test</Alert>);
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
