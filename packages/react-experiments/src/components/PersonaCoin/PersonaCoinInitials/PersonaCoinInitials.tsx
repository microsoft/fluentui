import * as React from 'react';
import { Icon, Text } from '@fluentui/react';
import { getInitials, getRTL } from '../../../Utilities';
import type { ISlotProp } from '@fluentui/foundation-legacy';
import type { IPersonaCoinProps } from '../PersonaCoin.types';

export type IPersonaCoinInitialsSlot = ISlotProp<IPersonaCoinInitialsProps, string>;

// TODO: Have Markus verify... className props was required, but I'm not sure if it should be.
// If it is truly required, it seems the parent component should be ensuring that default values are
// provided and not assume the consumer of the slot will provide them.
export interface IPersonaCoinInitialsProps {
  initials: IPersonaCoinProps['initials'];
  text: IPersonaCoinProps['text'];
  allowPhoneInitials: IPersonaCoinProps['allowPhoneInitials'];
  className?: string;
}

export const PersonaCoinInitials: React.FunctionComponent<IPersonaCoinInitialsProps> = props => {
  const initials =
    (typeof props.initials === 'string' && props.initials) ||
    getInitials(props.text, getRTL(), props.allowPhoneInitials);

  if (initials) {
    return <Text className={props.className}>{initials}</Text>;
  }

  return <Icon iconName="Contact" className={props.className} />;
};
