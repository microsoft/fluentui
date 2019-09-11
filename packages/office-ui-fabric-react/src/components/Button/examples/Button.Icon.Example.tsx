import * as React from 'react';
import { IconButton, IIconProps } from 'office-ui-fabric-react';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

const emojiIcon: IIconProps = { iconName: 'Emoji2' };

export const ButtonIconExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked } = props;

  return (
    <div>
      <IconButton iconProps={emojiIcon} title="Emoji" ariaLabel="Emoji" disabled={disabled} checked={checked} />
      <p>
        For a list of Icons, visit our <a href="https://developer.microsoft.com/en-us/fabric#/styles/icons">Icon documentation</a>.
      </p>
    </div>
  );
};
