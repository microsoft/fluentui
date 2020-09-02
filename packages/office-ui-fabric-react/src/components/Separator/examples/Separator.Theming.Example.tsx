import * as React from 'react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { createTheme, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';

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
