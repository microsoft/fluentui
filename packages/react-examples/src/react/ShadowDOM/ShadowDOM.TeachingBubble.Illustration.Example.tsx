import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { TeachingBubbleIllustrationExample } from '../TeachingBubble/TeachingBubble.Illustration.Example';

export const ShadowDOMTeachingBubbleIllustrationExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <TeachingBubbleIllustrationExample />
    </Shadow>
  );
};
