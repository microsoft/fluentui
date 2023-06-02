import * as React from 'react';
import { render } from '@testing-library/react';
import { ToastTitle } from './ToastTitle';
import { isConformant } from '../../testing/isConformant';

describe('ToastTitle', () => {
  isConformant({
    Component: ToastTitle,
    displayName: 'ToastTitle',
  });

  it('renders a default state', () => {
    const result = render(<ToastTitle>Default ToastTitle</ToastTitle>);
    expect(result.container).toMatchSnapshot();
  });
});
