import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import type { ArgTypes } from '@storybook/react-webpack5';
import { useId, Input, Label } from '@fluentui/react-components';
import type { InputProps } from '@fluentui/react-components';

import styles from './InputDefault.module.css';

export const Default = (props: InputProps): JSXElement => {
  const inputId = useId('input');

  return (
    <div className={styles.root}>
      <Label htmlFor={inputId} size={props.size} disabled={props.disabled}>
        Sample input
      </Label>
      <Input id={inputId} {...props} />
    </div>
  );
};

const argTypes: ArgTypes = {
  // Add these native props to the props table and controls pane
  placeholder: {
    description:
      'Placeholder text for the input. If using this instead of a label (which is ' +
      'not recommended), be sure to provide an `aria-label` for screen reader users.',
    type: { name: 'string', required: false }, // for inferring control type
    table: { type: { summary: 'string' } }, // for showing type in prop table
  },
  disabled: {
    description: 'Whether the input is disabled',
    type: { name: 'boolean', required: false },
    table: { type: { summary: 'boolean' } },
  },
  // Hide these from the props table and controls pane
  children: { table: { disable: true } },
  as: { table: { disable: true } },
};
Default.argTypes = argTypes;
