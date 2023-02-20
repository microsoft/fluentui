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
  const { disabled } = props;

  return (
    <>
      <ActionButton iconProps={addFriendIcon} allowDisabledFocus disabled={disabled} checked={false}>
        Create account
      </ActionButton>
      <ActionButton iconProps={addFriendIcon} allowDisabledFocus disabled={true} checked={false}>
        Disabled
      </ActionButton>
      <ActionButton iconProps={addFriendIcon} allowDisabledFocus disabled={disabled} checked={true}>
        Button checked
      </ActionButton>
    </>
  );
};
