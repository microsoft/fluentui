import * as React from 'react';
import { Button } from './Button';
import { mergeThemes, ThemeProvider, Theme } from '@fluentui/react-theme-provider';
import { UploadIcon } from '@fluentui/react-icons';
import { Stack, Text, ColorPicker, IColor } from 'office-ui-fabric-react';

// tslint:disable: jsx-ban-props

const getThemes = (accent: string) => {
  const lightTheme = mergeThemes({
    tokens: {
      palette: {
        accent,
      },

      body: {
        background: 'white',
        contentColor: 'black',
      },

      accent: {
        background: 'var(--palette-accent)',
      },

      button: {
        background: '#ddd',
      },
    },
    stylesheets: [],
  });

  const darkTheme = mergeThemes(lightTheme, {
    tokens: {
      body: {
        background: '#333',
        contentColor: 'white',
      },
      button: {
        background: 'transparent',
        contentColor: 'white',
        hovered: {
          background: '#555',
        },
      },
    },
  });

  return { lightTheme, darkTheme };
};

const ExampleBox = ({ title, theme }: { title: string; theme: Theme }) => (
  <ThemeProvider theme={theme} style={{ padding: 20 }}>
    <Stack
      tokens={{
        childrenGap: 8,
        maxWidth: 400,
      }}
    >
      <Text variant="xLarge">{title}</Text>
      <Button icon={<UploadIcon />}>I am a button</Button>
      <Button primary>I am a primary button</Button>
    </Stack>
  </ThemeProvider>
);

export const ThemeExample = () => {
  const [color, setColor] = React.useState<string>('#f00');
  const { lightTheme, darkTheme } = getThemes(color);
  const onColorChange = React.useCallback((ev: never, newColor: IColor) => setColor(newColor.str), []);

  return (
    <Stack gap={16}>
      <Text variant="xLarge">Accent color</Text>
      <ColorPicker color={color} onChange={onColorChange} />

      <ExampleBox title="Light" theme={lightTheme} />
      <ExampleBox title="Dark" theme={darkTheme} />
    </Stack>
  );
};
