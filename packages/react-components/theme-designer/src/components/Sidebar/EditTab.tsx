/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { Label, Input, Switch, Slider, tokens } from '@fluentui/react-components';
import { useDebounce } from '../../utils/useDebounce';

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

export interface EditTabProps {
  sidebarId: string;
  dispatchState: React.Dispatch<DispatchTheme>;
  formState: CustomAttributes;
  setFormState: React.Dispatch<CustomAttributes>;
}

export const EditTab: React.FC<EditTabProps> = props => {
  const styles = useStyles();

  const { sidebarId, dispatchState, formState, setFormState } = props;

  const formReducer = (state: CustomAttributes, action: { attributes: CustomAttributes }) => {
    setFormState(action.attributes);
    dispatchState({ ...form, type: 'Custom', customAttributes: action.attributes, overrides: {} });
    return action.attributes;
  };

  const [keyColor, setKeyColor] = React.useState<string>(formState.keyColor);
  const [hueTorsion, setHueTorsion] = React.useState<number>(formState.hueTorsion);
  const [darkCp, setDarkCp] = React.useState<number>(formState.darkCp * 100);
  const [lightCp, setLightCp] = React.useState<number>(formState.lightCp * 100);
  const [isDark, setIsDark] = React.useState<boolean>(formState.isDark);

  const [form, dispatchForm] = React.useReducer(formReducer, formState);
  const debouncedForm = useDebounce(
    { keyColor, hueTorsion: hueTorsion / 100, darkCp: darkCp / 100, lightCp: lightCp / 100, isDark },
    10,
  );
  React.useEffect(() => {
    dispatchForm({ attributes: debouncedForm });
  }, [debouncedForm]);

  const handleIsDarkChange = () => {
    setIsDark(!form.isDark);
  };
  const handleKeyColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyColor(e.target.value);
  };
  const handleHueTorsionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHueTorsion(parseInt(e.target.value, 10));
  };
  const handleLightCpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLightCp(parseInt(e.target.value, 10));
  };
  const handleDarkCpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDarkCp(parseInt(e.target.value, 10));
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
            onChange={handleKeyColorChange}
          />
          <div className={styles.colorPicker} style={{ backgroundColor: form.keyColor }}>
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
          min={-360}
          max={360}
          id={sidebarId + 'hueTorsion'}
          value={hueTorsion}
          onChange={handleHueTorsionChange}
        />
        <Input
          size="small"
          type="number"
          min={-360}
          max={360}
          appearance="outline"
          id={sidebarId + 'hueTorsion input'}
          value={hueTorsion.toString()}
          onChange={handleHueTorsionChange}
        />
      </div>
      <Label htmlFor={sidebarId + 'lightCp'}>Light Control Point</Label>
      <div className={styles.slider}>
        <Slider
          size="small"
          min={0}
          max={100}
          id={sidebarId + 'lightCp'}
          value={lightCp}
          onChange={handleLightCpChange}
        />
        <Input
          size="small"
          type="number"
          min={0}
          max={100}
          appearance="outline"
          id={sidebarId + 'lightCp input'}
          value={lightCp.toString()}
          onChange={handleLightCpChange}
        />
      </div>
      <Label htmlFor={sidebarId + 'darkCp'}>Dark Control Point</Label>
      <div className={styles.slider}>
        <Slider size="small" min={0} max={100} id={sidebarId + 'darkCp'} value={darkCp} onChange={handleDarkCpChange} />
        <Input
          size="small"
          type="number"
          min={0}
          max={100}
          appearance="outline"
          id={sidebarId + 'darkCp input'}
          value={darkCp.toString()}
          onChange={handleDarkCpChange}
        />
      </div>
      <Switch checked={form.isDark} onChange={handleIsDarkChange} label={form.isDark ? 'dark theme' : 'light theme'} />
    </div>
  );
};
