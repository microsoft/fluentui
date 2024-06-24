import * as React from 'react';
import { Checkbox, Combobox, makeStyles, Option, useId } from '@fluentui/react-components';
import type { CheckboxProps, ComboboxProps } from '@fluentui/react-components';
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

export const ControllingOpenAndClose = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combo-default');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();

  const ref = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const handleOpenChange: ComboboxProps['onOpenChange'] = (e, data) => setOpen(data.open || false);
  const debouncedOpen = useDebounce(open);

  const onChange: CheckboxProps['onChange'] = (e, data) => {
    const isOpen = !!data.checked;
    setOpen(isOpen);
    // Focus the input when opening to ensure keyboard navigation is available
    isOpen && ref.current?.focus();
  };

  return (
    <div className={styles.root}>
      <Checkbox value="open" name="state" label="open" capture="user" checked={debouncedOpen} onChange={onChange} />
      <label id={comboId}>Best pet</label>
      <Combobox
        aria-labelledby={comboId}
        placeholder="Select an animal"
        ref={ref}
        open={debouncedOpen}
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
