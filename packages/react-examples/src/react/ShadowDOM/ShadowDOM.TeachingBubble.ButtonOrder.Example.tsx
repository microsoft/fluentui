import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { TeachingBubbleButtonOrderExample } from '../TeachingBubble/TeachingBubble.ButtonOrder.Example';

export const ShadowDOMTeachingBubbleButtonOrderExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <TeachingBubbleButtonOrderExample />
    </Shadow>
  );
};
