import { Portal, Tooltip, createComponent, TooltipProps } from '@fluentui/react-northstar';
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

export const Notification = createComponent<NotificationProps>({
  displayName: 'Notification',
  render: ({ target, trigger, content, config: { classes } }) => {
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
        <div className={classes.root}>
          <div className={classes.overlay}>
            {Tooltip.create({
              ...tooltipProps,
              trigger: <div className={classes.content} />,
            })}
          </div>
        </div>
      </Portal>
    );
  },
});
