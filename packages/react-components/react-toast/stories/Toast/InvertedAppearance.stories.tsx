import * as React from 'react';
import { Toaster, useToastController, Toast, ToastTitle, ToastBody, ToastFooter } from '@fluentui/react-toast';
import { useId, Link, Button, makeStyles, tokens, LinkProps } from '@fluentui/react-components';

// TODO https://github.com/microsoft/fluentui/issues/28338
const useInvertedLinkStyles = makeStyles({
  root: {
    color: tokens.colorBrandForegroundInverted,
    ':hover': {
      color: tokens.colorBrandForegroundInvertedHover,
    },
    ':active': {
      color: tokens.colorBrandForegroundInvertedPressed,
    },
  },
});

// TODO https://github.com/microsoft/fluentui/issues/28338
const InvertedLink: React.FC<LinkProps> = props => {
  const styles = useInvertedLinkStyles();
  return <Link {...props} className={styles.root} />;
};

export const InvertedAppearance = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast appearance="inverted">
        <ToastTitle action={<InvertedLink>Undo</InvertedLink>}>Email sent</ToastTitle>
        <ToastBody subtitle="Subtitle">This is a toast body</ToastBody>
        <ToastFooter>
          <InvertedLink>Action</InvertedLink>
          <InvertedLink>Action</InvertedLink>
        </ToastFooter>
      </Toast>,
      { intent: 'success' },
    );

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};
