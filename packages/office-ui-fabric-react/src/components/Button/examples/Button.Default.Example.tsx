import * as React from 'react';
import { DefaultButton, IButtonProps, Label, ILabelStyles, PrimaryButton, Stack } from 'office-ui-fabric-react';

const labelStyles: Partial<ILabelStyles> = {
  root: { marginBottom: 10 }
};

export const ButtonDefaultExample: React.FunctionComponent<IButtonProps> = props => {
  const { disabled, checked } = props;

  return (
    <Stack horizontal tokens={{ childrenGap: 40 }}>
      <div>
        <Label styles={labelStyles}>Standard</Label>
        <DefaultButton text="Standard Button" onClick={_alertClicked} allowDisabledFocus={true} disabled={disabled} checked={checked} />
      </div>
      <div>
        <Label styles={labelStyles}>Primary</Label>
        <PrimaryButton text="Primary Button" onClick={_alertClicked} allowDisabledFocus={true} disabled={disabled} checked={checked} />
      </div>
    </Stack>
  );
};

function _alertClicked(): void {
  alert('Clicked');
}
