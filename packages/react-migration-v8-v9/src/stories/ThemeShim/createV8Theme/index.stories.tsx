import * as React from 'react';

import { Theme as ThemeV8 } from '@fluentui/react';
import {
  Button,
  makeStyles,
  Textarea,
  TextareaProps,
  shorthands,
  webLightTheme,
  BrandVariants,
  Theme as ThemeV9,
  createLightTheme,
  createDarkTheme,
  Checkbox,
} from '@fluentui/react-components';
import { brandWeb, createV8Theme } from '../../../components/Theme/index';
import descriptionMd from './Description.md';
import { Meta } from '@storybook/react';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto',
    gridRowGap: '10px',
    justifyItems: 'start',
    ...shorthands.padding('5px'),
  },
  editor: {
    width: '400px',
    height: '300px',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',

    [`& > *`]: {
      ...shorthands.margin('5px'),
    },
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
    ...shorthands.border('1px', 'solid', 'black'),
  },
});

export const Default = () => {
  const styles = useStyles();

  const defaultBrandVariantText = JSON.stringify(brandWeb, null, 4);
  const defaultV9ThemeText = JSON.stringify(webLightTheme, null, 4);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [brandVariantText, setBrandVariantText] = React.useState(defaultBrandVariantText);
  const [v9ThemeText, setV9ThemeText] = React.useState(defaultV9ThemeText);
  const [v8Theme, setV8Theme] = React.useState<ThemeV8>();

  const v8Effects = React.useMemo(() => ((v8Theme ? v8Theme.effects : {}) as unknown) as Record<string, string>, [
    v8Theme,
  ]);

  const v8Fonts = React.useMemo(() => ((v8Theme ? v8Theme.fonts : {}) as unknown) as Record<string, string>, [v8Theme]);

  const v8Spacing = React.useMemo(() => ((v8Theme ? v8Theme.spacing : {}) as unknown) as Record<string, string>, [
    v8Theme,
  ]);

  const v8Palette = React.useMemo(() => ((v8Theme ? v8Theme.palette : {}) as unknown) as Record<string, string>, [
    v8Theme,
  ]);

  const v8SemanticColors = React.useMemo(
    () => ((v8Theme ? v8Theme.semanticColors : {}) as unknown) as Record<string, string>,
    [v8Theme],
  );

  const [message, setMessage] = React.useState('');

  const onBrandVariantTextChange: TextareaProps['onChange'] = (_, data) => {
    setBrandVariantText(data.value);
  };

  const onV9ThemeTextChange: TextareaProps['onChange'] = (_, data) => {
    setV9ThemeText(data.value);
  };

  const onResetBrand = () => {
    setBrandVariantText(defaultBrandVariantText);
  };

  const onResetTheme = () => {
    setV9ThemeText(defaultV9ThemeText);
  };

  const onSetLightBrandTheme = React.useCallback(() => {
    const brandVariants = JSON.parse(brandVariantText) as BrandVariants;
    const v9Theme = createLightTheme(brandVariants);
    setV9ThemeText(JSON.stringify(v9Theme, null, 4));
    setIsDarkTheme(false);
  }, [brandVariantText]);

  const onSetDarkBrandTheme = React.useCallback(() => {
    const brandVariants = JSON.parse(brandVariantText) as BrandVariants;
    const v9Theme = createDarkTheme(brandVariants);
    setV9ThemeText(JSON.stringify(v9Theme, null, 4));
    setIsDarkTheme(true);
  }, [brandVariantText]);

  const onCreateTheme = React.useCallback(() => {
    try {
      const brandVariants = JSON.parse(brandVariantText) as BrandVariants;
      const v9Theme = JSON.parse(v9ThemeText) as ThemeV9;
      const newV8Theme = createV8Theme(brandVariants, v9Theme, isDarkTheme);
      setV8Theme(newV8Theme);
    } catch (e) {
      setMessage((e as Error).message);
    }
  }, [brandVariantText, isDarkTheme, v9ThemeText]);

  return (
    <div className={styles.root}>
      <h2>Brand</h2>
      <Textarea
        resize="both"
        textarea={{ className: styles.editor }}
        value={brandVariantText}
        onChange={onBrandVariantTextChange}
      />
      <div className={styles.actions}>
        <Button onClick={onResetBrand}>Reset</Button>
        <Button onClick={onSetLightBrandTheme}>Set Light v9 Theme from Brand</Button>
        <Button onClick={onSetDarkBrandTheme}>Set Dark v9 Theme from Brand</Button>
      </div>
      <h2>v9 Theme</h2>
      <Textarea
        resize="both"
        textarea={{ className: styles.editor }}
        value={v9ThemeText}
        onChange={onV9ThemeTextChange}
      />
      <div className={styles.actions}>
        <Button onClick={onResetTheme}>Reset</Button>
        <Button onClick={onCreateTheme}>Create</Button>
        <Checkbox
          label="Dark Theme"
          checked={isDarkTheme}
          onChange={(_, data) => setIsDarkTheme(data.checked === true)}
        />
      </div>
      <h2>v8 Theme</h2>
      <div>{message}</div>
      <h3>effects</h3>
      <div className={styles.result}>
        {Object.keys(v8Effects)
          .sort()
          .map(key => (
            <>
              <div>{key}</div>
              <div>{v8Effects[key]}</div>
            </>
          ))}
      </div>
      <h3>fonts</h3>
      <div className={styles.result}>
        {Object.keys(v8Fonts)
          .sort()
          .map(key => (
            <>
              <div>{key}</div>
              <div>{JSON.stringify(v8Fonts[key])}</div>
            </>
          ))}
      </div>
      <h3>palette</h3>
      <div className={styles.result}>
        {Object.keys(v8Palette)
          .sort()
          .map(key => (
            <>
              <div>{key}</div>
              <div>
                {v8Palette[key]}&nbsp;
                <span className={styles.colorBlock} style={{ backgroundColor: v8Palette[key] }} />
              </div>
            </>
          ))}
      </div>
      <h3>semanticColors</h3>
      <div className={styles.result}>
        {Object.keys(v8SemanticColors)
          .sort()
          .map(key => (
            <>
              <div>{key}</div>
              <div>
                {v8SemanticColors[key]}&nbsp;
                <span className={styles.colorBlock} style={{ backgroundColor: v8SemanticColors[key] }} />
              </div>
            </>
          ))}
      </div>
      <h3>spacing</h3>
      <div className={styles.result}>
        {Object.keys(v8Spacing)
          .sort()
          .map(key => (
            <>
              <div>{key}</div>
              <div>{v8Spacing[key]}</div>
            </>
          ))}
      </div>
    </div>
  );
};

export default {
  title: 'Migration Shims/Theme/createV8Theme',
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
} as Meta;
