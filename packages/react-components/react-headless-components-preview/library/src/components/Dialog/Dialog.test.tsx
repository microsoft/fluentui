import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  isConformant({
    Component: Dialog,
    displayName: 'Dialog',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Dialog open>Default Dialog</Dialog>);
    const dialog = result.getByRole('dialog');

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent('Default Dialog');
  });
});
