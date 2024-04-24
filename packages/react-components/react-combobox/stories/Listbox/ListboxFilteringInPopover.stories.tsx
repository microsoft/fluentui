import * as React from 'react';
import {
  Button,
  Checkbox,
  Input,
  Listbox,
  makeStyles,
  MenuButton,
  mergeClasses,
  Option,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import type { ListboxProps } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    ...shorthands.gap('2px'),
    maxWidth: '400px',
  },
  menuButton: {
    justifyContent: 'space-between',
  },
  listboxWrapper: {
    maxHeight: '200px',
    marginBottom: '8px',
    ...shorthands.overflow('hidden', 'auto'),
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: '-4px',
    backgroundColor: tokens.colorNeutralBackground1,
    zIndex: 1,
    ...shorthands.margin('-4px', '-4px', '0px'),
    ...shorthands.padding('4px', '4px', '8px'),
  },
  input: {
    width: '100%',
  },
  listbox: {
    width: '100%',
  },
  option: {
    scrollMarginBlockStart: '48px',
  },
  doneButton: {
    width: '100%',
  },
});

export const FilteringInPopover = (props: Partial<ListboxProps>) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isMultiselect, setIsMultiselect] = React.useState(props.multiselect);
  const [selectedOptions, setSelectedOptions] = React.useState(props.selectedOptions ?? []);
  const [pendingSelectedOptions, setPendingSelectedOptions] = React.useState(props.selectedOptions ?? []);

  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [filter, setFilter] = React.useState('');

  const filteredOptions = React.useMemo(() => {
    return ['Bear', 'Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Monkey', 'Parrot', 'Snake', 'Zebra'].filter(
      o => o.toLowerCase().includes(filter.toLowerCase()) || filter.toLowerCase().includes(o.toLowerCase()),
    );
  }, [filter]);

  React.useEffect(() => {
    setSelectedOptions(props.selectedOptions ?? []);
  }, [props.selectedOptions]);

  React.useEffect(() => {
    setSelectedOptions(selection => (selection[0] ? [selection[0]] : []));
  }, [isMultiselect]);

  React.useEffect(() => {
    if (popoverOpen) {
      inputRef.current?.focus();
    }
  }, [popoverOpen]);

  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Checkbox
        label="Multiselect"
        checked={isMultiselect}
        onChange={(_, data) => setIsMultiselect(data.checked !== false)}
      />
      <Popover
        open={popoverOpen}
        onOpenChange={(_, data) => setPopoverOpen(data.open)}
        positioning={{ align: 'start', position: 'below' }}
      >
        <PopoverTrigger disableButtonEnhancement>
          <MenuButton
            appearance="outline"
            className={styles.menuButton}
            onClick={() => setPendingSelectedOptions(selectedOptions)}
          >
            {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select a pet'}
          </MenuButton>
        </PopoverTrigger>
        <PopoverSurface tabIndex={-1}>
          <div className={styles.listboxWrapper}>
            <div className={styles.inputWrapper}>
              <Input
                ref={inputRef}
                className={styles.input}
                placeholder="Filter pets"
                aria-label="Filter pets"
                autoFocus
                value={filter}
                onChange={(_, data) => setFilter(data.value)}
                contentAfter={
                  filter.length > 0 ? (
                    <Button
                      appearance="transparent"
                      icon={<DismissRegular />}
                      title="Clear filter"
                      onClick={() => setFilter('')}
                    />
                  ) : undefined
                }
              />
            </div>
            <Listbox
              {...props}
              aria-label="Select a pet"
              className={mergeClasses(styles.listbox, props.className)}
              multiselect={isMultiselect}
              selectedOptions={pendingSelectedOptions}
              onOptionSelect={(e, data) => {
                setPendingSelectedOptions(data.selectedOptions);
              }}
            >
              {filteredOptions.map(option => (
                <Option key={option} className={styles.option} disabled={option === 'Ferret'}>
                  {option}
                </Option>
              ))}
            </Listbox>
          </div>
          <Button
            appearance="primary"
            className={styles.doneButton}
            onClick={() => {
              setSelectedOptions(pendingSelectedOptions);
              setPopoverOpen(false);
            }}
            disabled={!isMultiselect && pendingSelectedOptions.length === 0}
          >
            Done
          </Button>
        </PopoverSurface>
      </Popover>
    </div>
  );
};
