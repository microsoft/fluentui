import * as React from 'react';
import { Stack, IStackTokens, ThemeProvider, createTheme, DesignTokensContext } from '@fluentui/react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };

const tokensStyle: React.CSSProperties = {
  ['--colorNeutralBackground1' as any]: 'red',
  ['--colorNeutralForeground1' as any]: 'blue',
};

export const ButtonDefaultExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked } = props;

  const lightTheme = React.useMemo(() => createTheme(), []);

  return (
    <Stack horizontal tokens={stackTokens}>
      <DefaultButton text="Standard" onClick={_alertClicked} allowDisabledFocus disabled={disabled} checked={checked} />
      <PrimaryButton text="Primary" onClick={_alertClicked} allowDisabledFocus disabled={disabled} checked={checked} />
      <ThemeProvider theme={lightTheme} style={tokensStyle}>
        <DesignTokensContext.Provider value={{ styleWithDesignTokens: true }}>
          <DefaultButton
            text="Tokens"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
        </DesignTokensContext.Provider>
      </ThemeProvider>
    </Stack>
  );
};

function _alertClicked(): void {
  alert('Clicked');
}
