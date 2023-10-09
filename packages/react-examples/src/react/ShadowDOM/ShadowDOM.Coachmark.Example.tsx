import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { CoachmarkBasicExample } from '../Coachmark/Coachmark.Basic.Example';

export const ShadowDOMCoachmarkExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <CoachmarkBasicExample />
    </Shadow>
  );
};
