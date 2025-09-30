import { Box, Portal, Tooltip, TooltipProps } from '@fluentui/react-northstar';
import * as React from 'react';

type NotificationProps = {
  content: React.ReactNode;
  target?: HTMLElement;
  trigger?: JSX.Element;
};

type NotificationContextValue = (content: React.ReactNode, target: HTMLElement | null, timeout: number) => void;

export const NotificationContext = React.createContext<NotificationContextValue>(() => {
  throw new Error('No matching NotificationContext.Provider');
});

export const NotificationProvider: React.FC = props => {
  const { children } = props;
  const [notification, setNotification] = React.useState<React.ReactNode>();
  const [target, setTarget] = React.useState<HTMLElement | null>();
  const timeoutId = React.useRef<number>();

  const update = React.useCallback<NotificationContextValue>((notification, target, timeout) => {
    setNotification(notification);
    setTarget(target);
    timeoutId.current = window.setTimeout(() => {
      setNotification(null);
      setTarget(null);
    }, timeout);
  }, []);

  React.useEffect(() => {
    return () => clearTimeout(timeoutId.current);
  }, []);

  return (
    <>
      {!!notification && <Notification target={target} content={notification} />}
      <NotificationContext.Provider value={update}>{children}</NotificationContext.Provider>
    </>
  );
};

export const Notification: React.FC<NotificationProps> = ({ target, trigger, content }) => {
  const tooltipProps: TooltipProps = {
    content,
    open: true,
    pointing: false,
    target,
    trigger,
  };

  if (target || trigger) {
    return Tooltip.create({ ...tooltipProps, offset: [0, 10] });
  }

  return (
    <Portal open>
      <Box
        styles={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,

          height: 'unset',
          width: 'unset',

          position: 'static',
          visibility: 'hidden',
          zIndex: 1000,
        }}
      >
        <Box
          styles={{
            alignItems: 'center',
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            left: 0,
            overflow: 'auto',
            position: 'fixed',
            right: 0,
            top: 0,
          }}
        >
          {Tooltip.create({
            ...tooltipProps,
            trigger: <Box />,
          })}
        </Box>
      </Box>
    </Portal>
  );
};
