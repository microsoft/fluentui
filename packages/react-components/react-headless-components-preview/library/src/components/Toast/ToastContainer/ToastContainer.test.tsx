import * as React from 'react';
import { act, render } from '@testing-library/react';
import { useToastController, useToaster } from '@fluentui/react-toast';
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
    axeRenderOptions: {
      // ToastContainer is a list of toasts, so we need to wrap it in a list for accessibility.
      wrapper: ({ children }) => <div role="list">{children}</div>,
    },
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

  it('removes a dismissed toast only once in StrictMode', () => {
    const remove = jest.fn();
    const onStatusChange = jest.fn();

    render(
      <React.StrictMode>
        <ToastContainer
          {...defaultToastContainerProps}
          visible={false}
          queued={false}
          remove={remove}
          onStatusChange={onStatusChange}
        />
      </React.StrictMode>,
    );

    expect(remove).toHaveBeenCalledTimes(1);
    expect(onStatusChange.mock.calls.filter(([, data]) => data.status === 'dismissed')).toHaveLength(1);
  });

  it('removes a hidden toast when queue state is not supplied', () => {
    const remove = jest.fn();
    const { rerender } = render(<ToastContainer {...defaultToastContainerProps} visible={false} remove={remove} />);

    expect(remove).toHaveBeenCalledTimes(1);

    rerender(<ToastContainer {...defaultToastContainerProps} visible remove={remove} />);
    rerender(<ToastContainer {...defaultToastContainerProps} visible={false} remove={remove} />);

    expect(remove).toHaveBeenCalledTimes(2);
  });

  it('removes a replacement hidden toast in a reused container', () => {
    const removeFirst = jest.fn();
    const removeSecond = jest.fn();
    const { rerender } = render(
      <ToastContainer {...defaultToastContainerProps} toastId="first" visible={false} remove={removeFirst} />,
    );

    rerender(<ToastContainer {...defaultToastContainerProps} toastId="second" visible={false} remove={removeSecond} />);

    expect(removeFirst).toHaveBeenCalledTimes(1);
    expect(removeSecond).toHaveBeenCalledTimes(1);
  });

  it('reports dismissal for separate standalone containers sharing a close callback', () => {
    const close = jest.fn();
    const onStatusChange = jest.fn();

    render(
      <>
        <ToastContainer
          {...defaultToastContainerProps}
          toastId="first"
          visible={false}
          close={close}
          onStatusChange={onStatusChange}
        />
        <ToastContainer
          {...defaultToastContainerProps}
          toastId="second"
          visible={false}
          close={close}
          onStatusChange={onStatusChange}
        />
      </>,
    );

    expect(onStatusChange.mock.calls.filter(([, data]) => data.status === 'dismissed')).toHaveLength(2);
  });

  it('does not confuse a standalone toast with a managed toast sharing its close callback', () => {
    let controller: ReturnType<typeof useToastController>;
    const managedStatus = jest.fn();
    const standaloneStatus = jest.fn();
    const Test = () => {
      controller = useToastController('shared-close');
      const { toastsToRender, isToastVisible } = useToaster({ toasterId: 'shared-close' });
      const toast = Array.from(toastsToRender.values()).flat()[0];

      return toast ? (
        <>
          <ToastContainer {...toast} visible={isToastVisible(toast.toastId)} tryRestoreFocus={() => undefined} />
          <ToastContainer
            {...defaultToastContainerProps}
            toastId="standalone"
            order={toast.order + 1}
            close={toast.close}
            visible={false}
            onStatusChange={standaloneStatus}
          />
        </>
      ) : null;
    };

    render(<Test />);
    act(() => controller.dispatchToast('managed', { toastId: 'managed', timeout: -1, onStatusChange: managedStatus }));

    expect(standaloneStatus).toHaveBeenCalledWith(
      null,
      expect.objectContaining({ toastId: 'standalone', status: 'dismissed' }),
    );
    expect(managedStatus).not.toHaveBeenCalledWith(null, expect.objectContaining({ status: 'dismissed' }));

    act(() => controller.dismissToast('managed'));
    expect(managedStatus.mock.calls.filter(([, data]) => data.status === 'dismissed')).toHaveLength(1);
  });

  it('does not repeat cleanup when callbacks change during a status update', () => {
    const remove = jest.fn();
    const dismissed = jest.fn();
    const Test = () => {
      const [, setUpdated] = React.useState(false);
      return (
        <ToastContainer
          {...defaultToastContainerProps}
          visible={false}
          remove={() => remove()}
          onStatusChange={(_, data) => {
            if (data.status === 'dismissed') {
              dismissed();
              setUpdated(true);
            }
          }}
        />
      );
    };

    render(<Test />);

    expect(remove).toHaveBeenCalledTimes(1);
    expect(dismissed).toHaveBeenCalledTimes(1);
  });

  it('cleans up a new instance with the same id', () => {
    const remove = jest.fn();
    const { rerender } = render(
      <ToastContainer {...defaultToastContainerProps} visible={false} order={1} remove={remove} />,
    );

    rerender(<ToastContainer {...defaultToastContainerProps} visible={false} order={2} remove={remove} />);

    expect(remove).toHaveBeenCalledTimes(2);
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
