import * as React from 'react';

// Visually hides elements which remain visible for screen reader
export const screenReaderContainerStyles: React.CSSProperties = {
  border: '0',
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: '0',
  position: 'absolute',
  width: '1px',
};
