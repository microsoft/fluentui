/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { Label, Input, Switch, Slider, tokens } from '@fluentui/react-components';

import type { CustomAttributes, DispatchTheme } from '../../useThemeDesignerReducer';

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
  dispatchState: React.Dispatch<DispatchTheme>;
}

export const EditTab: React.FC<EditTabProps> = props => {
  const styles = useStyles();

  const { sidebarId, dispatchState } = props;

  const initialForm = {
    keyColor: '#006bc7',
    hueTorsion: 0,
    darkCp: 2 / 3,
    lightCp: 1 / 3,
    isDark: false,
  };

  const formReducer = (state: CustomAttributes, action: { attributes: CustomAttributes; type: string }) => {
    dispatchState({ ...form, type: 'Custom', customAttributes: action.attributes, overrides: {} });
    return action.attributes;
  };

  const [form, dispatchForm] = React.useReducer(formReducer, initialForm);

  React.useEffect(() => {
    dispatchState({ type: 'Custom', customAttributes: form, overrides: {} });
  }, [dispatchState, form]);

  const toggleTheme = () => {
    dispatchForm({ attributes: { ...form, isDark: !form.isDark }, type: 'isDark' });
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchForm({ attributes: { ...form, keyColor: e.target.value }, type: 'keyColor' });
  };
  const handleHueTorsionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchForm({ attributes: { ...form, hueTorsion: parseInt(e.target.value, 10) / 10 }, type: 'hueTorsion' });
  };
  const handleLightCpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchForm({ attributes: { ...form, lightCp: parseInt(e.target.value, 10) / 100 }, type: 'lightCp' });
  };
  const handleDarkCpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchForm({ attributes: { ...form, darkCp: parseInt(e.target.value, 10) / 100 }, type: 'darkCp' });
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
            value={form.keyColor}
            onChange={handleOnChange}
          />
          <div className={styles.colorPicker} style={{ backgroundColor: form.keyColor }}>
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
        value={form.hueTorsion * 10}
        onChange={handleHueTorsionChange}
      />
      <Label htmlFor={sidebarId + 'lightCp'}>Light Control Point</Label>
      <Slider
        size="small"
        min={0}
        max={100}
        id={sidebarId + 'lightCp'}
        value={form.lightCp * 100}
        onChange={handleLightCpChange}
      />
      <Label htmlFor={sidebarId + 'darkCp'}>Dark Control Point</Label>
      <Slider
        size="small"
        min={0}
        max={100}
        id={sidebarId + 'darkCp'}
        value={form.darkCp * 100}
        onChange={handleDarkCpChange}
      />
      <Switch checked={form.isDark} onChange={toggleTheme} label={form.isDark ? 'dark theme' : 'light theme'} />
    </div>
  );
};
