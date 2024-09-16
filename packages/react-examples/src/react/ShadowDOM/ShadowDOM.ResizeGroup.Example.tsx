import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { FlexBoxResizeGroupExample } from '../ResizeGroup/ResizeGroup.FlexBox.Example';

export const ShadowDOMResizeGroupExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <FlexBoxResizeGroupExample />
    </Shadow>
  );
};
