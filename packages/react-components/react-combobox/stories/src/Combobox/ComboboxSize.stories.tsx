import * as React from 'react';
import { Combobox, makeStyles, Option, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '20px',
    maxWidth: '400px',
    '> div': {
      display: 'grid',
      gridTemplateRows: 'repeat(1fr)',
      justifyItems: 'start',
      gap: '2px',
    },
  },
});

export const Size = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combobox');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <label id={`${comboId}-small`}>Small</label>
        <Combobox aria-labelledby={`${comboId}-small`} placeholder="Select a color" size="small" {...props}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </div>

      <div>
        <label htmlFor={`${comboId}-med`}>Medium</label>
        <Combobox aria-labelledby={`${comboId}-med`} placeholder="Select a color" size="medium" {...props}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </div>

      <div>
        <label htmlFor={`${comboId}-large`}>Large</label>
        <Combobox aria-labelledby={`${comboId}-large`} placeholder="Select a color" size="large" {...props}>
          <Option>Red</Option>
          <Option>Green</Option>
          <Option>Blue</Option>
        </Combobox>
      </div>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: "A Combobox's size can be set to `small`, `medium` (default), or `large`.",
    },
  },
};
