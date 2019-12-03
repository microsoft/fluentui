import * as React from 'react';

import { Callout } from './Callout';
import { IAnnouncedCalloutProps } from './AnnouncedCallout.types';
import { DelayedRender } from '../../Utilities';

/**
 * A special Callout that announces its contents regardless of focus
 * @param props - Props for the component
 */
export const AnnouncedCallout: React.StatelessComponent<IAnnouncedCalloutProps> = (props: IAnnouncedCalloutProps): JSX.Element => {
  // announced scenario requires specific role and ariaLive values regardless of user provided values
  const announcedProps = {
    role: 'status',
    ariaLive: 'assertive'
  };
  return (
    <Callout {...announcedProps} {...props}>
      <DelayedRender>
        <>{props.children}</>
      </DelayedRender>
    </Callout>
  );
};
