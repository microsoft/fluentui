import * as React from 'react';
import { useDropdownList } from './useDropdownList';
import { DropdownListProps } from './DropdownList.types';
import { renderDropdownList } from './renderDropdownList';

/**
 * Define a styled DropdownList, using the `useDropdownList` hook.
 * {@docCategory DropdownList}
 */
export const DropdownList: React.FunctionComponent<
  DropdownListProps & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, DropdownListProps>((props, ref) => {
  const state = useDropdownList(props, ref);

  return renderDropdownList(state);
});

DropdownList.displayName = 'DropdownList';
