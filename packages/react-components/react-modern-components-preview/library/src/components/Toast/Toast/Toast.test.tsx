import * as React from 'react';
import { act, render } from '@testing-library/react';
import { Toast } from './Toast';
import { toastClassNames } from './useToastStyles.styles';
import { useToastController } from '@fluentui/react-headless-components-preview/toast';
import { ToastBody } from '../ToastBody/ToastBody';
import { toastBodyClassNames } from '../ToastBody/useToastBodyStyles.styles';
import { ToastContainer } from '../ToastContainer/ToastContainer';
import { toastContainerClassNames } from '../ToastContainer/useToastContainerStyles.styles';
import type { ToastContainerProps } from '../ToastContainer/ToastContainer.types';
import { ToastFooter } from '../ToastFooter/ToastFooter';
import { toastFooterClassNames } from '../ToastFooter/useToastFooterStyles.styles';
import { ToastTitle } from '../ToastTitle/ToastTitle';
import { toastTitleClassNames } from '../ToastTitle/useToastTitleStyles.styles';
import { Toaster } from '../Toaster/Toaster';
import { toasterClassNames } from '../Toaster/useToasterStyles.styles';

const defaultToastContainerProps: ToastContainerProps = {
  close: jest.fn(),
  remove: jest.fn(),
  updateId: 0,
  order: 0,
  imperativeRef: { current: null },
  toastId: 'toast-id',
  position: 'bottom-end',
  content: '',
  timeout: -1,
  pauseOnWindowBlur: false,
  pauseOnHover: false,
  toasterId: 'toaster-id',
  priority: 0,
  data: {},
  onStatusChange: undefined,
  visible: true,
  tryRestoreFocus: jest.fn(),
};

describe('Toast', () => {
  it('renders every compound region with visual state and stable classes', () => {
    const { getByRole, getByTestId, getByText } = render(
      <div role="list">
        <ToastContainer {...defaultToastContainerProps} intent="success">
          <Toast appearance="inverted" className="consumer-class" data-testid="toast">
            <ToastTitle action="Dismiss">Saved</ToastTitle>
            <ToastBody subtitle="A moment ago">Your changes were saved.</ToastBody>
            <ToastFooter>Undo</ToastFooter>
          </Toast>
        </ToastContainer>
      </div>,
    );

    const toast = getByTestId('toast');
    const title = getByText('Saved');
    const media = title.previousElementSibling;

    expect(getByRole('listitem')).toHaveClass(toastContainerClassNames.root);
    expect(toast).toHaveClass(toastClassNames.root, 'consumer-class');
    expect(toast).toHaveAttribute('data-appearance', 'inverted');
    expect(toast).toHaveAttribute('data-intent', 'success');
    expect(title).toHaveClass(toastTitleClassNames.root);
    expect(media).toHaveClass(toastTitleClassNames.media);
    expect(media).toHaveAttribute('data-intent', 'success');
    expect(getByText('Dismiss')).toHaveClass(toastTitleClassNames.action);
    expect(getByText('Your changes were saved.')).toHaveClass(toastBodyClassNames.root);
    expect(getByText('A moment ago')).toHaveClass(toastBodyClassNames.subtitle);
    expect(getByText('Undo')).toHaveClass(toastFooterClassNames.root);
  });

  it('keeps default appearance unset', () => {
    const { getByTestId } = render(<Toast data-testid="toast">Default</Toast>);

    expect(getByTestId('toast')).not.toHaveAttribute('data-appearance');
  });

  it('styles and positions native Toaster stacks while preserving headless dispatch behavior', () => {
    let dispatchToast: ReturnType<typeof useToastController>['dispatchToast'];
    const Test = () => {
      dispatchToast = useToastController('modern-toaster').dispatchToast;
      return <Toaster toasterId="modern-toaster" position="top" offset={{ horizontal: 8, vertical: 12 }} />;
    };
    const { getByRole, getByText } = render(<Test />);

    act(() => {
      dispatchToast(<Toast>Notification</Toast>, { toastId: 'notification', timeout: -1 });
    });

    const stack = getByRole('list');
    expect(stack).toHaveClass(toasterClassNames.root);
    expect(stack).toHaveAttribute('data-toaster-position', 'top');
    expect(stack).toHaveStyle({ top: '12px', left: 'calc(50% + 8px)', transform: 'translateX(-50%)' });
    expect(getByText('Notification')).toHaveClass(toastClassNames.root);
  });
});
