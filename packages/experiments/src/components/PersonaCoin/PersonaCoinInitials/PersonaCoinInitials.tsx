import * as React from 'react';
import { Icon } from 'office-ui-fabric-react';
import { Text } from '../../../Text';
import { IPersonaCoinProps } from '../PersonaCoin.types';
import { getInitials, getRTL } from '../../../Utilities';

export interface IPersonaCoinInitialsProps {
  initials: IPersonaCoinProps['initials'];
  text: IPersonaCoinProps['text'];
  allowPhoneInitials: IPersonaCoinProps['allowPhoneInitials'];
  className: string;
}

export const PersonaCoinInitials: React.StatelessComponent<IPersonaCoinInitialsProps> = props => {
  const initials = (typeof props.initials === 'string' && props.initials) || getInitials(props.text, getRTL(), props.allowPhoneInitials);

  if (initials) {
    return <Text className={props.className}>{initials}</Text>;
  }

  return <Icon iconName="Contact" className={props.className} />;
};
