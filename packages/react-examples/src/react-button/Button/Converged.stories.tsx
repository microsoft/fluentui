import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { UploadIcon } from '@fluentui/react-icons';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { mergeThemes, PartialTheme } from '@fluentui/theme';
import { Stack, Text, ColorPicker, IColor } from 'office-ui-fabric-react';

const getThemes = (brand: string) => {
  const lightTheme = mergeThemes({
    tokens: {
      color: {
        body: {
          background: 'white',
          contentColor: 'black',
        },

        brand: {
          background: brand,
          contentColor: 'var(--color-body-contentColor)',

          hovered: {
            background: brand,
            contentColor: 'var(--color-body-contentColor)',
          },
          pressed: {
            background: brand,
            contentColor: 'var(--color-body-contentColor)',
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
          contentColor: 'white',
        },

        button: {
          background: 'transparent',

          hovered: {
            background: '#555',
          },
        },

        brand: {
          background: brand,

          hovered: {
            background: '#555',
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
      <Text variant="xLarge">brand color</Text>
      <ColorPicker color={color} onChange={onColorChange} />

      <ExampleBox title="Light" theme={lightTheme} />
      <ExampleBox title="Dark" theme={darkTheme} />
    </Stack>
  );
};
