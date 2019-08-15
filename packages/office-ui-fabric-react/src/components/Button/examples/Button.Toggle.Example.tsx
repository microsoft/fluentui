import * as React from 'react';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export const ButtonToggleExample: React.FunctionComponent<IButtonProps> = props => {
  const { disabled, checked } = props;
  const [muted, setMuted] = React.useState<boolean>(false);

  return (
    <DefaultButton
      allowDisabledFocus={true}
      disabled={disabled}
      toggle={true}
      checked={muted || checked}
      text={muted ? 'Volume muted' : 'Volume unmuted'}
      iconProps={{ iconName: muted ? 'Volume0' : 'Volume3' }}
      // tslint:disable-next-line:jsx-no-lambda
      onClick={() => {
        setMuted(!muted);
      }}
    />
  );
};
