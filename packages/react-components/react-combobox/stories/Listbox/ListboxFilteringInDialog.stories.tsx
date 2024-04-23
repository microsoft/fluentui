import * as React from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Input,
  Listbox,
  makeStyles,
  MenuButton,
  mergeClasses,
  Option,
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
});

export const FilteringInDialog = (props: Partial<ListboxProps>) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isMultiselect, setIsMultiselect] = React.useState(props.multiselect);
  const [selectedOptions, setSelectedOptions] = React.useState(props.selectedOptions ?? []);
  const [dialogSelectedOptions, setDialogSelectedOptions] = React.useState(props.selectedOptions ?? []);

  const [dialogOpen, setDialogOpen] = React.useState(false);
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
    if (dialogOpen) {
      inputRef.current?.focus();
    }
  }, [dialogOpen]);

  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Checkbox
        label="Multiselect"
        checked={isMultiselect}
        onChange={(_, data) => setIsMultiselect(data.checked !== false)}
      />
      <Dialog open={dialogOpen} onOpenChange={(_, data) => setDialogOpen(data.open)}>
        <DialogTrigger disableButtonEnhancement>
          <MenuButton
            appearance="outline"
            className={styles.menuButton}
            onClick={() => setDialogSelectedOptions(selectedOptions)}
          >
            {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select a pet'}
          </MenuButton>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Select a pet</DialogTitle>
            <DialogContent className={styles.listboxWrapper}>
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
                selectedOptions={dialogSelectedOptions}
                onOptionSelect={(e, data) => {
                  setDialogSelectedOptions(data.selectedOptions);
                }}
              >
                {filteredOptions.map(option => (
                  <Option key={option} className={styles.option} disabled={option === 'Ferret'}>
                    {option}
                  </Option>
                ))}
              </Listbox>
            </DialogContent>
            <DialogActions>
              <DialogTrigger>
                <Button>Cancel</Button>
              </DialogTrigger>
              <Button
                onClick={() => {
                  setSelectedOptions(dialogSelectedOptions);
                  setDialogOpen(false);
                }}
                disabled={!isMultiselect && dialogSelectedOptions.length === 0}
              >
                Done
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};
