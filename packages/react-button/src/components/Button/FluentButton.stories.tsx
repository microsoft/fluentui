import * as React from 'react';
import { Button } from './Button';
import { PartialTheme, ThemeProvider } from '@fluentui/react-theme-provider';
import { Stack, Toggle } from 'office-ui-fabric-react';

// tslint:disable: jsx-ban-props

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

export const FluentButton = () => {
  const [enabled, setEnabled] = React.useState(true);
  const onChange = () => {
    setEnabled(!enabled);
  };
  return (
    <ThemeProvider theme={FluentTheme}>
      <Toggle defaultChecked={enabled} onText="Buttons enabled" offText="Buttons disabled" onChange={onChange} />
      <Stack horizontal gap={20}>
        <Button disabled={!enabled} content="I am a button" />
        <Button disabled={!enabled} primary content="I am a primary button" />
      </Stack>
    </ThemeProvider>
  );
};
