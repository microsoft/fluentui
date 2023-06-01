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
});
