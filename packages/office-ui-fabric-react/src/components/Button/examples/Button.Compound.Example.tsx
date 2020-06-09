import * as React from 'react';
import { CompoundButton, Stack, IStackTokens } from 'office-ui-fabric-react';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };

export const ButtonCompoundExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked } = props;

  return (
    <Stack horizontal tokens={stackTokens}>
      <CompoundButton secondaryText="This is the secondary text." disabled={disabled} checked={checked}>
        Standard
      </CompoundButton>
      <CompoundButton primary secondaryText="This is the secondary text." disabled={disabled} checked={checked}>
        Primary
      </CompoundButton>
    </Stack>
  );
};
