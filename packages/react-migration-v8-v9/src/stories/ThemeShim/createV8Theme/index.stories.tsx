import * as React from 'react';

import { Theme as ThemeV8, ThemeProvider } from '@fluentui/react';
import {
  Button,
  makeStyles,
  shorthands,
  webLightTheme,
  Theme as ThemeV9,
  createLightTheme,
  createDarkTheme,
  Input,
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

import { getBrandTokensFromPalette } from './colorHelpers';

const { useState, useCallback, useMemo } = React;

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
  wizardActionBar: {
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

enum ThemeCreationSteps {
  ChoseBaseTheme,
  CustomizeBrandRamp,
  ThemeCreated,
}

const defaultLightBrandRampStart = '#0f6cbd';
const defaultDarkBrandRampStart = '#479ef5';

export const Default = () => {
  const styles = useStyles();

  const defaultV9ThemeText = JSON.stringify(webLightTheme, null, 4);

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [brandStartValue, setBrandStartValue] = useState<string>(defaultLightBrandRampStart);
  const [currentStep, setCurrentStep] = useState<ThemeCreationSteps>(ThemeCreationSteps.ChoseBaseTheme);
  const [v9ThemeText, setV9ThemeText] = useState(defaultV9ThemeText);
  const [v8Theme, setV8Theme] = useState<ThemeV8>();
  const [errorMessage, setErrorMessage] = useState('');

  const v8Effects = useMemo(() => ((v8Theme ? v8Theme.effects : {}) as unknown) as Record<string, string>, [v8Theme]);
  const v8Fonts = useMemo(() => ((v8Theme ? v8Theme.fonts : {}) as unknown) as Record<string, string>, [v8Theme]);
  const v8Spacing = useMemo(() => ((v8Theme ? v8Theme.spacing : {}) as unknown) as Record<string, string>, [v8Theme]);
  const v8Palette = useMemo(() => ((v8Theme ? v8Theme.palette : {}) as unknown) as Record<string, string>, [v8Theme]);
  const v8SemanticColors = useMemo(
    () => ((v8Theme ? v8Theme.semanticColors : {}) as unknown) as Record<string, string>,
    [v8Theme],
  );

  const onCreateTheme = () => {
    try {
      const v9BrandVariants = getBrandTokensFromPalette(brandStartValue, {
        darkCp: 0,
        lightCp: 0,
        hueTorsion: 0,
      });
      const v9Theme = JSON.parse(v9ThemeText) as ThemeV9;
      const newV8Theme = createV8Theme(v9BrandVariants, v9Theme, isDarkTheme);
      setV8Theme(newV8Theme);
      setCurrentStep(ThemeCreationSteps.ThemeCreated);
    } catch (e) {
      setErrorMessage((e as Error).message);
    }
  };

  const onStartOver = () => {
    setIsDarkTheme(false);
    setBrandStartValue(defaultLightBrandRampStart);
    setCurrentStep(ThemeCreationSteps.ChoseBaseTheme);
  };

  const setPostBrandRampSelectionState = (isDark: boolean, isCustom: boolean) => {
    const v9Theme = isDark ? createDarkTheme(brandWeb) : createLightTheme(brandWeb);
    setV9ThemeText(JSON.stringify(v9Theme, null, 4));
    setIsDarkTheme(isDark);
    setCurrentStep(ThemeCreationSteps.CustomizeBrandRamp);

    isDark ? setBrandStartValue(defaultDarkBrandRampStart) : setBrandStartValue(defaultLightBrandRampStart);
  };

  const selectV9LightBrandRamp = useCallback(() => {
    setPostBrandRampSelectionState(false, false);
  }, [isDarkTheme, v9ThemeText, currentStep, brandStartValue]);

  const selectV9DarkBrandRamp = useCallback(() => {
    setPostBrandRampSelectionState(true, false);
  }, [isDarkTheme, v9ThemeText, currentStep, brandStartValue]);

  const handleKeyColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // check if the newly inputted hex code has a #
    const newHexColor = '#' + e.target.value.replace(/\W/g, '').toUpperCase();
    setBrandStartValue(newHexColor);
  };

  return (
    <div className={styles.root}>
      {currentStep === ThemeCreationSteps.ChoseBaseTheme && (
        <>
          <h2>Light or dark theme?</h2>
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Button icon={<ChevronDown12Regular />} iconPosition="after">
                {'Select theme type'}
              </Button>
            </MenuTrigger>
            {/* It's likley we'll add a high contrast mode some day, so don't use a toggle.*/}
            <MenuPopover>
              <MenuList>
                <MenuItem onClick={selectV9LightBrandRamp}>Light </MenuItem>
                <MenuItem onClick={selectV9DarkBrandRamp}>Dark</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </>
      )}

      {currentStep === ThemeCreationSteps.CustomizeBrandRamp && (
        <>
          <h2>Customize your brand ramp</h2>
          <Label>Brand ramp starting value</Label>
          <Input id={'keyColor'} value={brandStartValue} onChange={handleKeyColorChange} maxLength={7} />
          <div className={styles.wizardActionBar}>
            <Button appearance="primary" onClick={onCreateTheme}>
              Create theme
            </Button>
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
          <div>{errorMessage}</div>
          <h3>Effects</h3>
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
          <h3>Fonts</h3>
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
          <h3>Palette</h3>
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
          <h3>SemanticColors</h3>
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
          <h3>Spacing</h3>
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
