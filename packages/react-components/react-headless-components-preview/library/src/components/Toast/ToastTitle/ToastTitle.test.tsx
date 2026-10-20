import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { ToastContainer } from '../ToastContainer';
import type { ToastContainerProps, ToastImperativeRef } from '../';
import { ToastTitle } from './ToastTitle';
import { useToastTitle } from './useToastTitle';

const createToastContainerWrapper =
  (props: Partial<ToastContainerProps>) =>
  ({ children }: React.PropsWithChildren) => {
    const imperativeRef = React.useRef<ToastImperativeRef>({
      focus: jest.fn(),
      play: jest.fn(),
      pause: jest.fn(),
    });

    return (
      <ToastContainer
        close={jest.fn()}
        remove={jest.fn()}
        updateId={0}
        order={0}
        imperativeRef={imperativeRef}
        toastId="1"
        position="top-end"
        content={undefined}
        timeout={0}
        pauseOnWindowBlur={false}
        pauseOnHover={false}
        toasterId={undefined}
        priority={0}
        data={{}}
        onStatusChange={undefined}
        visible={true}
        tryRestoreFocus={jest.fn()}
        {...props}
      >
        {children}
      </ToastContainer>
    );
  };

describe('ToastTitle', () => {
  it('exposes the intent of the toast as data-intent on the media', () => {
    const { result } = renderHook(
      () => useToastTitle({ media: { 'data-testid': 'media' } as object }, React.createRef()),
      {
        wrapper: createToastContainerWrapper({ intent: 'warning' }),
      },
    );

    expect(result.current.media?.['data-intent']).toBe('warning');
  });

  it('renders the data-intent attribute on the media', () => {
    const { getByTestId } = render(<ToastTitle media={{ 'data-testid': 'media' } as object}>Title</ToastTitle>, {
      wrapper: createToastContainerWrapper({ intent: 'error' }),
    });

    expect(getByTestId('media')).toHaveAttribute('data-intent', 'error');
  });

  it('defaults data-intent to info', () => {
    const { result } = renderHook(() => useToastTitle({}, React.createRef()), {
      wrapper: createToastContainerWrapper({}),
    });

    expect(result.current.media?.['data-intent']).toBe('info');
  });

  it('does not fail when the media slot is disabled', () => {
    const { result } = renderHook(() => useToastTitle({ media: null }, React.createRef()), {
      wrapper: createToastContainerWrapper({ intent: 'error' }),
    });

    expect(result.current.media).toBeUndefined();
  });
});
