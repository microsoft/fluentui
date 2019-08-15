import * as React from 'react';
import { CommandBarButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export const ButtonCommandBarExample: React.FunctionComponent<IButtonProps> = props => {
  const { disabled, checked } = props;

  return (
    <div style={{ display: 'flex', alignItems: 'stretch', height: '44px' }}>
      <CommandBarButton
        iconProps={{ iconName: 'Add' }}
        text="New item"
        // Set split=true to render a SplitButton instead of a regular button with a menu
        // split={true}
        menuProps={{
          items: [
            {
              key: 'emailMessage',
              text: 'Email message',
              iconProps: { iconName: 'Mail' }
            },
            {
              key: 'calendarEvent',
              text: 'Calendar event',
              iconProps: { iconName: 'Calendar' }
            }
          ]
        }}
        disabled={disabled}
        checked={checked}
      />
      <CommandBarButton iconProps={{ iconName: 'Mail' }} text="Send Mail" disabled={disabled} checked={checked} />
    </div>
  );
};
