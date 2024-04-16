import * as React from 'react';
import { render } from '@testing-library/react';
import { ToastFooter } from './ToastFooter';
import { isConformant } from '../../testing/isConformant';

describe('ToastFooter', () => {
  isConformant({
    Component: ToastFooter,
    displayName: 'ToastFooter',
  });

  it('renders a default state', () => {
    const result = render(<ToastFooter>Default ToastFooter</ToastFooter>);
    expect(result.container).toMatchSnapshot();
  });
});
