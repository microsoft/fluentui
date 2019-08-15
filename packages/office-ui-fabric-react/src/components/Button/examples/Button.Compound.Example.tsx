import * as React from 'react';
import { CompoundButton, IButtonProps, IButtonStyles, ILabelStyles, Label, Stack } from 'office-ui-fabric-react';

const labelStyles: Partial<ILabelStyles> = {
  root: { marginBottom: 10 }
};

const buttonStyles: Partial<IButtonStyles> = {
  root: { margin: '10px 0' }
};

export const ButtonCompoundExample: React.FunctionComponent<IButtonProps> = props => {
  const { disabled, checked } = props;

  return (
    <Stack horizontal tokens={{ childrenGap: 40 }}>
      <div>
        <Label styles={labelStyles}>Standard</Label>
        <CompoundButton secondaryText="You can create a new account here." disabled={disabled} checked={checked} styles={buttonStyles}>
          Create account
        </CompoundButton>
      </div>
      <div>
        <Label styles={labelStyles}>Primary</Label>
        <CompoundButton
          primary={true}
          secondaryText="You can create a new account here."
          styles={buttonStyles}
          disabled={disabled}
          checked={checked}
        >
          Create account
        </CompoundButton>
      </div>
    </Stack>
  );
};
