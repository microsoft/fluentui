import type { ButtonProps } from './Button';
import type { PropDefinition } from './Playground.types.stories';

export const buttonBaseProps: PropDefinition<ButtonProps>[] = [
  { propName: 'appearance', propType: ['default', 'outline', 'primary', 'subtle', 'transparent'] },
  { propName: 'block', propType: 'boolean' },
  { propName: 'content', propType: 'string', defaultValue: 'This is a button', dependsOnProps: [] },
  { propName: 'disabled', propType: 'boolean', dependsOnProps: ['~disabledFocusable'] },
  { propName: 'disabledFocusable', propType: 'boolean', dependsOnProps: ['~disabled'] },
  { propName: 'icon', propType: 'boolean' },
  {
    propName: 'iconPosition',
    propType: ['before', 'after'],
    defaultValue: 'before',
    dependsOnProps: ['icon'],
  },
  { propName: 'shape', propType: ['rounded', 'circular', 'square'], defaultValue: 'rounded' },
  { propName: 'size', propType: ['small', 'medium', 'large'], defaultValue: 'medium' },
];
