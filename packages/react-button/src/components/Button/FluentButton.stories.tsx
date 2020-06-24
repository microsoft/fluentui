import * as React from 'react';
import { Button } from './Button';
import { PartialTheme, ThemeProvider } from '@fluentui/react-theme-provider';
import { Stack, Text, Toggle } from 'office-ui-fabric-react';
import * as classes from './Button.stories.scss';

const FluentTheme: PartialTheme = {
  tokens: {
    palette: {
      accent: '#0078D4',
    },

    body: {
      background: 'white',
      contentColor: 'black',
    },

    accent: {
      background: 'var(--palette-accent)',
      disabled: {
        background: '#FAFAFA',
      },
      hovered: {
        background: '#0072C9',
      },
      pressed: {
        background: '#0078D4',
      },
    },

    button: {
      background: '#F5F5F5',
      disabled: {
        background: '#FAFAFA',
      },
      hovered: {
        background: '#F2F2F2',
      },
      pressed: {
        background: '#F7F7F7',
      },
    },
  },
  stylesheets: [],
};

const ButtonVariants = (props: ButtonProps) => (
  <div className={classes.hStack}>
    <Button {...props} content="Hello, world" icon="X" />
    <Button {...props} primary content="Hello, world" icon="X" />
    <Button {...props} disabled content="Hello, world" icon="X" />
    <Button {...props} primary disabled content="Hello, world" icon="X" />
  </div>
);

export const FluentButton = () => {
  const [enabled, setEnabled] = React.useState(true);
  const onChange = () => {
    setEnabled(!enabled);
  };
  return (
    <ThemeProvider theme={FluentTheme}>
      <Stack gap={20}>
        <Text variant="xLarge">A button comes in default and `primary` flavors.</Text>
        <ButtonVariants />

        <Text variant="xLarge">A button can appear round using the `circular` prop.</Text>
        <ButtonVariants circular />

        <Text variant="xLarge">A button can fill the width of its container using the `fluid` prop.</Text>
        <div className={classes.vStack}>
          <Button fluid content="Hello, world" icon="X" />
          <Button fluid primary content="Hello, world" icon="X" />
          <Button fluid disabled content="Hello, world" icon="X" />
          <Button fluid primary disabled content="Hello, world" icon="X" />
        </div>

        <Text variant="xLarge">A button can contain only an icon using the `iconOnly` prop.</Text>
        <ButtonVariants iconOnly />

        <Text variant="xLarge">A button can be both `circular` and `iconOnly`.</Text>
        <ButtonVariants circular iconOnly />

        <Text variant="xLarge">An icon button can format its Icon to appear before or after its content.</Text>
        <div className={classes.vStack}>
          <ButtonVariants iconPosition="before" />
          <ButtonVariants iconPosition="after" />
        </div>

        <Text variant="xLarge">A button can show a loading indicator using the `loading` prop.</Text>
        <ButtonVariants loading />

        <Text variant="xLarge">A button can be sized.</Text>
        <div className={classes.vStack}>
          <ButtonVariants size="smallest" />
          <ButtonVariants size="smaller" />
          <ButtonVariants size="small" />
          <ButtonVariants size="large" />
          <ButtonVariants size="larger" />
          <ButtonVariants size="largest" />
        </div>
      </Stack>
    </ThemeProvider>
  );
};
