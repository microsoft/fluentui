import type { ButtonProps } from './Button';
import type { PropDefinition } from './Playground.types.stories';

type ExampleProps = { iconOnly?: string };

export const buttonBaseProps: PropDefinition<ButtonProps & ExampleProps>[] = [
  { propName: 'block', propType: 'boolean' },
  { propName: 'appearance', propType: ['primary', 'outline', 'subtle', 'transparent'] },
  { propName: 'content', propType: 'string', defaultValue: 'This is a button', dependsOnProps: ['~iconOnly'] },
  { propName: 'disabled', propType: 'boolean', dependsOnProps: ['~disabledFocusable'] },
  { propName: 'disabledFocusable', propType: 'boolean', dependsOnProps: ['~disabled'] },
  { propName: 'icon', propType: 'boolean' },
  { propName: 'iconOnly', propType: 'boolean', dependsOnProps: ['icon'] },
  {
    propName: 'iconPosition',
    propType: ['before', 'after'],
    defaultValue: 'before',
    dependsOnProps: ['icon', '~iconOnly'],
  },
  { propName: 'shape', propType: ['rounded', 'circular', 'square'], defaultValue: 'rounded' },
  { propName: 'size', propType: ['small', 'medium', 'large'], defaultValue: 'medium' },
];
