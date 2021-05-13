import * as React from 'react';
import { CompoundButton } from '@fluentui/react-button';
import { buttonBaseProps } from '../Button/Button.stories';
import { Playground, PlaygroundProps, PropDefinition } from '../Playground';

const compoundButtonBaseProps: PropDefinition[] = [
  {
    propName: 'secondaryContent',
    propType: 'string',
    defaultValue: 'This is the secondary content',
    dependsOnProps: ['~iconOnly'],
  },
];

const compoundButtonProps: PlaygroundProps['sections'] = [
  { sectionName: 'Button props', propList: buttonBaseProps },
  { sectionName: 'CompoundButton props', propList: compoundButtonBaseProps },
];

export const CompoundButtonPlayground = () => (
  <Playground sections={compoundButtonProps}>
    <CompoundButton />
  </Playground>
);
