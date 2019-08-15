import * as React from 'react';
import { ContextualMenu, DefaultButton, IButtonProps, IContextualMenuProps, ILabelStyles, Label, Stack } from 'office-ui-fabric-react';

const labelStyles: Partial<ILabelStyles> = {
  root: { marginBottom: 10 }
};

export const ButtonContextualMenuExample: React.FunctionComponent<IButtonProps> = props => {
  const { disabled, checked } = props;

  return (
    <Stack horizontal tokens={{ childrenGap: 40 }}>
      <div>
        <Label styles={labelStyles}>Non-persisted menu</Label>
        <DefaultButton
          allowDisabledFocus={true}
          iconProps={{ iconName: 'Add' }}
          menuAs={_getMenu}
          text="New item"
          onMenuClick={_onMenuClick}
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
            ],
            directionalHintFixed: true
          }}
          disabled={disabled}
          checked={checked}
        />
      </div>
      <div>
        <Label styles={labelStyles}>Persisted menu</Label>
        <DefaultButton
          allowDisabledFocus={true}
          persistMenu={true}
          iconProps={{ iconName: 'Add' }}
          menuAs={_getMenu}
          text="New item"
          onMenuClick={_onMenuClick}
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
            ],
            directionalHintFixed: true
          }}
          disabled={disabled}
          checked={checked}
        />
      </div>
    </Stack>
  );
};

function _getMenu(menuProps: IContextualMenuProps): JSX.Element {
  // Customize contextual menu with menuAs
  return <ContextualMenu {...menuProps} />;
}

function _onMenuClick(ev?: React.SyntheticEvent<any>) {
  console.log(ev);
}
