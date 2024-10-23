import * as React from 'react';
import { MessageBarContextValues, MessageBarState } from './MessageBar.types';

export function useMessageBarContextValue_unstable(state: MessageBarState): MessageBarContextValues {
  const { layout, actionsRef, bodyRef, titleId } = state;

  const messageBarContext = React.useMemo(
    () => ({
      layout,
      actionsRef,
      bodyRef,
      titleId,
    }),
    [layout, actionsRef, bodyRef, titleId],
  );

  return {
    messageBar: messageBarContext,
  };
}
