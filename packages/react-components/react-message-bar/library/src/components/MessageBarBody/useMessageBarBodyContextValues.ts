import * as React from 'react';
import type { MessageBarBodyState, MessageBarBodyContextValues } from './MessageBarBody.types';

export function useMessageBarBodyContextValues_unstable(state: MessageBarBodyState): MessageBarBodyContextValues {
  const { linkInline } = state;

  const link = React.useMemo(
    () => ({
      inline: linkInline,
    }),
    [linkInline],
  );

  return {
    link,
  };
}
