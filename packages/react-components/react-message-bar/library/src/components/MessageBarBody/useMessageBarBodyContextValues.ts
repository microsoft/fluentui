import * as React from 'react';
import type { MessageBarBodyState, MessageBarBodyContextValues } from './MessageBarBody.types';

export function useMessageBarBodyContextValues_unstable(state: MessageBarBodyState): MessageBarBodyContextValues {
  const link = React.useMemo(
    () => ({
      inline: true,
    }),
    [],
  );

  return {
    link,
  };
}
