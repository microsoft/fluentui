import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { TeachingBubbleMultiStepExample } from '../TeachingBubble/TeachingBubble.MultiStep.Example';

export const ShadowDOMTeachingBubbleMultiStepExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <TeachingBubbleMultiStepExample />
    </Shadow>
  );
};
