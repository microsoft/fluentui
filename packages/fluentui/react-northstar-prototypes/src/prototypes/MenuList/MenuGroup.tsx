import * as React from 'react';
import { MenuGroupContextProvider } from './menuGroupContext';

let count = 0;

export const MenuGroup = (props: any) => {
  const headerId = React.useRef<string>(`menu-group-${count++}`);

  return (
    <MenuGroupContextProvider value={{ headerId: headerId.current }}>
      <div role="group" aria-labelledBy={headerId.current}>
        {props.children}
      </div>
    </MenuGroupContextProvider>
  );
};
