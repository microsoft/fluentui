/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { useId, Label, Input, Slider, tokens } from '@fluentui/react-components';
import { useDebounce } from '../../utils/useDebounce';
import { AppContext } from '../../ThemeDesigner';
import { useContextSelector } from '@fluentui/react-context-selector';
import type { CustomAttributes } from '../../useThemeDesignerReducer';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL),
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  keyColor: {
    paddingLeft: '0px',
  },
  labels: {
    display: 'grid',
    gridTemplateColumns: '135px 30px',
    columnGap: '15px',
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
});

export const Form: React.FC = () => {
  const styles = useStyles();
  const sidebarId = useId();

  const dispatchAppState = useContextSelector(AppContext, ctx => ctx.dispatchAppState);

  const initialState: CustomAttributes = {
    keyColor: '#0F6CBD',
    hueTorsion: 0,
    vibrancy: 0,
  };

  const [keyColor, setKeyColor] = React.useState<string>(initialState.keyColor);
  const [hueTorsion, setHueTorsion] = React.useState<number>(initialState.hueTorsion);
  const [vibrancy, setVibrancy] = React.useState<number>(initialState.vibrancy * 100);

  const debounceAttributes: CustomAttributes = useDebounce(
    { keyColor, hueTorsion: hueTorsion / 100, vibrancy: vibrancy / 100 },
    10,
  );

  React.useEffect(() => {
    dispatchAppState({ type: 'Custom', customAttributes: debounceAttributes });
  }, [debounceAttributes, dispatchAppState]);

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

  return (
    <div className={styles.root} role="tabpanel" aria-labelledby="Edit">
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
  );
};
