import * as React from 'react';
import type { CheckboxProps, DropdownProps } from '@fluentui/react-components';
import { Checkbox, Dropdown, makeStyles, Option, useId } from '@fluentui/react-components';
import { useDebounce } from '../utils/useDebounce';

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
  const ref = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const handleOpenChange: DropdownProps['onOpenChange'] = (e, data) => setOpen(data.open || false);
  const debouncedOpen = useDebounce(open);

  const onChange: CheckboxProps['onChange'] = (e, data) => {
    const isOpen = !!data.checked;
    setOpen(isOpen);
    // Focus the input when opening to ensure keyboard navigation is available
    isOpen && ref.current?.focus();
  };

  const dropdownId = useId('dropdown');
  const options = ['Cat', 'Caterpillar', 'Corgi', 'Chupacabra', 'Dog', 'Ferret', 'Fish', 'Fox', 'Hamster', 'Snake'];

  return (
    <div className={styles.root}>
      <Checkbox value="open" name="state" label="open" checked={debouncedOpen} onChange={onChange} />
      <label id={dropdownId}>Best pet</label>
      <Dropdown
        aria-labelledby={dropdownId}
        placeholder="Select an animal"
        ref={ref}
        open={debouncedOpen}
        onOpenChange={handleOpenChange}
      >
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Dropdown>
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
        '',
        '_When controlling the open state of the `Dropdown`, extra effort is required to ensure that interactions are_',
        '_still appropriate and that keyboard accessibility does not degrade._',
      ].join('\n'),
    },
  },
};
