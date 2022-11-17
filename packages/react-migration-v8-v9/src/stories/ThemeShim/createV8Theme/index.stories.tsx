import * as React from 'react';

import { Theme as ThemeV8, ThemeProvider, Tooltip } from '@fluentui/react';
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
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Label,
} from '@fluentui/react-components';
import { brandWeb, createV8Theme } from '../../../components/Theme/index';
import descriptionMd from './Description.md';
import { Meta } from '@storybook/react';
import { FluentComponentSamples } from './FluentComponentSamples';
import { ChevronDown12Regular } from '@fluentui/react-icons';

const { useState } = React;

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

enum BrandRampType {
  V9Light = 'V9 Light',
  V9Dark = 'V9 Dark',
  Custom = 'Custom',
}

enum ThemeCreationSteps {
  ChoseBaseBrandRamp,
  CustomizeBrandRamp,
  CustomizeTokens,
  ThemeCreated,
}

export const Default = () => {
  const styles = useStyles();

  const defaultBrandVariantText = JSON.stringify(brandWeb, null, 4);
  const defaultV9ThemeText = JSON.stringify(webLightTheme, null, 4);

  const [brandRampType, setBrandRampType] = useState<BrandRampType>();

  const [currentStep, setCurrentStep] = useState<ThemeCreationSteps>(ThemeCreationSteps.ChoseBaseBrandRamp);

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [brandVariantText, setBrandVariantText] = useState(defaultBrandVariantText);
  const [v9ThemeText, setV9ThemeText] = useState(defaultV9ThemeText);
  const [v8Theme, setV8Theme] = useState<ThemeV8>();

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
    console.log(data.value);
    setBrandVariantText(data.value);
  };

  const onV9ThemeTextChange: TextareaProps['onChange'] = (_, data) => {
    setV9ThemeText(data.value);
  };

  const onStartOver = () => {
    setBrandRampType(undefined);
    setBrandVariantText(defaultBrandVariantText);
    setCurrentStep(ThemeCreationSteps.ChoseBaseBrandRamp);
  };

  const selectV9LightBrandRamp = React.useCallback(() => {
    const v9Theme = createLightTheme(brandWeb);
    setV9ThemeText(JSON.stringify(v9Theme, null, 4));
    setIsDarkTheme(false);
    setBrandRampType(BrandRampType.V9Light);
    setCurrentStep(ThemeCreationSteps.CustomizeTokens);
  }, [brandRampType]);

  const selectV9DarkBrandRamp = React.useCallback(() => {
    const v9Theme = createDarkTheme(brandWeb);
    setV9ThemeText(JSON.stringify(v9Theme, null, 4));
    setIsDarkTheme(true);
    setBrandRampType(BrandRampType.V9Dark);
    setCurrentStep(ThemeCreationSteps.CustomizeTokens);
  }, [brandRampType]);

  const selectCustomBrandRamp = React.useCallback(() => {
    const v9Theme = createLightTheme(brandWeb);
    setV9ThemeText(JSON.stringify(v9Theme, null, 4));
    setIsDarkTheme(true);
    setBrandRampType(BrandRampType.Custom);
    setCurrentStep(ThemeCreationSteps.CustomizeBrandRamp);
  }, [brandRampType]);

  const onCreateTheme = React.useCallback(() => {
    try {
      const brandVariants = JSON.parse(brandVariantText) as BrandVariants;
      const v9Theme = JSON.parse(v9ThemeText) as ThemeV9;
      const newV8Theme = createV8Theme(brandVariants, v9Theme, isDarkTheme);
      setV8Theme(newV8Theme);
      setCurrentStep(ThemeCreationSteps.ThemeCreated);
    } catch (e) {
      setMessage((e as Error).message);
    }
  }, [brandVariantText, isDarkTheme, v9ThemeText, currentStep]);
  return (
    <div className={styles.root}>
      {currentStep === ThemeCreationSteps.ChoseBaseBrandRamp && (
        <>
          {' '}
          <h2>Select your brand ramp</h2>
          <Label>Current brand ramp</Label>
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Button icon={<ChevronDown12Regular />} iconPosition="after">
                {brandRampType ? brandRampType : 'Select Brand Ramp Type'}
              </Button>
            </MenuTrigger>

            <MenuPopover>
              <MenuList>
                <MenuItem onClick={selectV9LightBrandRamp}>V9 Light </MenuItem>
                <MenuItem onClick={selectV9DarkBrandRamp}>V9 Dark</MenuItem>
                <MenuItem onClick={selectCustomBrandRamp}>Custom</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </>
      )}

      {currentStep === ThemeCreationSteps.CustomizeBrandRamp && (
        <>
          {' '}
          <h2>Customize your brand ramp</h2>
          <Textarea
            resize="both"
            disabled={brandRampType !== BrandRampType.Custom}
            textarea={{ className: styles.editor }}
            value={brandVariantText}
            onChange={onBrandVariantTextChange}
          />{' '}
          <Button onClick={onStartOver}>Start over</Button>
        </>
      )}

      {currentStep === ThemeCreationSteps.CustomizeTokens && (
        <>
          <h2>Adjust any generated v9 Theme token values</h2>
          <Textarea
            resize="both"
            textarea={{ className: styles.editor }}
            value={v9ThemeText}
            onChange={onV9ThemeTextChange}
          />
          <div className={styles.actions}>
            <Button appearance="primary" onClick={onCreateTheme}>
              Create my theme
            </Button>
            <Checkbox
              label="Dark Theme"
              checked={isDarkTheme}
              onChange={(_, data) => setIsDarkTheme(data.checked === true)}
            />
            <Button onClick={onStartOver}>Start over</Button>
          </div>
        </>
      )}
      {currentStep === ThemeCreationSteps.ThemeCreated && (
        <>
          <h2>Your new v8 Theme</h2>
          <Button onClick={onStartOver}>Start over</Button>
          <ThemeProvider theme={v8Theme}>
            <FluentComponentSamples />
          </ThemeProvider>
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
        </>
      )}
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
