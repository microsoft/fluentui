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
  Listbox,
  makeStyles,
  MenuButton,
  mergeClasses,
  Option,
  shorthands,
} from '@fluentui/react-components';
import type { ListboxProps } from '@fluentui/react-components';

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
  input: {
    width: '100%',
  },
  listbox: {
    width: '100%',
  },
});

export const InDialog = (props: Partial<ListboxProps>) => {
  const [isMultiselect, setIsMultiselect] = React.useState(props.multiselect);
  const [selectedOptions, setSelectedOptions] = React.useState(props.selectedOptions ?? []);
  const [pendingSelectedOptions, setPendingSelectedOptions] = React.useState(props.selectedOptions ?? []);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const options = ['Bear', 'Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Monkey', 'Parrot', 'Snake', 'Zebra'];

  React.useEffect(() => {
    setSelectedOptions(props.selectedOptions ?? []);
  }, [props.selectedOptions]);

  React.useEffect(() => {
    setSelectedOptions(selection => (selection[0] ? [selection[0]] : []));
  }, [isMultiselect]);

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
            onClick={() => setPendingSelectedOptions(selectedOptions)}
          >
            {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select a pet'}
          </MenuButton>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Select a pet</DialogTitle>
            <DialogContent className={styles.listboxWrapper}>
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
                {options.map(option => (
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
                appearance="primary"
                onClick={() => {
                  setSelectedOptions(pendingSelectedOptions);
                  setDialogOpen(false);
                }}
                disabled={!isMultiselect && pendingSelectedOptions.length === 0}
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
