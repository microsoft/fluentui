import * as React from 'react';
import { makeStyles, Label, Switch, useId, typographyStyles } from '@fluentui/react-components';
import type { SwitchProps } from '@fluentui/react-components';
import { DIR_ID } from '@fluentui/react-storybook-addon';
import addons from '@storybook/addons';

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
export const DirSwitch: React.FC<{ dir?: 'ltr' | 'rtl' }> = ({ dir }) => {
  const switchId = useId('dir-switch');

  const styles = useStyles();

  const [currentDir, setCurrentDir] = React.useState(dir);
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
    <div className={styles.container}>
      <Label className={styles.label} htmlFor={currentDir === 'ltr' ? undefined : switchId}>
        LTR
      </Label>
      <Switch checked={checked} id={switchId} onChange={onChange} />
      <Label className={styles.label} htmlFor={currentDir === 'rtl' ? switchId : undefined}>
        RTL
      </Label>
    </div>
  );
};
