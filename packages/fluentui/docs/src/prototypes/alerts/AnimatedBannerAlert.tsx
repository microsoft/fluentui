import * as React from 'react';
import { Alert, Animation, AlertProps } from '@fluentui/react-northstar';

interface AnimatedBannerAlertProps extends AlertProps {
  open?: boolean;
}

/**
 * Needs to have 'slideDown' animation defined in parent Provider
 */
const AnimatedBannerAlert: React.FunctionComponent<AnimatedBannerAlertProps> = props => {
  const { open, ...rest } = props;

  if (open === undefined) return <Alert {...rest} />;

  return (
    <Animation name={open ? '' : 'slideDown'}>
      <Alert {...rest} />
    </Animation>
  );
};

export default AnimatedBannerAlert;
