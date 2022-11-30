import type { IContextualMenuProps, IIconProps, IStackTokens } from '@fluentui/react';
import { Toggle } from '@fluentui/react';
import { IconButton } from '@fluentui/react';
import { CompoundButton } from '@fluentui/react';
import { DefaultButton, PrimaryButton } from '@fluentui/react';
import * as React from 'react';
import { useState } from 'react';

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };

const emojiIcon: IIconProps = { iconName: 'Emoji2' };

const menuProps: IContextualMenuProps = {
  items: [
    {
      key: 'emailMessage',
      text: 'Email message',
      iconProps: { iconName: 'Mail' },
    },
    {
      key: 'calendarEvent',
      text: 'Calendar event',
      iconProps: { iconName: 'Calendar' },
    },
  ],
  directionalHintFixed: true,
};

export const ButtonExample: React.FunctionComponent = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const _onDisabledChanged = (ev: React.MouseEvent<HTMLElement>, disabled: boolean): void => {
    setIsDisabled(disabled);
  };

  const _onToggledChanged = (ev: React.MouseEvent<HTMLElement>, toggled: boolean): void => {
    setIsChecked(toggled);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '32px' }}>
        <Toggle label="Disable buttons" inlineLabel checked={isDisabled} onChange={_onDisabledChanged} />
        <Toggle label="Mark as checked" inlineLabel checked={isChecked} onChange={_onToggledChanged} />
      </div>
      <h3>Basic Button</h3>
      <div style={{ display: 'flex', gap: '8px' }}>
        <DefaultButton
          text="Standard"
          onClick={_alertClicked}
          allowDisabledFocus
          disabled={isDisabled}
          checked={isChecked}
        />
        <PrimaryButton
          text="Primary"
          onClick={_alertClicked}
          allowDisabledFocus
          disabled={isDisabled}
          checked={isChecked}
        />
      </div>
      <h3>Compound Button</h3>

      <div style={{ display: 'flex', gap: '8px' }}>
        <CompoundButton secondaryText="This is the secondary text." disabled={isDisabled} checked={isChecked}>
          Standard
        </CompoundButton>
        <CompoundButton primary secondaryText="This is the secondary text." disabled={isDisabled} checked={isChecked}>
          Primary
        </CompoundButton>
      </div>
      <h3>Icon Button</h3>

      <div style={{ display: 'flex', gap: '8px' }}>
        <IconButton iconProps={emojiIcon} title="Emoji" ariaLabel="Emoji" disabled={isDisabled} checked={isChecked} />
        <IconButton
          menuProps={menuProps}
          iconProps={emojiIcon}
          title="Emoji"
          ariaLabel="Emoji"
          disabled={isDisabled}
          checked={isChecked}
        />
      </div>
    </div>
  );
};

function _alertClicked(): void {
  alert('Clicked');
}
