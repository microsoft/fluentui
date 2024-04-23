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
  input: {
    width: '100%',
    marginBottom: '8px',
  },
  listbox: {
    width: '100%',
  },
});

export const InDialog = (props: Partial<ListboxProps>) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isMultiselect, setIsMultiselect] = React.useState(props.multiselect);
  const [selectedOptions, setSelectedOptions] = React.useState(props.selectedOptions ?? []);
  const [dialogSelectedOptions, setDialogSelectedOptions] = React.useState(props.selectedOptions ?? []);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [filter, setFilter] = React.useState('');

  const filteredOptions = React.useMemo(() => {
    return ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'].filter(
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
            <DialogContent>
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
                  <Option key={option} disabled={option === 'Ferret'}>
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
