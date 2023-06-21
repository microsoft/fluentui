import * as React from 'react';
import { ArgTypes } from '@storybook/api';
import { SearchBox } from '@fluentui/react-search';
import { makeStyles, shorthands, useId, Label } from '@fluentui/react-components';
import type { SearchBoxProps } from '@fluentui/react-search';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field
    display: 'flex',
    flexDirection: 'column',
    // Use 2px gap below the label (per the design system)
    ...shorthands.gap('2px'),
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: '400px',
  },
});

export const Default = (props: SearchBoxProps) => {
  const searchBoxId = useId('searchbox');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label htmlFor={searchBoxId} size={props.size} disabled={props.disabled}>
        Sample SearchBox
      </Label>
      <SearchBox id={searchBoxId} {...props} />
    </div>
  );
};

const argTypes: ArgTypes = {
  // Add these native props to the props table and controls pane
  placeholder: {
    description:
      'Placeholder text for the SearchBox. If using this instead of a label (which is ' +
      'not recommended), be sure to provide an `aria-label` for screen reader users.',
    type: { name: 'string', required: false }, // for inferring control type
    table: { type: { summary: 'string' } }, // for showing type in prop table
  },
  disabled: {
    description: 'Whether the SearchBox is disabled',
    type: { name: 'boolean', required: false },
    table: { type: { summary: 'boolean' } },
  },
  // Hide these from the props table and controls pane
  children: { table: { disable: true } },
  as: { table: { disable: true } },
};
Default.argTypes = argTypes;
