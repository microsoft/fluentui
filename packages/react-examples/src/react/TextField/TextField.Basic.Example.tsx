import * as React from 'react';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';

const stackTokens = { childrenGap: 50 };
const iconProps = { iconName: 'Calendar' };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const TextFieldBasicExample: React.FunctionComponent = () => {
  return (
    <form noValidate autoComplete="off">
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <Stack {...columnProps}>
          <TextField label="Standard" />
          <TextField label="Disabled" disabled defaultValue="I am disabled" />
          <TextField label="Read-only" readOnly defaultValue="I am read-only" />
          <TextField label="Required " required />
          <TextField ariaLabel="Required without visible label" required />
          <TextField label="With error message" errorMessage="Error message" />
        </Stack>
        <Stack {...columnProps}>
          <MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" title="A 10 digit number" />
          <TextField label="With an icon" iconProps={iconProps} />
          <TextField label="With placeholder" placeholder="Please enter text here" />
          <TextField label="Disabled with placeholder" disabled placeholder="I am disabled" />
          {/* All password fields should be rendered inside of a form */}
          <TextField
            label="Password with reveal button"
            type="password"
            canRevealPassword
            revealPasswordAriaLabel="Show password"
          />
        </Stack>
      </Stack>
    </form>
  );
};
