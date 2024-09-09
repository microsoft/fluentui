import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { TextRampExample } from '../Text/Text.Weights.Example';

export const ShadowDOMTextExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <TextRampExample />
    </Shadow>
  );
};
