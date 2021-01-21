import * as React from 'react';
import { useMenuGroupContext } from './menuGroupContext';

export const MenuSectionHeader = (props: any) => {
  const { headerId } = useMenuGroupContext();

  const styles = {
    fontWeight: 700,
  };

  return (
    <div id={headerId} style={styles}>
      {props.children}
    </div>
  );
};
