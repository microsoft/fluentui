/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { useThemeDesigner } from '../../Context/ThemeDesignerContext';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Button,
  Input,
  Slider,
  tokens,
  useId,
  Field,
  Text,
  Subtitle2Stronger
} from '@fluentui/react-components';
import { defaultThemePlaceholderName } from '../../Context/ThemeDesignerContext';
import { useDebounce } from '../../utils/useDebounce';

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground2,
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  accordionContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalL,
    minWidth: '200px',
  },
  keyColor: {
    paddingLeft: '0px',
  },
  labels: {
    display: 'grid',
    gridTemplateColumns: '110px 100px',
    columnGap: tokens.spacingVerticalL,
  },
  colorPicker: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: '25px',
    height: '45px',
    width: '45px',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: `inset 0 2px 4px ${tokens.colorNeutralShadowAmbient}, inset 0 2px 4px ${tokens.colorNeutralShadowKey}`
  },
  color: {
    padding: '0px',
    border: 'none',
    opacity: '0',
  },
  slider: {
    display: 'grid',
    gridTemplateColumns: '115px 50px',
    columnGap: '15px',
  },
  labelName: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    maxWidth: '400px',
  },
  export: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '20px',
  },
  startHere: {
    padding: '12px 12px 0 12px',
  }
});

const DELAY_INPUT = 20;
export const Form: React.FC = () => {
  const styles = useStyles();
  const sidebarId = useId();

  const {
    dispatch,
    state: { themeName, keyColorHex },
  } = useThemeDesigner();
  const themeNameInputId = useId('themeNameInputId');

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
      <div className={styles.startHere}>
        <Subtitle2Stronger as="h2">
          Start Here
        </Subtitle2Stronger>
      </div>
      <Accordion defaultOpenItems={['1']} collapsible>
        <AccordionItem value="1">
          <AccordionHeader size="large">Step 1 - Color settings</AccordionHeader>
          <AccordionPanel className={styles.accordionContainer}>
            <Text as="h6">Use the Color Picker to select a color or enter a hex value in the text box below to generate a theme. Adjust the Hue Torsion and Vibrancy using the sliders below for further refinement.</Text>
            <div className={styles.inputs}>
              <div className={styles.labels}>
                <Field label="Key color value">
                  <Input
                    appearance="outline"
                    value={keyColor}
                    onChange={handleKeyColorChange}
                    maxLength={7}
                    onBlur={handleKeyColorBlur}
                    style={{ width: '100px' }}
                    />
                  </Field>
                  <Field label="Color Picker">
                    <div className={styles.colorPicker} style={{ backgroundColor: keyColor }}>
                      <input
                        className={styles.color}
                        type="color"
                        id={sidebarId + 'keyColor Color'}
                        onChange={handleKeyColorChange}
                      />
                  </div>
                </Field>
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
        <AccordionItem value="2">
          <AccordionHeader size="large">Step 2 - Export</AccordionHeader>
          <AccordionPanel className={styles.accordionContainer}>
          <Text as="h6">Enter a desired theme name below and click the Export button to export your theme</Text>
            <div className={styles.labelName}>
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
            <Button size="small" appearance="primary" onClick={showExportButton}>Export</Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
