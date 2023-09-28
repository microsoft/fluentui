import * as React from 'react';
import { MessageBarContextValues, MessageBarState } from './MessageBar.types';

export function useMessageBarContextValue_unstable(state: MessageBarState): MessageBarContextValues {
  const { layout } = state;

  const messageBarContext = React.useMemo(
    () => ({
      layout,
    }),
    [layout],
  );

  return {
    messageBar: messageBarContext,
  };
}
