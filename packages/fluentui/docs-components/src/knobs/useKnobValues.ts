import values from 'object.values';
import * as React from 'react';

import { KnobContext } from './KnobContexts';
import { KnobDefinition } from './types';

export const useKnobValues = (): KnobDefinition[] => {
  const knobsContext = React.useContext(KnobContext);

  return values(knobsContext.knobs);
};
