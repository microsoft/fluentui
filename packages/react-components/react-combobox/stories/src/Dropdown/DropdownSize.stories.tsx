import * as React from 'react';
import { Dropdown, makeStyles, Option, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

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

export const Size = (props: Partial<DropdownProps>) => {
  const comboId = useId('combobox');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <h3>Small</h3>
        <label id={`${comboId}-small`}>Best pet</label>
        <Dropdown aria-labelledby={`${comboId}-small`} placeholder="Select an animal" size="small" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>

      <div>
        <h3>Medium</h3>
        <label htmlFor={`${comboId}-med`}>Best pet</label>
        <Dropdown aria-labelledby={`${comboId}-med`} placeholder="Select an animal" size="medium" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>

      <div>
        <h3>Large</h3>
        <label htmlFor={`${comboId}-large`}>Best pet</label>
        <Dropdown aria-labelledby={`${comboId}-large`} placeholder="Select an animal" size="large" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: "A Dropdown's size can be set to `small`, `medium` (default), or `large`.",
    },
  },
};
