import * as React from 'react';
import { Checkbox, checkboxClassNames, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { Dismiss12Filled } from '@fluentui/react-icons';

const useStyles = makeStyles({
  unchecked: {
    [`> .${checkboxClassNames.indicator}`]: {
      backgroundColor: tokens.colorPaletteRedBackground1,
      ...shorthands.borderColor(tokens.colorPaletteRedBorder1),
    },
    [`&:hover > .${checkboxClassNames.indicator}`]: {
      ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
    },
    [`&:active > .${checkboxClassNames.indicator}`]: {
      backgroundColor: tokens.colorPaletteRedBackground2,
      ...shorthands.borderColor(tokens.colorPaletteRedBorderActive),
    },
  },

  checked: {
    [`> .${checkboxClassNames.indicator}`]: {
      color: tokens.colorPaletteGreenForeground1,
      backgroundColor: tokens.colorPaletteGreenBackground1,
      ...shorthands.borderColor(tokens.colorPaletteGreenBorder1),
    },
    [`&:hover > .${checkboxClassNames.indicator}`]: {
      color: tokens.colorPaletteGreenForeground1,
      backgroundColor: tokens.colorPaletteGreenBackground1,
      ...shorthands.borderColor(tokens.colorPaletteGreenBorder2),
    },
    [`&:active > .${checkboxClassNames.indicator}`]: {
      color: tokens.colorPaletteGreenForeground2,
      backgroundColor: tokens.colorPaletteGreenBackground2,
      ...shorthands.borderColor(tokens.colorPaletteGreenBorderActive),
    },
  },
});

export const CustomStyle = () => {
  const [checked, setChecked] = React.useState(false);
  const styles = useStyles();
  return (
    <Checkbox
      checked={checked}
      onChange={(_ev, data) => setChecked(!!data.checked)}
      className={checked ? styles.checked : styles.unchecked}
      indicator={checked ? <Dismiss12Filled /> : undefined}
      label="Custom styles"
    />
  );
};

CustomStyle.parameters = {
  docs: {
    description: {
      story:
        "The indicator can be styled using selectors on the root slot's styles, as shown in the code of this " +
        'example. A custom icon can also be added to the indicator slot when checked.',
    },
  },
};
