import * as React from 'react';
import type { Meta } from '@storybook/react';

import { createTheme, Theme as ThemeV8, ThemeProvider, initializeIcons } from '@fluentui/react';
import {
  Button,
  makeStyles,
  Textarea,
  TextareaProps,
  webLightTheme,
  BrandVariants,
  Theme as ThemeV9,
  createLightTheme,
  createDarkTheme,
  tokens,
  FluentProvider,
} from '@fluentui/react-components';
import { brandWeb, createV8Theme } from '@fluentui/react-migration-v8-v9';

import descriptionMd from './Description.md';
import { ThemePreviewV8 } from '../ThemePreviewV8.stories';
import { ThemePreviewV9 } from '../ThemePreviewV9.stories';

initializeIcons();

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
    display: 'flex',
    flexDirection: 'row',

    [`& > *`]: {
      margin: '5px',
    },
  },
  error: {
    color: 'red',
  },
  result: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: 'auto',
    columnGap: '5px',
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

  const defaultBrandVariantText = JSON.stringify(brandWeb, null, 4);
  const [brandVariantText, setBrandVariantText] = React.useState(defaultBrandVariantText);
  const defaultV9Theme = webLightTheme;
  const defaultV9ThemeText = JSON.stringify(defaultV9Theme, null, 4);
  const [v9Theme, setV9Theme] = React.useState<ThemeV9>(defaultV9Theme);
  const [v9ThemeText, setV9ThemeText] = React.useState(defaultV9ThemeText);
  const [createV9ThemeError, setCreateV9ThemeError] = React.useState('');
  const [previewV9ThemeError, setPreviewV9ThemeError] = React.useState('');

  const defaultV8Theme = createTheme();
  const defaultV8ThemeText = JSON.stringify(defaultV8Theme, null, 4);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [v8Theme, setV8Theme] = React.useState<ThemeV8>(defaultV8Theme);
  const [v8ThemeText, setV8ThemeText] = React.useState(defaultV8ThemeText);
  const [createV8ThemeError, setCreateV8ThemeError] = React.useState('');

  const onBrandVariantTextChange: TextareaProps['onChange'] = (_, data) => {
    setBrandVariantText(data.value);
  };

  const onV9ThemeTextChange: TextareaProps['onChange'] = (_, data) => {
    setV9ThemeText(data.value);
  };

  const onResetBrand = () => {
    setBrandVariantText(defaultBrandVariantText);
  };

  const onResetV9Theme = () => {
    setV9Theme(defaultV9Theme);
    setV9ThemeText(defaultV9ThemeText);
    setCreateV9ThemeError('');
    setPreviewV9ThemeError('');
  };

  const onCreateLightV9Theme = React.useCallback(() => {
    try {
      setCreateV9ThemeError('');
      const brandVariants = JSON.parse(brandVariantText) as BrandVariants;
      const newV9Theme = createLightTheme(brandVariants);
      setV9Theme(newV9Theme);
      setV9ThemeText(JSON.stringify(newV9Theme, null, 4));
      setIsDarkTheme(false);
    } catch (e) {
      setCreateV9ThemeError((e as Error).message);
    }
  }, [brandVariantText]);

  const onCreateDarkv9Theme = React.useCallback(() => {
    try {
      setCreateV9ThemeError('');
      const brandVariants = JSON.parse(brandVariantText) as BrandVariants;
      const newV9Theme = createDarkTheme(brandVariants);
      setV9Theme(newV9Theme);
      setV9ThemeText(JSON.stringify(newV9Theme, null, 4));
      setIsDarkTheme(true);
    } catch (e) {
      setCreateV9ThemeError((e as Error).message);
    }
  }, [brandVariantText]);

  const onPreviewV9Theme = React.useCallback(() => {
    try {
      setPreviewV9ThemeError('');
      const newV9Theme = JSON.parse(v9ThemeText) as ThemeV9;
      setV9Theme(newV9Theme);
    } catch (e) {
      setPreviewV9ThemeError((e as Error).message);
    }
  }, [v9ThemeText]);

  const onCreateV8Theme = React.useCallback(() => {
    try {
      setCreateV8ThemeError('');
      const newV9Theme = JSON.parse(v9ThemeText) as ThemeV9;
      setV9Theme(newV9Theme);
      const brandVariants = JSON.parse(brandVariantText) as BrandVariants;
      const newV8Theme = createV8Theme(brandVariants, newV9Theme, isDarkTheme);
      setV8Theme(newV8Theme);
      setV8ThemeText(JSON.stringify(newV8Theme, null, 4));
    } catch (e) {
      setCreateV8ThemeError((e as Error).message);
    }
  }, [brandVariantText, isDarkTheme, v9ThemeText]);

  const onResetV8Theme = () => {
    setV8Theme(defaultV8Theme);
    setV8ThemeText(defaultV8ThemeText);
    setCreateV8ThemeError('');
  };

  return (
    <div className={styles.root}>
      <h2>1. Define Brand Variants</h2>
      <div className={styles.instructions}>
        <p>Adjust the brand variants (aka brand ramp). You can reset to the default brand colors.</p>
        <p>
          If you want to generate entirely different brand variants or v9 theme, use the&nbsp;
          <a href="https://aka.ms/themedesigner-v9">v9 Theme Designer</a>.
        </p>
      </div>
      <div className={styles.actions}>
        <Button onClick={onResetBrand}>Reset</Button>
      </div>
      <Textarea
        resize="both"
        textarea={{ className: styles.editor }}
        value={brandVariantText}
        onChange={onBrandVariantTextChange}
      />
      <h2>2. Create a v9 Theme</h2>
      <div className={styles.instructions}>
        Create a light or dark v9 theme from the brand variants. You can adjust the theme and click preview anytime.
        them.
      </div>
      <div className={styles.actions}>
        <Button onClick={onResetV9Theme}>Reset</Button>
        <Button onClick={onCreateLightV9Theme}>Create Light Theme</Button>
        <Button onClick={onCreateDarkv9Theme}>Create Dark Theme</Button>
      </div>
      <div className={styles.error}>{createV9ThemeError}</div>
      <Textarea
        resize="both"
        textarea={{ className: styles.editor }}
        value={v9ThemeText}
        onChange={onV9ThemeTextChange}
      />
      <div className={styles.actions}>
        <Button onClick={onPreviewV9Theme}>Preview</Button>
      </div>
      <div className={styles.error}>{previewV9ThemeError}</div>
      <FluentProvider theme={v9Theme}>
        <ThemePreviewV9 />
      </FluentProvider>
      <h2>3. Create a v8 Theme</h2>
      <div className={styles.instructions}>
        Create a v8 theme from the v9 theme. You can copy the result to use it in your application.
      </div>
      <div className={styles.actions}>
        <Button onClick={onResetV8Theme}>Reset</Button>
        <Button onClick={onCreateV8Theme}>Create</Button>
      </div>
      <div className={styles.error}>{createV8ThemeError}</div>
      <div>
        <ThemeProvider theme={v8Theme}>
          <ThemePreviewV8
            backgroundColor={v8Theme?.semanticColors.bodyBackground || 'white'}
            textColor={v8Theme?.semanticColors.bodyText || 'black'}
          />
        </ThemeProvider>
      </div>
      <Textarea resize="both" readOnly textarea={{ className: styles.editor }} value={v8ThemeText} />
    </div>
  );
};

export default {
  title: 'Migration Shims/V8/Theme/createV8Theme',
  component: React.Fragment,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
} as Meta;
