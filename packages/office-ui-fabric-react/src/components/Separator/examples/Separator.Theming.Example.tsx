import * as React from 'react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { createTheme, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';

const theme: ITheme = createTheme({
  fonts: {
    medium: {
      fontFamily: 'Monaco, Menlo, Consolas',
      fontSize: '30px'
    }
  }
});

export class SeparatorThemingExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const message = 'Today';

    return (
      <Stack gap={5}>
        <Text>Horizontal center aligned with custom theme</Text>
        <Separator alignText="center" theme={theme}>
          {message}
        </Separator>
      </Stack>
    );
  }
}
