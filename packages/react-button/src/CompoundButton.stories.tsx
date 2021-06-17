import * as React from 'react';
import { CompoundButton, CompoundButtonProps } from './index';
import { buttonBaseProps } from './Button.stories';
import { Playground } from './Playground';
import { PlaygroundProps, PropDefinition } from './Playground.types';

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
