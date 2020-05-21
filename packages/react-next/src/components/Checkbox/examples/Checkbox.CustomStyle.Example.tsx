import * as React from 'react';
import { DefaultButton } from '@fluentui/react-next/lib/Button';
import { Checkbox } from '@fluentui/react-next/lib/Checkbox';
import { Stack } from '@fluentui/react-next/lib/Stack';
import { Customizer } from '@fluentui/react-next/lib/Utilities';
import { loadTheme, FontWeights, FontSizes, IPartialTheme } from '@fluentui/react-next/lib/Styling';

// Used to add spacing between example checkboxes
const stackTokens = { childrenGap: 10 };

const customizedTheme: IPartialTheme = { fonts: { medium: { fontWeight: FontWeights.bold } } };

// TODO (xgao): Remove. This example is temporary for testing backward compatibility.
export const CheckboxCustomStyleExample: React.FunctionComponent = () => {
  const loadCustomizedTheme = () => loadTheme({ fonts: { medium: { fontSize: FontSizes.xLarge } } });

  return (
    <Stack tokens={stackTokens}>
      <Customizer settings={{ theme: customizedTheme }}>
        <Checkbox label="With theme" />
      </Customizer>

      <Customizer scopedSettings={{ Checkbox: { theme: customizedTheme } }}>
        <Checkbox label="With scoped theme (not working)" defaultChecked />
      </Customizer>

      <Customizer scopedSettings={{ Checkbox: { styles: { root: { background: 'yellow' } } } }}>
        <Checkbox label="With scoped styles" defaultChecked />
      </Customizer>

      <DefaultButton onClick={loadCustomizedTheme}>Test loadTheme</DefaultButton>
    </Stack>
  );
};
