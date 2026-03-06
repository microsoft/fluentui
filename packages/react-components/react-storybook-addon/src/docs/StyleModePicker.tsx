import * as React from 'react';
import { addons } from 'storybook/preview-api';

import { Label } from '@fluentui/react-label';
import { Switch, type SwitchProps } from '@fluentui/react-switch';
import { useId } from '@fluentui/react-utilities';
import { typographyStyles } from '@fluentui/react-theme';
import { makeStyles } from '@griffel/react';

import { STYLE_MODE_ID } from '../constants';

const useStyles = makeStyles({
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'start',
  },
  label: {
    ...typographyStyles.subtitle2,
  },
});

/**
 * Style mode picker used in the react-components docs header to toggle between Fluent and CAP styles
 */
export const StyleModePicker: React.FC<{ styleMode?: string }> = ({ styleMode }) => {
  const switchId = useId('style-mode-switch');

  const styles = useStyles();
  const [currentMode, setCurrentMode] = React.useState(styleMode ?? 'fluent');
  const checked = currentMode === 'cap';

  const setGlobalStyleMode = (mode: string): void => {
    addons.getChannel().emit('updateGlobals', { globals: { [STYLE_MODE_ID]: mode } });
  };

  const onChange = React.useCallback<NonNullable<SwitchProps['onChange']>>((_, data) => {
    const newMode = data.checked ? 'cap' : 'fluent';
    setGlobalStyleMode(newMode);
    setCurrentMode(newMode);
  }, []);

  return (
    <div className={styles.container}>
      <Label className={styles.label} htmlFor={!checked ? undefined : switchId}>
        Fluent
      </Label>
      <Switch checked={checked} id={switchId} onChange={onChange} />
      <Label className={styles.label} htmlFor={checked ? switchId : undefined}>
        CAP
      </Label>
    </div>
  );
};
