import * as React from 'react';
import { Combobox, Option } from '@fluentui/react-headless-components-preview/combobox';
import { CheckmarkRegular, ChevronDownRegular, DismissRegular } from '@fluentui/react-icons';
import type { ComboboxProps } from '@fluentui/react-headless-components-preview/combobox';
import styles from './combobox.module.css';

export const ControllingOpenAndClose = (): React.ReactNode => {
  const options = ['Cat', 'Caterpillar', 'Corgi', 'Dog', 'Fish', 'Hamster', 'Snake'];

  const [open, setOpen] = React.useState(false);

  const handleOpenChange: NonNullable<ComboboxProps['onOpenChange']> = (_, data) => setOpen(data.open);

  return (
    <div className={styles.demo}>
      <label className={styles.checkboxLabel}>
        <input type="checkbox" checked={open} onChange={e => setOpen(e.target.checked)} />
        {open ? 'Close' : 'Open'} listbox
      </label>
      <label className={styles.label} htmlFor="combobox-controlled-open">
        Best pet
      </label>
      <Combobox
        root={{ className: styles.root }}
        input={{ className: styles.input }}
        listbox={{ className: styles.listbox }}
        id="combobox-controlled-open"
        placeholder="Select an animal"
        clearable
        open={open}
        onOpenChange={handleOpenChange}
        expandIcon={{ className: styles.expandIcon, children: <ChevronDownRegular /> }}
        clearIcon={{ className: styles.clearIcon, children: <DismissRegular /> }}
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
      </Combobox>
    </div>
  );
};

ControllingOpenAndClose.parameters = {
  docs: {
    description: {
      story:
        'The open/close state of the Combobox can be controlled externally via the `open` prop and `onOpenChange` callback.',
    },
  },
};
