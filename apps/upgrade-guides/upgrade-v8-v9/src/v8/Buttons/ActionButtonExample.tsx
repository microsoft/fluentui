import { ActionButton, IIconProps } from '@fluentui/react';
import React from 'react';

const addFriendIcon: IIconProps = { iconName: 'AddFriend' };

type Props = {};

export const ActionButtonExample: React.FC<Props> = () => {
  return (
    <div className="example">
      <div className="name">Action Button</div>
      <div className="description">v8: ActionButton --&gt; v9: Button</div>

      <div className="controls row">
        <ActionButton iconProps={addFriendIcon}>Create account</ActionButton>
      </div>
    </div>
  );
};
