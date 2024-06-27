import * as React from 'react';
import { Dropdown, makeStyles, Option, useId, Persona } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    justifyItems: 'start',
    gap: '20px',
    maxWidth: '400px',
  },
  field: {
    display: 'grid',
    justifyItems: 'start',
    gap: '2px',
  },
});

export const Controlled = (props: Partial<DropdownProps>) => {
  const comboId = useId('combo-controlled');
  const styles = useStyles();
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(['eatkins']);
  const [value, setValue] = React.useState('Elvia Atkins');

  const onOptionSelect: (typeof props)['onOptionSelect'] = (ev, data) => {
    setSelectedOptions(data.selectedOptions);
    setValue(data.optionText ?? '');
  };

  return (
    <div className={styles.root}>
      <div className={styles.field}>
        <label htmlFor={`${comboId}-default`}>Schedule a meeting (default selection)</label>
        <Dropdown id={`${comboId}-default`} {...props} defaultValue="Elvia Atkins" defaultSelectedOptions={['eatkins']}>
          <Option text="Katri Athokas" value="kathok">
            <Persona
              avatar={{ color: 'colorful', 'aria-hidden': true }}
              name="Katri Athokas"
              presence={{
                status: 'available',
              }}
              secondaryText="Available"
            />
          </Option>
          <Option text="Elvia Atkins" value="eatkins">
            <Persona
              avatar={{ color: 'colorful', 'aria-hidden': true }}
              name="Elvia Atkins"
              presence={{
                status: 'busy',
              }}
              secondaryText="Busy"
            />
          </Option>
          <Option text="Cameron Evans" value="cevans">
            <Persona
              avatar={{ color: 'colorful', 'aria-hidden': true }}
              name="Cameron Evans"
              presence={{
                status: 'away',
              }}
              secondaryText="Away"
            />
          </Option>
          <Option text="Wanda Howard" value="whoward">
            <Persona
              avatar={{ color: 'colorful', 'aria-hidden': true }}
              name="Wanda Howard"
              presence={{
                status: 'out-of-office',
              }}
              secondaryText="Out of office"
            />
          </Option>
        </Dropdown>
      </div>

      <div className={styles.field}>
        <label htmlFor={`${comboId}-controlled`}>Schedule a meeting (controlled selection)</label>
        <Dropdown
          id={`${comboId}-controlled`}
          {...props}
          value={value}
          selectedOptions={selectedOptions}
          onOptionSelect={onOptionSelect}
        >
          <Option text="Katri Athokas" value="kathok">
            <Persona
              avatar={{ color: 'colorful', 'aria-hidden': true }}
              name="Katri Athokas"
              presence={{
                status: 'available',
              }}
              secondaryText="Available"
            />
          </Option>
          <Option text="Elvia Atkins" value="eatkins">
            <Persona
              avatar={{ color: 'colorful', 'aria-hidden': true }}
              name="Elvia Atkins"
              presence={{
                status: 'busy',
              }}
              secondaryText="Busy"
            />
          </Option>
          <Option text="Cameron Evans" value="cevans">
            <Persona
              avatar={{ color: 'colorful', 'aria-hidden': true }}
              name="Cameron Evans"
              presence={{
                status: 'away',
              }}
              secondaryText="Away"
            />
          </Option>
          <Option text="Wanda Howard" value="whoward">
            <Persona
              avatar={{ color: 'colorful', 'aria-hidden': true }}
              name="Wanda Howard"
              presence={{
                status: 'out-of-office',
              }}
              secondaryText="Out of office"
            />
          </Option>
        </Dropdown>
      </div>
    </div>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story:
        'A Dropdown may have controlled or controlled selection and value. ' +
        'When the selection is controlled or a default selection is provided, ' +
        'a controlled value or default value must also be defined. ' +
        'Otherwise, the Dropdown will not be able to display a value before the Options are rendered.',
    },
  },
};
