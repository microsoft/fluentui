import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { TeachingBubbleCondensedExample } from '../TeachingBubble/TeachingBubble.Condensed.Example';

export const ShadowDOMTeachingBubbleCondensedExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <TeachingBubbleCondensedExample />
    </Shadow>
  );
};
