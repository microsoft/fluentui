import * as React from 'react';
import { IIconProps } from '@fluentui/react';
import { ActionButton } from '@fluentui/react/lib/Button';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

const addFriendIcon: IIconProps = { iconName: 'AddFriend' };

export const ButtonActionExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked } = props;

  return (
    <ActionButton iconProps={addFriendIcon} allowDisabledFocus disabled={disabled} checked={checked}>
      Create account
    </ActionButton>
  );
};
