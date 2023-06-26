import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Toast, ToastTitle, ToastBody, ToastFooter, ToastContextProvider, ToastIntent } from '@fluentui/react-toast';
import { Link } from '@fluentui/react-link';

export default {
  title: 'Toast',
} as ComponentMeta<typeof Toast>;

const ToastContainer: React.FC<{ children: React.ReactNode; intent?: ToastIntent }> = ({ children, intent }) => {
  return (
    <ToastContextProvider value={{ close: () => null, intent: intent ?? 'success' }}>
      <div style={{ minHeight: 44, width: 292, marginTop: 10 }}>{children}</div>
    </ToastContextProvider>
  );
};

const toastIntents = ['success', 'warning', 'info', 'error'] as const;

export const FullToast = () => {
  return (
    <>
      {toastIntents.map(intent => (
        <ToastContainer key={intent} intent={intent}>
          <Toast>
            <ToastTitle action={<Link>Action</Link>}>This is a toast</ToastTitle>
            <ToastBody subtitle="This is a toast">This is a toast</ToastBody>
            <ToastFooter>
              <Link>Action</Link>
              <Link>Action</Link>
            </ToastFooter>
          </Toast>
        </ToastContainer>
      ))}
    </>
  );
};

export const WithoutSubtitle = () => {
  return (
    <>
      {toastIntents.map(intent => (
        <ToastContainer key={intent} intent={intent}>
          <Toast>
            <ToastTitle action={<Link>Action</Link>}>This is a toast</ToastTitle>
            <ToastBody subtitle="This is a toast">This is a toast</ToastBody>
            <ToastFooter>
              <Link>Action</Link>
              <Link>Action</Link>
            </ToastFooter>
          </Toast>
        </ToastContainer>
      ))}
    </>
  );
};

export const TitleOnly = () => {
  return (
    <>
      {toastIntents.map(intent => (
        <ToastContainer key={intent} intent={intent}>
          <Toast>
            <ToastTitle action={<Link>Action</Link>}>This is a toast</ToastTitle>
          </Toast>
        </ToastContainer>
      ))}
    </>
  );
};
