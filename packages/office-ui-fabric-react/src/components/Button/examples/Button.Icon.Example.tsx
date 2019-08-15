import * as React from 'react';
import { IconButton, IButtonProps } from 'office-ui-fabric-react';

export const ButtonIconExample: React.FunctionComponent<IButtonProps> = props => {
  const { disabled, checked } = props;

  return (
    <div>
      <IconButton iconProps={{ iconName: 'Emoji2' }} title="Emoji" ariaLabel="Emoji" disabled={disabled} checked={checked} />
      <p>
        For a list of Icons, visit our <a href="https://developer.microsoft.com/en-us/fabric#/styles/icons">Icon documentation</a>.
      </p>
    </div>
  );
};
