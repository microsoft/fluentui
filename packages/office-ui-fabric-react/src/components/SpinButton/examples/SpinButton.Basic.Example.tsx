import * as React from 'react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
<<<<<<< HEAD
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
=======
import { Stack, IStackStyles } from 'office-ui-fabric-react/lib/Stack';

const stackStyles: IStackStyles = { root: { width: 400 } };

export class SpinButtonBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack tokens={{ childrenGap: 10 }} styles={stackStyles}>
        <SpinButton
          defaultValue="0"
          label={'Basic SpinButton:'}
          min={0}
          max={100}
          step={1}
          iconProps={{ iconName: 'IncreaseIndentLegacy' }}
          // tslint:disable:jsx-no-lambda
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          incrementButtonAriaLabel={'Increase value by 1'}
          decrementButtonAriaLabel={'Decrease value by 1'}
        />
        <SpinButton
          defaultValue="0"
          label={'Decimal SpinButton:'}
          min={0}
          max={10}
          step={0.1}
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          incrementButtonAriaLabel={'Increase value by 0.1'}
          decrementButtonAriaLabel={'Decrease value by 0.1'}
        />
      </Stack>
    );
  }
}
>>>>>>> fix styles prop in examples
