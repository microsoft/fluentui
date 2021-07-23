import { ButtonProps } from './Button';
import { PropDefinition } from './Playground.types.stories';

type ExampleProps = { iconOnly?: string };

export const buttonBaseProps: PropDefinition<ButtonProps & ExampleProps>[] = [
  { propName: 'block', propType: 'boolean' },
  { propName: 'circular', propType: 'boolean' },
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
  { propName: 'outline', propType: 'boolean', dependsOnProps: ['~primary', '~subtle', '~transparent'] },
  { propName: 'primary', propType: 'boolean', dependsOnProps: ['~outline', '~subtle', '~transparent'] },
  { propName: 'size', propType: ['small', 'medium', 'large'], defaultValue: 'medium' },
  { propName: 'subtle', propType: 'boolean', dependsOnProps: ['~outline', '~primary', '~transparent'] },
  { propName: 'transparent', propType: 'boolean', dependsOnProps: ['~outline', '~primary', '~subtle'] },
];
