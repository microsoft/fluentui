import * as React from 'react';
import { DefaultButton, CompoundButton, IButtonStyles } from '@fluentui/react/lib/Button';
import { keytipMap } from '@fluentui/react-examples/lib/react/Keytip/KeytipSetup';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { IContextualMenuProps } from '@fluentui/react/lib/ContextualMenu';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { useBoolean } from '@fluentui/react-hooks';

const stackTokens: IStackTokens = { childrenGap: 20 };
const marginBottom = { root: { marginBottom: 28 } };
const splitButtonStyles: Partial<IButtonStyles> = { splitButtonContainer: { height: 32 } };
const splitButtonProps: IContextualMenuProps = {
  items: [
    {
      key: 'splitButtonMenuButton1',
      text: 'Split Button Menu Item 1',
      keytipProps: keytipMap.SplitButtonMenuItem1,
    },
    {
      key: 'splitButtonMenuButton2',
      text: 'Split Button Menu Item 2',
      keytipProps: keytipMap.SplitButtonMenuItem2,
    },
  ],
};
const buttonProps: IContextualMenuProps = {
  items: [
    {
      key: 'buttonMenuItem1',
      text: 'Menu Item 1',
      keytipProps: keytipMap.ButtonMenuItem1,
    },
    {
      key: 'buttonMenuItem2',
      text: 'Menu Item 2',
      keytipProps: keytipMap.ButtonMenuItem2,
    },
  ],
};

const log =
  (text: string): (() => void) =>
  () =>
    console.log(text);

export const KeytipsButtonExample: React.FunctionComponent = () => {
  const [btnDisabled, { toggle: toggleBtnDisabled }] = useBoolean(false);
  return (
    <div>
      <p>When multiple Keytips start with the same character, typing that character will filter the visible keytips.</p>
      <Stack horizontal tokens={stackTokens}>
        <DefaultButton keytipProps={keytipMap.Button} text="Button" onClick={log('Button')} />
        <CompoundButton
          styles={marginBottom}
          keytipProps={keytipMap.CompoundButton}
          text="Compound Button"
          secondaryText={'With a Keytip'}
          onClick={log('Compound Button')}
        />
        <DefaultButton
          keytipProps={keytipMap.ButtonWithMenu}
          text="Button with Menu"
          menuProps={buttonProps}
          onClick={log('Button with Menu')}
        />
        <DefaultButton
          styles={splitButtonStyles}
          keytipProps={keytipMap.SplitButton}
          text="Split Button"
          split
          onClick={log('Split Button')}
          menuProps={splitButtonProps}
        />
        <DefaultButton text="I do not have a keytip" />
      </Stack>
      <p>
        The 'offset' prop can be used to position the keytip a set distance from the top-left corner of the element.
      </p>
      <DefaultButton styles={marginBottom} keytipProps={keytipMap.ButtonOffset} text="Button keytip offset 10x10" />
      <p>When a Keytip's corresponding component is disabled, the keytip still appears but cannot be triggered.</p>
      <Toggle
        onText={'Enabled'}
        offText={'Disabled'}
        defaultChecked={!btnDisabled}
        onChange={toggleBtnDisabled}
        onClick={log('Button')}
      />
      <DefaultButton
        keytipProps={keytipMap.DisabledButton}
        disabled={btnDisabled}
        text={(btnDisabled ? 'Disabled' : 'Enabled') + ' Button'}
        onClick={log('Disabled Button')}
      />
    </div>
  );
};
