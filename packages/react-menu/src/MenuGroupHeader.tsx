import * as React from 'react';
import { useMenuGroupContext } from './menuGroupContext';

export const MenuGroupHeader = (props: { children: React.ReactNode }) => {
  const { headerId } = useMenuGroupContext();

  const styles = {
    fontWeight: 700,
    width: 'fit-content',
  };

  return (
    <div aria-hidden="true" id={headerId} style={styles}>
      {props.children}
    </div>
  );
};
