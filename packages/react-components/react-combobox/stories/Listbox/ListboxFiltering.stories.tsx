import * as React from 'react';
import { Button, Input, Listbox, makeStyles, mergeClasses, Option, shorthands } from '@fluentui/react-components';
import type { ListboxProps } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    ...shorthands.gap('2px'),
    width: '200px',
  },
  input: {
    width: '100%',
    marginBottom: '8px',
  },
  listbox: {
    width: '100%',
  },
});

export const Filtering = (props: Partial<ListboxProps>) => {
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];

  const [filter, setFilter] = React.useState('');

  const filteredOptions = React.useMemo(() => {
    return options.filter(
      o => o.toLowerCase().includes(filter.toLowerCase()) || filter.toLowerCase().includes(o.toLowerCase()),
    );
  }, [filter]);

  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Input
        className={styles.input}
        placeholder="Filter pets"
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
      <Listbox {...props} className={mergeClasses(styles.listbox, props.className)}>
        {filteredOptions.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Listbox>
    </div>
  );
};
