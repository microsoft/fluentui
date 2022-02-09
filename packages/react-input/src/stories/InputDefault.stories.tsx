import * as React from 'react';
import { ArgTypes } from '@storybook/api';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Input } from '../index';
import type { InputProps } from '../index';

const labelStyle = { display: 'block', paddingBottom: '2px' };

export const Default = (props: InputProps) => {
  const inputId = useId('input');
  return (
    <>
      <Label htmlFor={inputId} size={props.size} disabled={props.disabled} style={labelStyle}>
        Sample input
      </Label>
      <Input id={inputId} {...props} />
    </>
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
