import * as React from 'react';
import { CompoundButton, CompoundButtonProps } from './CompoundButton';
import { Playground } from './Playground.stories';
import { PlaygroundProps, PropDefinition } from './Playground.types.stories';
import { buttonBaseProps } from './buttonBaseProps.stories';

type ExampleProps = { iconOnly?: string };

const compoundButtonBaseProps: PropDefinition<CompoundButtonProps & ExampleProps>[] = [
  {
    propName: 'secondaryContent',
    propType: 'string',
    defaultValue: 'This is the secondary content',
    dependsOnProps: ['~iconOnly'],
  },
];

const compoundButtonProps: PlaygroundProps<CompoundButtonProps>['sections'] = [
  { sectionName: 'Button props', propList: buttonBaseProps },
  { sectionName: 'CompoundButton props', propList: compoundButtonBaseProps },
];

export const CompoundButtonPlayground = () => (
  <Playground sections={compoundButtonProps}>
    <CompoundButton />
  </Playground>
);

export default {
  title: 'Components/CompoundButton',
  component: CompoundButton,
};
