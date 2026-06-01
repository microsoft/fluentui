import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Toast } from './Toast';
import { ToastContainer } from './ToastContainer';
import type { ToastContainerProps, ToastImperativeRef } from './';

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

describe('Toast', () => {
  isConformant({
    Component: Toast,
    displayName: 'Toast',
  });

  it('renders children', () => {
    const { getByTestId } = render(<Toast data-testid="toast">Default Toast</Toast>, {
      wrapper: createToastContainerWrapper({}),
    });

    const toast = getByTestId('toast');

    expect(toast).toHaveTextContent('Default Toast');
    expect(toast).toHaveAttribute('data-intent', 'info');
  });

  it('renders children with error intent', () => {
    const { getByTestId } = render(<Toast data-testid="toast">Error Toast</Toast>, {
      wrapper: createToastContainerWrapper({ intent: 'error' }),
    });

    const toast = getByTestId('toast');

    expect(toast).toHaveTextContent('Error Toast');
    expect(toast).toHaveAttribute('data-intent', 'error');
  });
});
