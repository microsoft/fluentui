import * as React from 'react';
import { Combobox, makeStyles, Option, useId, Persona } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

export const ComplexOptions = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combo-default');
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label id={comboId}>Schedule a meeting</label>
      <Combobox aria-labelledby={comboId} {...props}>
        <Option text="Katri Athokas">
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name="Katri Athokas"
            presence={{
              status: 'available',
            }}
            secondaryText="Available"
          />
        </Option>
        <Option text="Elvia Atkins">
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name="Elvia Atkins"
            presence={{
              status: 'busy',
            }}
            secondaryText="Busy"
          />
        </Option>
        <Option text="Cameron Evans">
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name="Cameron Evans"
            presence={{
              status: 'away',
            }}
            secondaryText="Away"
          />
        </Option>
        <Option text="Wanda Howard">
          <Persona
            avatar={{ color: 'colorful', 'aria-hidden': true }}
            name="Wanda Howard"
            presence={{
              status: 'out-of-office',
            }}
            secondaryText="Out of office"
          />
        </Option>
      </Combobox>
    </div>
  );
};

ComplexOptions.parameters = {
  docs: {
    description: {
      story:
        'Options are defined as JSX children, and can include nested elements or other components. ' +
        "When this is the case, the Option's `text` prop should be the plain text version of the option, " +
        'and is used as the Combobox value when the option is selected. ' +
        'Options should never contain interactive elements, such as buttons or links.',
    },
  },
};
