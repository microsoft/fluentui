import * as React from 'react';
import { Stack, IStackTokens } from '@fluentui/react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };

export const ButtonDefaultExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked } = props;
  const [button1, setButton1] = React.useState(true);
  const [button2, setButton2] = React.useState(true);

  return (
    <>
      <Stack horizontal tokens={stackTokens}>
        {button1 && (
          <DefaultButton
            text="Standard"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
        )}
        {button2 && (
          <PrimaryButton
            text="Primary"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
        )}
      </Stack>
      <Stack horizontal tokens={stackTokens}>
        {button1 && (
          <DefaultButton
            text="Standard"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
        )}
        {button2 && (
          <PrimaryButton
            text="Primary"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
        )}
      </Stack>
      <br />
      <br />
      <br />
      <br />
      Content outside of Fluent code/components <br />
      Click inside input box then use an arrow key <br />
      <input value="test text here" className="test" />
      <button onClick={() => setButton1(false)}>Erase button 1</button>
      <button onClick={() => setButton2(false)}>Erase button 2</button>
    </>
  );
};

function _alertClicked(): void {
  alert('Clicked');
}
