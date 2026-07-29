/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { useThemeDesigner } from '../../Context/ThemeDesignerContext';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Button,
  Input,
  Slider,
  useId,
  Caption1Stronger,
  Field,
} from '@fluentui/react-components';
import { defaultThemePlaceholderName } from '../../Context/ThemeDesignerContext';
// import { AccessibilityPanel } from './AccessibilityPanel';
import { useDebounce } from '../../utils/useDebounce';
import styles from './Form.module.css';

const DELAY_INPUT = 20;
export const Form: React.FC = () => {
  const sidebarId = useId();

  const {
    dispatch,
    state: { themeName, keyColorHex },
    // - unused values from a11y panel.
    // isDark, darkThemeOverrides, lightThemeOverrides, brand,
  } = useThemeDesigner();
  const themeNameInputId = useId('themeNameInputId');

  // const handleIsDarkChange = () => {
  //   dispatch({ type: 'isDark', payload: !isDark });
  // };

  const [keyColor, setKeyColor] = React.useState<string>(keyColorHex);
  const [hueTorsion, setHueTorsion] = React.useState<number>(0);
  const [vibrancy, setVibrancy] = React.useState<number>(0);

  // as the user moves through the wheel, we want the page to react in real time
  const debounceKeyColor: string = useDebounce(keyColor, DELAY_INPUT);
  const debounceHueTorsion: number = useDebounce(hueTorsion, DELAY_INPUT);
  const debounceVibrancy: number = useDebounce(vibrancy, DELAY_INPUT);

  React.useEffect(() => {
    dispatch({
      type: 'updateThemeWithCustomerAttributes',
      payload: {
        keyColor: debounceKeyColor.padEnd(7, '0'),
        hueTorsion: debounceHueTorsion / 100,
        vibrancy: debounceVibrancy / 100,
      },
    });
  }, [dispatch, debounceKeyColor, debounceHueTorsion, debounceVibrancy]);

  const generateHexColor = (e: React.ChangeEvent<HTMLInputElement>): string => {
    return '#' + e.target.value.replace(/[^0-9A-F]/gi, '').toUpperCase();
  };

  const handleKeyColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // check if the newly inputted hex code has a #
    const newHexColor = generateHexColor(e);
    setKeyColor(newHexColor);
  };

  const handleKeyColorBlur = () => {
    // Force padding if they blur
    setKeyColor(keyColorHex.padEnd(6, '0'));
  };
  const handleHueTorsionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHueTorsion(parseInt(e.target.value || '0', 10));
  };
  const handleVibrancyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVibrancy(parseInt(e.target.value || '0', 10));
  };

  const handleThemeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;

    if (newName.length === 0) {
      dispatch({ type: 'themeName', payload: defaultThemePlaceholderName });
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
      <Accordion defaultOpenItems={['1', '2', '3']} multiple>
        {/* `multiple` allows for toggle of collapse as well as open multiple panels */}
        <AccordionItem value="1">
          <AccordionHeader>
            <Caption1Stronger>Step 1 - Color settings</Caption1Stronger>
          </AccordionHeader>

          <AccordionPanel className={styles['accordion-container']}>
            <div className={styles.inputs}>
              <div className={styles.labels}>
                <Field label="Key color value">
                  <Input
                    className={styles['key-color']}
                    size="large"
                    appearance="underline"
                    value={keyColor}
                    onChange={handleKeyColorChange}
                    maxLength={7}
                    onBlur={handleKeyColorBlur}
                  />
                </Field>
                <div className={styles['color-picker']} style={{ backgroundColor: keyColor }}>
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
              <Field label="Hue Torsion">
                <div className={styles.slider}>
                  <Slider size="small" min={-50} max={50} value={hueTorsion} onChange={handleHueTorsionChange} />
                  <Input
                    size="small"
                    type="number"
                    min={-50}
                    max={50}
                    appearance="outline"
                    value={hueTorsion.toString()}
                    onChange={handleHueTorsionChange}
                  />
                </div>
              </Field>
            </div>
            <div>
              <Field label="Vibrancy">
                <div className={styles.slider}>
                  <Slider size="small" min={-50} max={50} value={vibrancy} onChange={handleVibrancyChange} />
                  <Input
                    size="small"
                    type="number"
                    min={-50}
                    max={50}
                    appearance="outline"
                    value={vibrancy.toString()}
                    onChange={handleVibrancyChange}
                  />
                </div>
              </Field>
            </div>
          </AccordionPanel>
        </AccordionItem>
        {/*
        The accessibility check is not adequate for the theme designer.
        Removing it for now because we don't want people proceeding with a false sense of security.
        <AccordionItem value="2">
          <AccordionHeader>
            <Caption1Stronger>Step 2 - Accessibility checks</Caption1Stronger>
          </AccordionHeader>
          <AccordionPanel className={styles['accordion-container']}>
            <Switch checked={isDark} onChange={handleIsDarkChange} label={'Dark theme'} />
            <AccessibilityPanel
              darkThemeOverrides={darkThemeOverrides}
              brand={brand}
              lightThemeOverrides={lightThemeOverrides}
            />
          </AccordionPanel>
        </AccordionItem> */}
        <AccordionItem value="2">
          <AccordionHeader>
            <Caption1Stronger>Step 2 - Export</Caption1Stronger>
          </AccordionHeader>
          <AccordionPanel className={styles['accordion-container']}>
            <div className={styles['label-name']}>
              <Field label={'Theme name'}>
                <Input
                  appearance="outline"
                  id={themeNameInputId}
                  onChange={handleThemeNameChange}
                  placeholder={defaultThemePlaceholderName}
                  value={themeName === defaultThemePlaceholderName ? '' : themeName}
                />
              </Field>
            </div>
            <Button size="small" appearance="primary" onClick={showExportButton}>
              Export
            </Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
