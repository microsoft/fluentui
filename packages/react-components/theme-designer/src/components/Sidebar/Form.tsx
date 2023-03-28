/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import type { CustomAttributes } from '../../Context/ThemeDesignerContext';
import { useThemeDesigner } from '../../Context/ThemeDesignerContext';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Button,
  Input,
  Label,
  Slider,
  Switch,
  tokens,
  useId,
} from '@fluentui/react-components';
import { defaultThemePlaceholderName } from '../../Context/ThemeDesignerContext';
import { AccessibilityPanel } from './AccessibilityPanel';
import { useDebounce } from '../../utils/useDebounce';

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  accordianContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalL,
    marginTop: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalL,
    paddingRight: tokens.spacingHorizontalXXXL,
  },
  keyColor: {
    paddingLeft: '0px',
  },
  labels: {
    display: 'grid',
    gridTemplateColumns: '135px 30px',
    columnGap: tokens.spacingVerticalL,
  },
  colorPicker: {
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.borderRadius('25px'),
    height: '30px',
    width: '30px',
    ...shorthands.overflow('hidden'),
  },
  color: {
    ...shorthands.padding('0px'),
    ...shorthands.border('0px'),
    opacity: '0',
  },
  slider: {
    display: 'grid',
    gridTemplateColumns: '115px 50px',
    columnGap: '15px',
  },
  element: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  labelName: {
    // Stack the label above the field
    display: 'flex',
    flexDirection: 'column',
    // Use 2px gap below the label (per the design system)
    ...shorthands.gap('2px'),
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: '400px',
  },
  export: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '20px',
  },
});

export const Form: React.FC = () => {
  const styles = useStyles();
  const sidebarId = useId();

  const {
    dispatch,
    state: { isDark, themeName, darkThemeOverrides, lightThemeOverrides, brand },
  } = useThemeDesigner();
  const themeNameInputId = useId('themeNameInputId');

  const handleIsDarkChange = () => {
    dispatch({ type: 'isDark', payload: !isDark });
  };

  const initialState: CustomAttributes = {
    keyColor: '#0F6CBD',
    hueTorsion: 0,
    vibrancy: 0,
  };

  const [keyColor, setKeyColor] = React.useState<string>(initialState.keyColor);
  const [hueTorsion, setHueTorsion] = React.useState<number>(initialState.hueTorsion);
  const [vibrancy, setVibrancy] = React.useState<number>(initialState.vibrancy * 100);

  // as the user moves through the wheel, we want the page to react in real time
  const debounceKeyColor: string = useDebounce(keyColor, 100);

  React.useEffect(() => {
    dispatch({
      type: 'updateThemeWithCustomerAttributes',
      payload: { keyColor: debounceKeyColor, hueTorsion: hueTorsion / 100, vibrancy: vibrancy / 100 },
    });
  }, [dispatch, debounceKeyColor, hueTorsion, vibrancy]);

  const handleKeyColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // check if the newly inputted hex code has a #
    const newHexColor = '#' + e.target.value.replace(/\W/g, '').toUpperCase();
    setKeyColor(newHexColor);
  };
  const handleHueTorsionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHueTorsion(parseInt(e.target.value, 10));
  };
  const handleVibrancyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVibrancy(parseInt(e.target.value, 10));
  };

  const handleThemeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;

    if (newName.length === 0) {
      dispatch({ type: 'themeName', payload: newName });
    } else {
      const camelizeName = e.target.value
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) => (idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()))
        .replace(/\s+/g, '')
        .replace(/[^A-Za-z0-9@]*/g, ``);
      dispatch({ type: 'themeName', payload: camelizeName });
    }
  };

  const showExportButton = () => {
    dispatch({ type: 'showExportPanel', payload: true });
  };

  return (
    <div className={styles.root} role="tabpanel" aria-labelledby="Edit">
      <Accordion defaultOpenItems={['1']} multiple>
        {/* `multiple` allows for toggle of collapse as well as open multiple panels */}
        <AccordionItem value="1">
          <AccordionHeader>Step 1 - Color settings</AccordionHeader>
          <AccordionPanel className={styles.accordianContainer}>
            <div className={styles.inputs}>
              <Label htmlFor={sidebarId + 'keyColor'}>Key color value</Label>
              <div className={styles.labels}>
                <Input
                  className={styles.keyColor}
                  size="large"
                  appearance="underline"
                  id={sidebarId + 'keyColor'}
                  value={keyColor}
                  onChange={handleKeyColorChange}
                  maxLength={7}
                />
                <div className={styles.colorPicker} style={{ backgroundColor: keyColor }}>
                  <input
                    className={styles.color}
                    type="color"
                    id={sidebarId + 'keyColor Color'}
                    onChange={handleKeyColorChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor={sidebarId + 'hueTorsion'}>Hue Torsion</Label>
              <div className={styles.slider}>
                <Slider
                  size="small"
                  min={-50}
                  max={50}
                  id={sidebarId + 'hueTorsion'}
                  value={hueTorsion}
                  onChange={handleHueTorsionChange}
                />
                <Input
                  size="small"
                  type="number"
                  min={-50}
                  max={50}
                  appearance="outline"
                  id={sidebarId + 'hueTorsion input'}
                  value={hueTorsion.toString()}
                  onChange={handleHueTorsionChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor={sidebarId + 'vibrancy'}>Vibrancy</Label>
              <div className={styles.slider}>
                <Slider
                  size="small"
                  min={-50}
                  max={50}
                  id={sidebarId + 'vibrancy'}
                  value={vibrancy}
                  onChange={handleVibrancyChange}
                />
                <Input
                  size="small"
                  type="number"
                  min={-50}
                  max={50}
                  appearance="outline"
                  id={sidebarId + 'vibrancy input'}
                  value={vibrancy.toString()}
                  onChange={handleVibrancyChange}
                />
              </div>
            </div>
            <Switch checked={isDark} onChange={handleIsDarkChange} label={isDark ? 'dark theme' : 'light theme'} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionHeader>Step 2 - Contrast check</AccordionHeader>
          <AccordionPanel>
            <AccessibilityPanel
              darkThemeOverrides={darkThemeOverrides}
              brand={brand}
              lightThemeOverrides={lightThemeOverrides}
            />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionHeader>Step 3 - Export</AccordionHeader>
          <AccordionPanel>
            <div className={styles.labelName}>
              <Label htmlFor={themeNameInputId}>Theme name</Label>
              <Input
                appearance="outline"
                id={themeNameInputId}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={handleThemeNameChange}
                // contentAfter={<EditRegular />}
                placeholder={defaultThemePlaceholderName}
                value={themeName === defaultThemePlaceholderName ? '' : themeName}
              />
            </div>
            <br />
            <Button size="small" appearance="primary" onClick={showExportButton}>
              Export
            </Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
