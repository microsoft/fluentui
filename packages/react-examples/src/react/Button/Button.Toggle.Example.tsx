import * as React from 'react';
import { IIconProps } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useBoolean } from '@fluentui/react-hooks';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

const volume0Icon: IIconProps = { iconName: 'Volume0' };
const volume3Icon: IIconProps = { iconName: 'Volume3' };

export const ButtonToggleExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked } = props;
  const [muted, { toggle: setMuted }] = useBoolean(false);

  return (
    <>
      <p>
        Note: Toggle buttons require the <code>toggle</code> attribute in addition to <code>checked</code>.
      </p>
      <DefaultButton
        toggle
        checked={muted || checked}
        text={muted ? 'Volume muted' : 'Volume unmuted'}
        iconProps={muted ? volume0Icon : volume3Icon}
        onClick={setMuted}
        allowDisabledFocus
        disabled={disabled}
      />
    </>
  );
};
