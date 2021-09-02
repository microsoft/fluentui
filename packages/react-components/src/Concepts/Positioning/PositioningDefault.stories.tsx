import * as React from 'react';
import { PositioningProps } from './types';
import { PositionedComponent } from './utils.stories';

export const Default = (props: PositioningProps) => {
  return <PositionedComponent positioning={props} />;
};
