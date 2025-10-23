import * as React from 'react';
import type { JSXElement, PresenceBadgeStatus } from '@fluentui/react-components';
import { Combobox, makeStyles, Option, useId, Persona } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

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

const optionData = [
  { text: 'Katri Athokas', value: 'kathok', presence: 'available', secondaryText: 'Available' },
  { text: 'Elvia Atkins', value: 'eatkins', presence: 'busy', secondaryText: 'Busy' },
  { text: 'Cameron Evans', value: 'cevans', presence: 'away', secondaryText: 'Away' },
  { text: 'Wanda Howard', value: 'whoward', presence: 'out-of-office', secondaryText: 'Out of office' },
];

export const Controlled = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combo-controlled');
  const styles = useStyles();
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(['eatkins']);
  const [value, setValue] = React.useState('Elvia Atkins');
  const [open, setOpen] = React.useState(false);

  const onOptionSelect: (typeof props)['onOptionSelect'] = (ev, data) => {
    setSelectedOptions(data.selectedOptions);
    setValue(data.optionText ?? '');
  };

  const onInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };

  // Reset the typed value when the Combobox closes to reflect the selected options
  React.useEffect(() => {
    if (!open) {
      setValue(selectedOptions.join(', '));
    }
  }, [open, selectedOptions]);

  return (
    <div className={styles.root}>
      <div className={styles.field}>
        <label htmlFor={`${comboId}-default`}>Schedule a meeting (default selection)</label>
        <Combobox id={`${comboId}-default`} {...props} defaultValue="Elvia Atkins" defaultSelectedOptions={['eatkins']}>
          {optionData.map(opt => (
            <Option key={opt.value} text={opt.text} value={opt.value}>
              <Persona
                avatar={{ color: 'colorful', 'aria-hidden': true }}
                name={opt.text}
                presence={{
                  status: opt.presence as PresenceBadgeStatus,
                }}
                secondaryText={opt.secondaryText}
              />
            </Option>
          ))}
        </Combobox>
      </div>

      <div className={styles.field}>
        <label htmlFor={`${comboId}-controlled`}>Schedule a meeting (controlled selection)</label>
        <Combobox
          id={`${comboId}-controlled`}
          {...props}
          value={value}
          selectedOptions={selectedOptions}
          onInput={onInput}
          onOptionSelect={onOptionSelect}
          onOpenChange={(_, data) => setOpen(data.open)}
        >
          {optionData.map(opt => (
            <Option key={opt.value} text={opt.text} value={opt.value}>
              <Persona
                avatar={{ color: 'colorful', 'aria-hidden': true }}
                name={opt.text}
                presence={{
                  status: opt.presence as PresenceBadgeStatus,
                }}
                secondaryText={opt.secondaryText}
              />
            </Option>
          ))}
        </Combobox>
      </div>
    </div>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story:
        'A Combobox may have controlled or controlled selection and value. ' +
        'When the selection is controlled or a default selection is provided, ' +
        'a controlled value or default value must also be defined. ' +
        'Otherwise, the Combobox will not be able to display a value before the Options are rendered.',
    },
  },
};
