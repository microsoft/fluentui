import * as React from 'react';
import { render } from '@testing-library/react';
import { Toast } from './Toast';
import { isConformant } from '../../testing/isConformant';
import { ToastProps } from './Toast.types';

const toastProps: ToastProps = {
  announce: () => null,
  close: () => null,
  content: '',
  data: {},
  dispatchedAt: 0,
  pauseOnHover: false,
  pauseOnWindowBlur: false,
  politeness: 'polite',
  position: 'bottom-left',
  priority: 0,
  remove: () => null,
  timeout: -1,
  toasterId: 'toaster',
  toastId: 'toast',
  updateId: 0,
  visible: true,
};

describe('Toast', () => {
  isConformant({
    Component: Toast,
    displayName: 'Toast',
    requiredProps: toastProps,
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Toast {...toastProps}>Default Toast</Toast>);
    expect(result.container).toMatchSnapshot();
  });
});
