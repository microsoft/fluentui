import * as React from 'react';
import { addons } from 'storybook/preview-api';

import { Label } from '@fluentui/react-label';
import { Switch, type SwitchProps } from '@fluentui/react-switch';
import { useId, type ForwardRefComponent } from '@fluentui/react-utilities';
import { typographyStyles } from '@fluentui/react-theme';
import { makeStyles } from '@griffel/react';

import { DIR_ID } from '../constants';

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
 * Dir switch used in the react-components docs header
 */
export const DirSwitch: ForwardRefComponent<{ dir?: 'ltr' | 'rtl' }> = React.forwardRef(({ dir }, ref) => {
  const switchId = useId('dir-switch');

  const styles = useStyles();

  const [currentDir, setCurrentDir] = React.useState(dir ?? 'ltr');
  const checked = currentDir === 'rtl';

  const setGlobalDir = (newDir: 'ltr' | 'rtl'): void => {
    addons.getChannel().emit('updateGlobals', { globals: { [DIR_ID]: newDir } });
  };

  const onChange = React.useCallback<NonNullable<SwitchProps['onChange']>>((_, data) => {
    const newDir = data.checked ? 'rtl' : 'ltr';
    setGlobalDir(newDir);
    setCurrentDir(newDir);
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      <Label className={styles.label} htmlFor={switchId}>
        LTR
      </Label>
      <Switch checked={checked} id={switchId} onChange={onChange} aria-label="Right-to-left layout (LTR / RTL)" />
      <Label className={styles.label} htmlFor={switchId}>
        RTL
      </Label>
    </div>
  );
});

DirSwitch.displayName = 'DirSwitch';
