import { ButtonProps } from './Button';
import { PropDefinition } from './Playground.types.stories';

type ExampleProps = { iconOnly?: string };

export const buttonBaseProps: PropDefinition<ButtonProps & ExampleProps>[] = [
  { propName: 'content', propType: 'string', defaultValue: 'This is a button', dependsOnProps: ['~iconOnly'] },
  { propName: 'disabled', propType: 'boolean' },
  { propName: 'icon', propType: 'boolean' },
  { propName: 'iconOnly', propType: 'boolean', dependsOnProps: ['icon'] },
  {
    propName: 'iconPosition',
    propType: ['before', 'after'],
    defaultValue: 'before',
    dependsOnProps: ['icon', '~iconOnly'],
  },
  { propName: 'primary', propType: 'boolean', dependsOnProps: ['~subtle', '~transparent'] },
  { propName: 'size', propType: ['small', 'medium', 'large'], defaultValue: 'medium' },
  { propName: 'subtle', propType: 'boolean', dependsOnProps: ['~primary', '~transparent'] },
  { propName: 'transparent', propType: 'boolean', dependsOnProps: ['~primary', '~subtle'] },
];
