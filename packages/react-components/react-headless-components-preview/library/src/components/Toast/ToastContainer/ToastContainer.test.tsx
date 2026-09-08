import * as React from 'react';
import { render } from '@testing-library/react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { isConformant } from '../../../testing/isConformant';
import type { ToastContainerProps } from './ToastContainer.types';
import { ToastContainer } from './ToastContainer';

const defaultToastContainerProps: ToastContainerProps = {
  announce: () => null,
  close: () => null,
  data: {},
  pauseOnHover: false,
  pauseOnWindowBlur: false,
  politeness: 'polite',
  remove: () => null,
  timeout: -1,
  intent: undefined,
  updateId: 0,
  visible: true,
  imperativeRef: { current: null },
  tryRestoreFocus: () => null,
  order: 0,
  content: '',
  onStatusChange: () => null,
  position: 'bottom-end',
  toastId: 'toast-id',
  priority: 0,
  toasterId: 'toaster-id',
};

describe('ToastContainer', () => {
  beforeEach(() => {
    jest.useRealTimers();
    resetIdsForTests();
  });

  isConformant({
    Component: ToastContainer,
    displayName: 'ToastContainer',
    requiredProps: defaultToastContainerProps,
    disabledTests: [
      // Callback argument signature includes toast metadata from ToastData.
      'consistent-callback-args',
      // Headless ToastContainer has no static classnames object.
      'component-has-static-classnames-object',
      'make-styles-overrides-win',
      // ToastContainer is exported from `toast.ts` rather than top-level `toast-container.ts`.
      'has-top-level-file-extra',
      'export-map-entry-exists',
    ],
  });

  it('renders listitem semantics and generated accessible ids', () => {
    const { getByRole } = render(
      <ToastContainer {...defaultToastContainerProps}>Default ToastContainer</ToastContainer>,
    );

    const toast = getByRole('listitem');

    expect(toast).toHaveTextContent('Default ToastContainer');
    expect(toast).toHaveAttribute('aria-labelledby');
    expect(toast).toHaveAttribute('aria-describedby');
  });

  it('announces on mount with default politeness', () => {
    const announce = jest.fn();

    render(
      <ToastContainer {...defaultToastContainerProps} announce={announce}>
        ToastContainer
      </ToastContainer>,
    );

    expect(announce).toHaveBeenCalledTimes(1);
    expect(announce).toHaveBeenCalledWith('ToastContainer', { politeness: 'polite' });
  });

  it('respects user root props from data.root', () => {
    const className = 'custom-toast-root';
    const { container } = render(
      <ToastContainer {...defaultToastContainerProps} data={{ root: { className } }}>
        ToastContainer
      </ToastContainer>,
    );

    expect(container.querySelector(`.${className}`)).not.toBeNull();
  });
});
