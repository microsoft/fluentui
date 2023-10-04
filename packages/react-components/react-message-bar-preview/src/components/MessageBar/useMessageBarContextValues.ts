import * as React from 'react';
import { MessageBarContextValues, MessageBarState } from './MessageBar.types';

export function useMessageBarContextValue_unstable(state: MessageBarState): MessageBarContextValues {
  const { layout, actionsRef, bodyRef } = state;

  const messageBarContext = React.useMemo(
    () => ({
      layout,
      actionsRef,
      bodyRef,
    }),
    [layout, actionsRef, bodyRef],
  );

  return {
    messageBar: messageBarContext,
  };
}
