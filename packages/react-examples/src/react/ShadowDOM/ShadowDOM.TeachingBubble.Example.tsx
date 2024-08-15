import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { TeachingBubbleBasicExample } from '../TeachingBubble/TeachingBubble.Basic.Example';

export const ShadowDOMTeachingBubbleExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <TeachingBubbleBasicExample />
    </Shadow>
  );
};
