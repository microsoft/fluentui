import { ShorthandValue, Tooltip, TooltipProps } from '@fluentui/react-northstar';
import * as copyToClipboard from 'copy-to-clipboard';
import * as _ from 'lodash';
import * as React from 'react';

import { Notification, NotificationContext } from './NotificationProvider';

export type CopyToClipboardProps = {
  tooltip?: ShorthandValue<TooltipProps>;
  attached?: boolean;
  target?: HTMLElement;
  notification?: React.ReactNode;
  timeout?: number;
  value: string;
  trigger: JSX.Element;
};

const CopyToClipboard: React.FC<CopyToClipboardProps> = props => {
  const { value, trigger, tooltip, attached, notification, timeout, target } = props;

  const setNotification = React.useContext(NotificationContext);
  const [copied, setCopied] = React.useState<boolean>(false);
  const timeoutId = React.useRef<number>();

  React.useEffect(() => {
    timeoutId.current = window.setTimeout(() => {
      setCopied(false);
    }, timeout);

    return () => clearTimeout(timeoutId.current);
  }, [copied, timeout]);

  const handleTriggerClick = React.useCallback(
    (e: React.MouseEvent, ...args) => {
      setCopied(true);
      if (!attached) {
        setNotification(notification, target, timeout);
      }

      copyToClipboard(value);
      _.invoke(trigger.props, 'onClick', e, ...args);
    },
    // TODO: This is intentional, but may be buggy. Should be fixed later
    // eslint-disable-next-line
    [value],
  );

  const renderedTrigger = React.cloneElement(trigger, { onClick: handleTriggerClick });

  if (copied && attached) {
    return <Notification trigger={renderedTrigger} content={notification} />;
  }

  if (copied || !tooltip) {
    return renderedTrigger;
  }

  return Tooltip.create(tooltip, {
    overrideProps: {
      trigger: renderedTrigger,
      children: undefined, // force-reset `children` defined for `Tooltip` as it collides with the `trigger
    },
  });
};

CopyToClipboard.defaultProps = {
  notification: 'Copied to clipboard',
  tooltip: 'Click to copy',
  timeout: 4000,
};

export default CopyToClipboard;
