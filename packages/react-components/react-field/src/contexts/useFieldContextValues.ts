import * as React from 'react';

import { InfoButtonContextValue } from '@fluentui/react-infobutton/src/index';
import type { FieldContextValues, FieldState } from '../Field';

export const useFieldContextValues_unstable = (state: FieldState): FieldContextValues => {
  const { size, label } = state;
  const associatedLabelId = label?.id;

  const infoButton: InfoButtonContextValue = React.useMemo(
    () => ({
      associatedLabelId,
      size,
    }),
    [associatedLabelId, size],
  );

  return { infoButton };
};
