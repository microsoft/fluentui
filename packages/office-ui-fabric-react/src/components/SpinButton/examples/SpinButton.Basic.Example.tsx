import * as React from 'react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';

const StackTokens: Partial<IStackTokens> = { childrenGap: 10 };
const StackStyles = { root: { width: 400 } };

export const SpinButtonBasicExample: React.FC = () => (
  <Stack tokens={StackTokens} styles={StackStyles}>
    <SpinButton
      defaultValue="0"
      label={'Basic SpinButton:'}
      min={0}
      max={100}
      step={1}
      iconProps={{ iconName: 'IncreaseIndentLegacy' }}
      incrementButtonAriaLabel={'Increase value by 1'}
      decrementButtonAriaLabel={'Decrease value by 1'}
    />
    <SpinButton
      defaultValue="0"
      label={'Decimal SpinButton:'}
      min={0}
      max={10}
      step={0.1}
      incrementButtonAriaLabel={'Increase value by 0.1'}
      decrementButtonAriaLabel={'Decrease value by 0.1'}
    />
  </Stack>
);
