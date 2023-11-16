import * as React from 'react';
import { MessageBarActionsContextValues } from './MessageBarActions.types';

export function useMessageBarActionsContextValue_unstable(): MessageBarActionsContextValues {
  const buttonContext = React.useMemo(
    () => ({
      size: 'small' as const,
    }),
    [],
  );

  return {
    button: buttonContext,
  };
}
