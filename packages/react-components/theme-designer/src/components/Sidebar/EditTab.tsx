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
  formState: CustomAttributes;
  setFormState: React.Dispatch<CustomAttributes>;
}

export const EditTab: React.FC<EditTabProps> = props => {
  const styles = useStyles();

  const { sidebarId, dispatchState, formState, setFormState } = props;

  const initialForm: CustomAttributes = formState;

  const formReducer = (state: CustomAttributes, action: { attributes: CustomAttributes }) => {
    setFormState(action.attributes);
    dispatchState({ ...form, type: 'Custom', customAttributes: action.attributes, overrides: {} });
    return action.attributes;
  };

  const [form, dispatchForm] = React.useReducer(formReducer, initialForm);

  const [lastForm, setLastForm] = React.useState<CustomAttributes>(initialForm);
  const debouncedForm = useDebounce(lastForm, 10);
  React.useEffect(() => {
    dispatchForm({ attributes: debouncedForm });
  }, [debouncedForm]);

  const toggleTheme = () => {
    setLastForm({ ...form, ...form, isDark: !form.isDark });
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastForm({ ...form, keyColor: e.target.value });
  };
  const handleHueTorsionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastForm({ ...form, hueTorsion: parseInt(e.target.value, 10) });
  };
  const handleLightCpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastForm({ ...form, lightCp: parseInt(e.target.value, 10) });
  };
  const handleDarkCpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastForm({ ...form, darkCp: parseInt(e.target.value, 10) });
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
      <Slider size="small" min={-15} max={15} id={sidebarId + 'hueTorsion'} onChange={handleHueTorsionChange} />
      <Label htmlFor={sidebarId + 'lightCp'}>Light Control Point</Label>
      <Slider size="small" min={0} max={100} id={sidebarId + 'lightCp'} onChange={handleLightCpChange} />
      <Label htmlFor={sidebarId + 'darkCp'}>Dark Control Point</Label>
      <Slider size="small" min={0} max={100} id={sidebarId + 'darkCp'} onChange={handleDarkCpChange} />
      <Switch checked={form.isDark} onChange={toggleTheme} label={form.isDark ? 'dark theme' : 'light theme'} />
    </div>
  );
};
