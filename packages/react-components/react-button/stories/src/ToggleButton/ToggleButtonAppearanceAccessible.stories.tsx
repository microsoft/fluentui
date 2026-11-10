import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, ToggleButton } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const AccessibleAppearance = (): JSXElement => {
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const styles = useStyles();

  const toggleChecked = React.useCallback(
    (buttonIndex: number) => {
      switch (buttonIndex) {
        case 1:
          setChecked1(!checked1);
          break;
        case 2:
          setChecked2(!checked2);
          break;
      }
    },
    [checked1, checked2],
  );

  return (
    <div className={styles.wrapper}>
      <ToggleButton checked={checked1} onClick={() => toggleChecked(1)} isAccessible>
        Default
      </ToggleButton>
      <ToggleButton appearance="primary" checked={checked2} onClick={() => toggleChecked(2)} isAccessible>
        Primary
      </ToggleButton>
      <ToggleButton appearance="outline" onClick={() => toggleChecked(3)} isAccessible>
        Outline
      </ToggleButton>
      <ToggleButton appearance="subtle" isAccessible>
        Subtle
      </ToggleButton>
      <ToggleButton appearance="transparent" isAccessible>
        Transparent
      </ToggleButton>
    </div>
  );
};

AccessibleAppearance.parameters = {
  docs: {
    description: {
      story:
        'Appearance variants with isAccessible set, showing more contrasting colors when checked. The primary variant uses the same colors, but with an inset stroke for the checked state.\n\nThis approach is available for when the icon is not used to differentiate checked vs. unchecked states.',
    },
  },
};
