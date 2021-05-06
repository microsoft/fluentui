import * as React from 'react';

export const isRightClick = (eventArgs: React.MouseEvent) => {
  return eventArgs.nativeEvent && eventArgs.nativeEvent.which === 3;
};
