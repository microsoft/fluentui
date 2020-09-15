import * as React from 'react';
import { Button } from './Button';
import { mergeThemes, PartialTheme } from '@fluentui/theme';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { UploadIcon } from '@fluentui/react-icons';
import { Stack, Text, ColorPicker, IColor } from 'office-ui-fabric-react';

const paletteAccent = 'var(--palette-accent)';
const paletteSoftest = 'var(--palette-softest)';
const paletteStrongest = 'var(--palette-strongest)';

const getThemes = (accent: string) => {
  const lightTheme = mergeThemes({
    tokens: {
      color: {
        body: {
          background: 'white',
          contentColor: 'black',
        },

        brand: {
          background: paletteAccent,
          contentColor: paletteSoftest,

          hovered: {
            background: paletteAccent,
            contentColor: paletteSoftest,
          },
          pressed: {
            background: paletteAccent,
            contentColor: paletteSoftest,
          },
        },

        button: {
          background: '#ddd',
        },
      },
    },
    stylesheets: [],
  });

  const darkTheme = mergeThemes(lightTheme, {
    tokens: {
      color: {
        body: {
          background: '#333',
          contentColor: paletteStrongest,
        },

        button: {
          background: 'transparent',
          contentColor: paletteStrongest,

          hovered: {
            background: '#555',
            contentColor: paletteStrongest,
          },
        },

        accent: {
          background: 'blue',
          contentColor: paletteStrongest,

          hovered: {
            background: '#555',
            contentColor: paletteStrongest,
          },
        },
      },
    },
  } as PartialTheme);

  return { lightTheme, darkTheme };
};

const ExampleBox = ({ title, theme }: { title: string; theme: PartialTheme }) => (
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
