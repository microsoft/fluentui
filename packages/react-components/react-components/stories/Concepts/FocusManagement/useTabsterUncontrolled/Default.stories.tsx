import * as React from 'react';

import { FocusTrapZone } from '@fluentui/react';
import {
  useTabsterUncontrolled,
  Field,
  Switch,
  Button,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  focusTrapZone: {
    display: 'flex',
    columnGap: '10px',
    ...shorthands.padding('20px', '10px', '10px', '10px'),
    position: 'relative',
    maxWidth: '400px',
    ...shorthands.border('2px', 'solid', tokens.colorBrandBackground),
    '::after': {
      content: `'FocusTrapZone'`,
      position: 'absolute',
      ...shorthands.padding('1px', '4px', '1px'),
      top: '-2px',
      left: '-2px',
      fontFamily: 'monospace',
      fontSize: '15px',
      fontWeight: 900,
      lineHeight: 1,
      letterSpacing: '1px',
      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackground,
    },
  },
});

export const Default = () => {
  const attr = useTabsterUncontrolled();
  const [uncontrolled, setUncontrolled] = React.useState(false);
  const styles = useStyles();
  return (
    <>
      <Button>Outside</Button>
      <FocusTrapZone
        className={styles.focusTrapZone}
        {...(uncontrolled && attr)}
        isClickableOutsideFocusTrap
        forceFocusInsideTrap={false}
      >
        <Field label="Uncontrolled tabster">
          <Switch checked={uncontrolled} onChange={(e, data) => setUncontrolled(data.checked)} />
        </Field>
        <Button>{uncontrolled ? 'Trapped' : 'Not trapped'}</Button>
        <Button>{uncontrolled ? 'Trapped' : 'Not trapped'}</Button>
      </FocusTrapZone>
      <Button>Outside</Button>
    </>
  );
};
