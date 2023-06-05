import * as React from 'react';
import { render } from '@testing-library/react';
import { ToastLayout } from './ToastLayout';
import { isConformant } from '../../testing/isConformant';

describe('ToastLayout', () => {
  isConformant({
    Component: ToastLayout,
    displayName: 'ToastLayout',
  });

  it('renders a default state', () => {
    const result = render(<ToastLayout>Default ToastLayout</ToastLayout>);
    expect(result.container).toMatchSnapshot();
  });
});
