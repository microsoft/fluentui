import * as React from 'react';
import { IIconProps } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

const volume0Icon: IIconProps = { iconName: 'Volume0' };
const volume3Icon: IIconProps = { iconName: 'Volume3' };

export const ButtonToggleExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked } = props;
  const [muted, setMuted] = React.useState<boolean>(false);
  const onClick = () => setMuted(!muted);

  return (
    <DefaultButton
      toggle
      checked={muted || checked}
      text={muted ? 'Volume muted' : 'Volume unmuted'}
      iconProps={muted ? volume0Icon : volume3Icon}
      onClick={onClick}
      allowDisabledFocus
      disabled={disabled}
    />
  );
};
