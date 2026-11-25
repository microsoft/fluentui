import * as React from 'react';
import { Dropdown, Option } from '@fluentui/react-headless-components-preview/dropdown';
import { CheckmarkRegular, ChevronDownRegular, DismissRegular } from '@fluentui/react-icons';
import type { DropdownProps } from '@fluentui/react-headless-components-preview/dropdown';
import styles from './dropdown.module.css';

export const ControllingOpenAndClose = (): React.ReactNode => {
  const options = ['Cat', 'Caterpillar', 'Corgi', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];

  const [open, setOpen] = React.useState(false);

  const handleOpenChange: NonNullable<DropdownProps['onOpenChange']> = (_, data) => setOpen(data.open);

  return (
    <div className={styles.demo}>
      <label className={styles.checkboxLabel}>
        <input type="checkbox" checked={open} onChange={e => setOpen(e.target.checked)} />
        {open ? 'Close' : 'Open'} listbox
      </label>
      <label className={styles.label} htmlFor="dropdown-controlled-open-and-close">
        Best pet
      </label>
      <Dropdown
        className={styles.demoWrapper}
        button={{ className: styles.button }}
        listbox={{ className: styles.listbox }}
        id="dropdown-controlled-open-and-close"
        placeholder="Select an animal"
        clearable
        open={open}
        onOpenChange={handleOpenChange}
        expandIcon={{ className: styles.expandIcon, children: <ChevronDownRegular /> }}
        clearButton={{ className: styles.clearButton, children: <DismissRegular /> }}
      >
        {options.map(option => (
          <Option
            className={styles.option}
            key={option}
            checkIcon={{ className: styles.checkIcon, children: <CheckmarkRegular /> }}
            disabled={option === 'Ferret'}
          >
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
      story:
        'The open/close state of the Dropdown can be controlled externally via the `open` prop and `onOpenChange` callback.',
    },
  },
};
