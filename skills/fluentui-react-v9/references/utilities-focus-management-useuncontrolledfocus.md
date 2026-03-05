# Utilities/Focus Management/useUncontrolledFocus

Fluent UI focus management is handled by [Tabster](http://tabster.io/). Tabster is intended to be used as the
only focus management framework in an application. However, it's understandable that applications might need to accomodate
other focus management frameworks. In these cases, the `useUncontrolledFocus` hook can be used to explicitly
remove explicit focus controlling for a region of DOM.

This is particularly useful to support legacy v8 focus management components such as `FocusZone` and `FocusTrapZone`.

## Examples

### Default

```tsx
import * as React from 'react';

import { FocusTrapZone } from '@fluentui/react';
import { useUncontrolledFocus, Field, Switch, Button, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    placeItems: 'start',
  },
  focusTrapZone: {
    display: 'flex',
    gap: '20px',
    padding: '20px 10px 10px 10px',
    position: 'relative',
    width: '400px',
    border: `2px solid ${tokens.colorBrandBackground}`,

    '::after': {
      content: `'FocusTrapZone'`,
      position: 'absolute',
      padding: '4px',
      top: '-2px',
      left: '-2px',
      fontFamily: 'monospace',
      fontSize: '14px',
      fontWeight: 900,
      lineHeight: 1,
      letterSpacing: '1px',
      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackground,
    },
  },
  controls: {
    flex: 1,
    display: 'flex',
    gap: '10px',
    alignItems: 'end',
    justifyContent: 'end',
  },
});

export const Default = () => {
  const attr = useUncontrolledFocus();
  const styles = useStyles();

  const [enabled, setEnabled] = React.useState(true);

  return (
    <div className={styles.container}>
      <Button>Outside</Button>

      <FocusTrapZone
        {...attr}
        className={styles.focusTrapZone}
        disabled={!enabled}
        isClickableOutsideFocusTrap
        forceFocusInsideTrap={false}
      >
        <Field label="Enable focus trap">
          <Switch checked={enabled} onChange={(e, data) => setEnabled(data.checked)} />
        </Field>

        <div className={styles.controls}>
          <Button>{enabled ? 'Trapped' : 'Not trapped'}</Button>
          <Button>{enabled ? 'Trapped' : 'Not trapped'}</Button>
        </div>
      </FocusTrapZone>

      <Button>Outside</Button>
    </div>
  );
};
```
