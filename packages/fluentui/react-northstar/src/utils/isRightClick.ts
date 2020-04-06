import * as React from 'react';

const isRightClick = (eventArgs: React.MouseEvent) => {
  return eventArgs.nativeEvent && eventArgs.nativeEvent.which === 3;
};

export default isRightClick;
