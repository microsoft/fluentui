import * as React from 'react';

export const DevOnlyStoryHeader = ({ children }: { children: React.ReactElement | string }) => (
  <div
    style={{
      padding: '1em',
      backgroundColor: '#EFEFEF',
      marginBottom: '1em',
    }}
  >
    <span style={{ fontWeight: 'bold' }}>[Dev Only]</span> {children}
  </div>
);
