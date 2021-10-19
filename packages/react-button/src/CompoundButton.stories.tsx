import * as React from 'react';
import { CompoundButton } from './CompoundButton';
import { buttonBaseProps } from './buttonBaseProps.stories';
import { Playground as PlaygroundWrapper } from './Playground.stories';
import type { CompoundButtonProps } from './CompoundButton';
import type { PlaygroundProps, PropDefinition } from './Playground.types.stories';

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

export const Playground = () => (
  <PlaygroundWrapper sections={compoundButtonProps}>
    <CompoundButton />
  </PlaygroundWrapper>
);

export default {
  title: 'Components/CompoundButton',
  component: CompoundButton,
};
