import * as React from 'react';
import { render } from '@testing-library/react';
import { ToastBody } from './ToastBody';
import { isConformant } from '../../testing/isConformant';

describe('ToastBody', () => {
  isConformant({
    Component: ToastBody,
    displayName: 'ToastBody',
  });

  it('renders a default state', () => {
    const result = render(<ToastBody>Default ToastBody</ToastBody>);
    expect(result.container).toMatchSnapshot();
  });
});
