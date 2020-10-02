import * as React from 'react';
import { Button, IButtonComponent } from '@uifabric/experiments';
import { ThemeProvider, IStackProps, Stack } from '@fluentui/react';

const stackProps: IStackProps = { tokens: { childrenGap: 16 }, padding: 8, maxWidth: 400 };

const componentStyles = {
  Icon: {
    styles: {
      root: {
        fontSize: 24,
        color: 'purple',
      },
    },
  },
  Text: {
    styles: {
      root: {
        color: 'purple',
      },
    },
  },
};

const buttonTheme = { components: componentStyles };

const getButtonStyles: IButtonComponent['styles'] = {
  icon: componentStyles.Icon.styles.root,
  content: componentStyles.Text.styles.root,
};

export class SlotsStyledExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack>
        <Stack {...stackProps}>
          <Button
            icon={{ iconName: 'share', style: componentStyles.Icon.styles.root }}
            content="Icon as IIconProps with style"
          />
          <Button
            icon="share"
            content={{ children: 'Text as ITextProps with styles', styles: componentStyles.Text.styles }}
          />
          <Button
            icon={{ iconName: 'share', style: { color: 'red' } }}
            styles={getButtonStyles}
            content="Button styles prop"
          />
          <ThemeProvider theme={buttonTheme}>
            <Button icon="share" content="Button theme" />
          </ThemeProvider>
        </Stack>
      </Stack>
    );
  }
}
