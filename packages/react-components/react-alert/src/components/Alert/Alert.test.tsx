import * as React from 'react';

import { Delete16Filled } from '@fluentui/react-icons';
import { render, screen } from '@testing-library/react';

// import { isConformant } from '../../common/isConformant';
import { Alert } from './Alert';
import { intentClassName } from './useAlertStyles';

describe('Alert', () => {
  // Todo - Follow up in the next PR

  // isConformant({
  //   Component: Alert,
  //   displayName: 'Alert',
  // });

  // TODO - create visual regression tests in /apps/vr-tests
  // TODO - add tests for aria attributes or any a11y behaviors

  it('renders a default state', () => {
    render(<Alert>Test</Alert>);
    expect(screen.getByText('Test')).toBeTruthy();
  });

  it('renders an icon', () => {
    render(<Alert icon={<Delete16Filled data-testid="foo" />}>Test</Alert>);
    expect(screen.getByTestId('foo')).toBeTruthy();
  });

  it('renders the expected icon for intent prop', () => {
    const { container } = render(<Alert intent="success">Test</Alert>);
    expect(container.querySelector(`.${intentClassName}`)).toBeTruthy();
  });

  it('renders a button', () => {
    render(<Alert action={{ appearance: 'transparent', children: 'Undo' }}>Test</Alert>);
    expect(screen.getByText('Undo')).toBeTruthy();
  });

  // it prioritizes icon over intent prop
  it('prioritizes icon over intent prop', () => {
    const { container } = render(
      <Alert intent="success" icon={<Delete16Filled data-testid="foo" />}>
        Test
      </Alert>,
    );
    expect(screen.getByTestId('foo')).toBeTruthy();
    expect(container.querySelector(`.${intentClassName}`)).toBeFalsy();
  });
});
