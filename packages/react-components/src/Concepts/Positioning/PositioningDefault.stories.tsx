import * as React from 'react';
import { PositioningProps } from '@fluentui/react-positioning';
import { PositionedComponent } from './utils.stories';

export const Default = (props: PositioningProps) => {
  return <PositionedComponent positioning={props} />;
};
