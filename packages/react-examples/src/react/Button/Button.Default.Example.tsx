import * as React from 'react';
import { Stack, IStackTokens, ThemeProvider } from '@fluentui/react';
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

  return (
    <>
      <ThemeProvider>
        <Stack horizontal tokens={stackTokens}>
          <DefaultButton
            text="Standard"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
          <PrimaryButton
            text="Primary"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
          <DefaultButton
            text="Standard"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
          <PrimaryButton
            text="Primary"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
          <DefaultButton
            text="Standard"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
          <PrimaryButton
            text="Primary"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
          <DefaultButton
            text="Standard"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
          <PrimaryButton
            text="Primary"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
        </Stack>
      </ThemeProvider>
      <br />
      <br />
      <br />
      <br />
      Content outside of Fluent code/components <br />
      Click inside input box then use an arrow key <br />
      <input className="test" />
      <input className="test" />
      <input className="test" />
      <input className="test" />
      <input className="test" />
      <input className="test" />
      <input className="test" />
      <input className="test" />
      <input className="test" />
      <input className="test" />
      <input className="test" />
      <input className="test" />
      <input className="test" />
      <input className="test" />
      <input className="test" />
      <input className="test" />
      <input className="test" />
      <input className="test" />
    </>
  );
};

function _alertClicked(): void {
  alert('Clicked');
}
