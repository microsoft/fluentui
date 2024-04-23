import * as React from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogSurface,
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
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const [selectedOption, setSelectedOption] = React.useState(props.selectedOptions?.[0]);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [filter, setFilter] = React.useState('');

  const filteredOptions = React.useMemo(() => {
    return options.filter(
      o => o.toLowerCase().includes(filter.toLowerCase()) || filter.toLowerCase().includes(o.toLowerCase()),
    );
  }, [filter]);

  React.useEffect(() => {
    setSelectedOption(props.selectedOptions?.[0]);
  }, [props.selectedOptions]);

  React.useEffect(() => {
    if (dialogOpen) {
      inputRef.current?.focus();
    }
  }, [dialogOpen]);

  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Dialog open={dialogOpen} onOpenChange={(_, data) => setDialogOpen(data.open)}>
        <DialogTrigger disableButtonEnhancement>
          <MenuButton appearance="outline" className={styles.menuButton} onClick={() => setDialogOpen(!dialogOpen)}>
            {selectedOption ?? 'Select a pet'}
          </MenuButton>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogContent>
              <Input
                ref={inputRef}
                className={styles.input}
                placeholder="Filter pets"
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
                className={mergeClasses(styles.listbox, props.className)}
                selectedOptions={selectedOption ? [selectedOption] : []}
                onOptionSelect={(e, data) => {
                  props.onOptionSelect?.(e, data);
                  setSelectedOption(data.selectedOptions[0]);
                  setDialogOpen(false);
                }}
              >
                {filteredOptions.map(option => (
                  <Option key={option} disabled={option === 'Ferret'}>
                    {option}
                  </Option>
                ))}
              </Listbox>
            </DialogContent>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};
