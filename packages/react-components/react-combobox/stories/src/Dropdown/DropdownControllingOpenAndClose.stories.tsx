import * as React from 'react';
import type { CheckboxProps, DropdownProps } from '@fluentui/react-components';
import { Checkbox, Dropdown, makeStyles, Option, useId } from '@fluentui/react-components';

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

export const ControllingOpenAndClose = () => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpenChange: DropdownProps['onOpenChange'] = (e, data) => setOpen(data.open || false);

  const onChange: CheckboxProps['onChange'] = (e, { checked }) => {
    setOpen(checked as boolean);
  };

  const dropdownId = useId('dropdown');
  const options = ['Cat', 'Caterpillar', 'Corgi', 'Chupacabra', 'Dog', 'Ferret', 'Fish', 'Fox', 'Hamster', 'Snake'];

  return (
    <div className={styles.root}>
      <label id={dropdownId}>Best pet</label>
      <Dropdown aria-labelledby={dropdownId} placeholder="Select an animal" open={open} onOpenChange={handleOpenChange}>
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Dropdown>
      <Checkbox value="open" name="state" label="open" checked={open} onChange={onChange} />
    </div>
  );
};

ControllingOpenAndClose.parameters = {
  docs: {
    description: {
      story: [
        'The opening and close of the `Dropdown` can be controlled with your own state.',
        'The `onOpenChange` callback will provide the hints for the state and triggers based on the appropriate',
        'event.',
      ].join('\n'),
    },
  },
};
