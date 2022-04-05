import * as React from 'react';
import { Separator } from '@fluentui/react/lib/Separator';
import { createTheme, ITheme } from '@fluentui/react/lib/Styling';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';

const theme: ITheme = createTheme({
  fonts: {
    medium: {
      fontFamily: 'Monaco, Menlo, Consolas',
      fontSize: '30px',
    },
  },
});

const stackTokens: IStackTokens = { childrenGap: 12 };

export const SeparatorThemingExample: React.FC = () => (
  <Stack tokens={stackTokens}>
    <Text>Horizontal center aligned with custom theme</Text>
    <Separator theme={theme}>Today</Separator>
  </Stack>
);
