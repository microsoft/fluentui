/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { Label, Input, Switch, Slider, tokens } from '@fluentui/react-components';

import type { CustomAttributes } from '../../ThemeDesigner.states';

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
    gridTemplateColumns: '135px auto',
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
});

export interface EditTabProps {
  sidebarId: string;
  custom: CustomAttributes;
  dispatchCustom: React.Dispatch<{ attributes: CustomAttributes; type: string }>;
}

export const EditTab: React.FC<EditTabProps> = props => {
  const styles = useStyles();

  const { custom, dispatchCustom, sidebarId } = props;

  const toggleTheme = () => {
    dispatchCustom({ attributes: { ...custom, isDark: !custom.isDark }, type: 'isDark' });
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchCustom({ attributes: { ...custom, keyColor: e.target.value }, type: 'keyColor' });
  };
  const handleHueTorsionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchCustom({ attributes: { ...custom, hueTorsion: parseInt(e.target.value, 10) / 10 }, type: 'hueTorsion' });
  };
  const handleLightCpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchCustom({ attributes: { ...custom, lightCp: parseInt(e.target.value, 10) / 100 }, type: 'lightCp' });
  };
  const handleDarkCpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchCustom({ attributes: { ...custom, darkCp: parseInt(e.target.value, 10) / 100 }, type: 'darkCp' });
  };

  return (
    <div className={styles.root} role="tabpanel" aria-labelledby="Edit">
      <div className={styles.inputs}>
        <Label htmlFor={props.sidebarId + 'keyColor'}>Key color value</Label>
        <div className={styles.labels}>
          <Input
            className={styles.keyColor}
            size="large"
            appearance="underline"
            id={sidebarId + 'keyColor'}
            value={custom.keyColor}
            onChange={handleOnChange}
          />
          <div className={styles.colorPicker} style={{ backgroundColor: custom.keyColor }}>
            <input className={styles.color} type="color" id={sidebarId + 'keyColor Color'} onChange={handleOnChange} />
          </div>
        </div>
      </div>
      <Label htmlFor={sidebarId + 'hueTorsion'}>Hue Torsion</Label>
      <Slider
        size="small"
        min={-50}
        max={50}
        id={sidebarId + 'hueTorsion'}
        value={custom.hueTorsion * 10}
        onChange={handleHueTorsionChange}
      />
      <Label htmlFor={sidebarId + 'lightCp'}>Light Control Point</Label>
      <Slider
        size="small"
        min={0}
        max={100}
        id={sidebarId + 'lightCp'}
        value={custom.lightCp * 100}
        onChange={handleLightCpChange}
      />
      <Label htmlFor={sidebarId + 'darkCp'}>Dark Control Point</Label>
      <Slider
        size="small"
        min={0}
        max={100}
        id={sidebarId + 'darkCp'}
        value={custom.darkCp * 100}
        onChange={handleDarkCpChange}
      />
      <Switch checked={custom.isDark} onChange={toggleTheme} label={custom.isDark ? 'dark theme' : 'light theme'} />
    </div>
  );
};
