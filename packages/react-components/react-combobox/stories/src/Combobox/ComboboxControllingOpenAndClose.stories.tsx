import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Checkbox, Combobox, makeStyles, Option, useId } from '@fluentui/react-components';
import type { CheckboxProps, ComboboxProps } from '@fluentui/react-components';

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

export const ControllingOpenAndClose = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combo-default');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpenChange: ComboboxProps['onOpenChange'] = (e, data) => setOpen(data.open);
  const onChange: CheckboxProps['onChange'] = (e, data) => setOpen(!!data.checked);

  return (
    <div className={styles.root}>
      <Checkbox value="open" name="state" label="open" capture="user" checked={open} onChange={onChange} />
      <label id={comboId}>Best pet</label>
      <Combobox
        aria-labelledby={comboId}
        placeholder="Select an animal"
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      >
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};

ControllingOpenAndClose.parameters = {
  docs: {
    description: {
      story: [
        'The opening and close of the `Combobox` can be controlled with your own state.',
        'The `onOpenChange` callback will provide the hints for the state and triggers based on the appropriate',
        'event.',
        '',
        '_When controlling the open state of the `Combobox`, extra effort is required to ensure that interactions are_',
        '_still appropriate and that keyboard accessibility does not degrade._',
      ].join('\n'),
    },
  },
};
