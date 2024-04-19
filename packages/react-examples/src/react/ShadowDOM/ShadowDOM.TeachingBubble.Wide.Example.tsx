import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { TeachingBubbleWideExample } from '../TeachingBubble/TeachingBubble.Wide.Example';

export const ShadowDOMTeachingBubbleWideExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <TeachingBubbleWideExample />
    </Shadow>
  );
};
