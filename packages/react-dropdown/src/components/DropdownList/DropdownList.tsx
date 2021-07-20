import * as React from 'react';
import { useDropdownList } from './useDropdownList';
import { DropdownListProps } from './DropdownList.types';
import { renderDropdownList } from './renderDropdownList';
import { useDropdownListStyles } from './useDropdownListStyles';

/**
 * Define a styled DropdownList, using the `useDropdownList` hook.
 * {@docCategory DropdownList}
 */
export const DropdownList: React.FunctionComponent<
  DropdownListProps & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, DropdownListProps>((props, ref) => {
  const state = useDropdownList(props, ref);

  useDropdownListStyles(state);
  return renderDropdownList(state);
});

DropdownList.displayName = 'DropdownList';
