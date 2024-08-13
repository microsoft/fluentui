import * as React from 'react';
import type { Meta } from '@storybook/react';

import { createTheme, ThemeProvider, Theme as ThemeV8, DefaultPalette } from '@fluentui/react';
import {
  Button,
  makeStyles,
  Textarea,
  TextareaProps,
  tokens,
  Theme as ThemeV9,
  webLightTheme,
  FluentProvider,
} from '@fluentui/react-components';
import { createV9Theme } from '@fluentui/react-migration-v8-v9';

import descriptionMd from './Description.md';
import { ThemePreviewV8 } from '../ThemePreviewV8.stories';
import { ThemePreviewV9 } from '../ThemePreviewV9.stories';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto',
    gridRowGap: '10px',
    justifyItems: 'start',
    padding: '5px',
  },
  instructions: {
    color: tokens.colorNeutralForeground2,
  },
  editor: {
    width: '400px',
    height: '300px',
  },
  actions: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridColumnGap: '10px',
    justifyItems: 'start',
  },
  error: {
    color: 'red',
  },
  result: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: 'auto',
    columnGap: '10px',
    rowGap: '5px',
  },
  colorBlock: {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    border: '1px solid black',
  },
});

export const Playground = () => {
  const styles = useStyles();

  const defaultPaletteText = JSON.stringify(DefaultPalette, null, 4);
  const [paletteText, setPaletteText] = React.useState(defaultPaletteText);

  const defaultV8Theme = createTheme();
  const defaultV8ThemeText = JSON.stringify(defaultV8Theme, null, 4);
  const [v8ThemeText, setV8ThemeText] = React.useState(defaultV8ThemeText);
  const [v8Theme, setV8Theme] = React.useState<ThemeV8>(defaultV8Theme);
  const [createV8ThemeError, setCreateV8ThemeError] = React.useState('');
  const [previewV8ThemeError, setPreviewV8ThemeError] = React.useState('');

  const defaultV9Theme = webLightTheme;
  const defaultV9ThemeText = JSON.stringify(defaultV9Theme, null, 4);
  const [v9Theme, setV9Theme] = React.useState<ThemeV9>(defaultV9Theme);
  const [v9ThemeText, setV9ThemeText] = React.useState(defaultV9ThemeText);
  const [createV9ThemeError, setCreateV9ThemeError] = React.useState('');

  const onPaletteTextChange: TextareaProps['onChange'] = (_, data) => {
    setPaletteText(data.value);
  };

  const onV8ThemeTextChange: TextareaProps['onChange'] = (_, data) => {
    setV8ThemeText(data.value);
  };

  const onResetPalette = () => {
    setPaletteText(defaultPaletteText);
  };

  const onResetV8Theme = () => {
    setV8Theme(defaultV8Theme);
    setV8ThemeText(defaultV8ThemeText);
    setCreateV8ThemeError('');
    setPreviewV8ThemeError('');
  };

  const onCreateV8Theme = React.useCallback(() => {
    try {
      setCreateV8ThemeError('');
      const palette = JSON.parse(paletteText);
      const newPalette = { ...DefaultPalette, ...palette };
      const newV8Theme = createTheme({ palette: newPalette });
      setV8Theme(newV8Theme);
      setV8ThemeText(JSON.stringify(newV8Theme, null, 4));
    } catch (e) {
      setCreateV8ThemeError((e as Error).message);
    }
  }, [paletteText]);

  const onPreviewV8Theme = React.useCallback(() => {
    try {
      setPreviewV8ThemeError('');
      const newV8Theme = JSON.parse(v8ThemeText);
      setV8Theme(newV8Theme);
    } catch (e) {
      setPreviewV8ThemeError((e as Error).message);
    }
  }, [v8ThemeText]);

  const onResetV9Theme = () => {
    setV9Theme(defaultV9Theme);
    setV9ThemeText(defaultV9ThemeText);
    setCreateV9ThemeError('');
  };

  const onCreateV9Theme = React.useCallback(() => {
    try {
      setCreateV9ThemeError('');
      const newV8Theme = JSON.parse(v8ThemeText);
      setV8Theme(newV8Theme);
      const newV9Theme = createV9Theme(newV8Theme);
      setV9Theme(newV9Theme);
      setV9ThemeText(JSON.stringify(newV9Theme, null, 4));
    } catch (e) {
      setCreateV9ThemeError((e as Error).message);
    }
  }, [v8ThemeText]);

  return (
    <div className={styles.root}>
      <h2>1. Define a v8 Palette</h2>
      <div className={styles.instructions}>
        <p>Adjust the palette. You can reset to the default colors.</p>
        <p>
          If you want to generate an entirely different v8 palette, use the&nbsp;
          <a href="https://aka.ms/themedesigner">v8 Theme Designer</a>.
        </p>
      </div>
      <div className={styles.actions}>
        <Button onClick={onResetPalette}>Reset</Button>
      </div>
      <Textarea
        resize="both"
        textarea={{ className: styles.editor }}
        value={paletteText}
        onChange={onPaletteTextChange}
      />
      <h2>2. Create a v8 Theme</h2>
      <div className={styles.instructions}>
        <p>Create a v8 theme from the palette.</p>
        <p>You can adjust the theme and click preview to see the result.</p>
      </div>
      <div className={styles.actions}>
        <Button onClick={onResetV8Theme}>Reset</Button>
        <Button onClick={onCreateV8Theme}>Create</Button>
      </div>
      <div className={styles.error}>{createV8ThemeError}</div>
      <Textarea
        resize="both"
        textarea={{ className: styles.editor }}
        value={v8ThemeText}
        onChange={onV8ThemeTextChange}
      />
      <h3>v8 Theme</h3>
      <div className={styles.actions}>
        <Button onClick={onPreviewV8Theme}>Preview</Button>
      </div>
      <div className={styles.error}>{previewV8ThemeError}</div>
      <div>
        <ThemeProvider theme={v8Theme}>
          <ThemePreviewV8
            backgroundColor={v8Theme?.semanticColors.bodyBackground || 'white'}
            textColor={v8Theme?.semanticColors.bodyText || 'black'}
          />
        </ThemeProvider>
      </div>
      <h2>2. Create a v9 Theme</h2>
      <p className={styles.instructions}>
        Create a v9 theme from the v8 theme. You can copy the result to use it in your application.
      </p>
      <div className={styles.actions}>
        <Button onClick={onResetV9Theme}>Reset</Button>
        <Button onClick={onCreateV9Theme}>Create</Button>
      </div>
      <div className={styles.error}>{createV9ThemeError}</div>

      <FluentProvider theme={v9Theme}>
        <ThemePreviewV9 />
      </FluentProvider>
      <h3>v9 Theme</h3>
      <Textarea resize="both" textarea={{ className: styles.editor }} value={v9ThemeText} readOnly />
    </div>
  );
};

export default {
  title: 'Migration Shims/V8/Theme/createV9Theme',
  component: React.Fragment,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
} as Meta;
