import * as React from 'react';

export const MenuDivider = () => {
  const styles = {
    marginTop: '0.25rem',
    height: 1,
    backgroundColor: 'black',
  };

  return <div style={styles} role="separator" aria-hidden="true" />;
};
