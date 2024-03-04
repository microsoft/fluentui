import * as React from 'react';

export type ListAccessibilityRoles = {
  listRole: string;
  listItemRole: string;
  setFocusableChildren: (focusableItems: boolean) => void;
};

export function useListAccessibilityRoles(hasSelection: boolean): ListAccessibilityRoles {
  const [hasFocusableChildren, setHasFocusableChildren] = React.useState<boolean>();

  const setFocusableChildren = React.useCallback(
    (focusableItems: boolean) => {
      if (hasFocusableChildren === undefined) {
        setHasFocusableChildren(focusableItems);
      }
    },
    [hasFocusableChildren],
  );

  const listRole = React.useMemo(() => {
    //not initialized, return "list"
    if (hasFocusableChildren === undefined) {
      return 'list';
    }

    if (hasFocusableChildren) {
      return 'grid';
    } else {
      if (hasSelection) {
        return 'listbox';
      } else {
        return 'list';
      }
    }
  }, [hasFocusableChildren, hasSelection]);

  const listItemRole = React.useMemo(() => {
    //not initialized, return "listitem"
    if (hasFocusableChildren === undefined) {
      return 'listitem';
    }

    if (hasFocusableChildren) {
      return 'row';
    } else {
      if (hasSelection) {
        return 'option';
      } else {
        return 'listitem';
      }
    }
  }, [hasFocusableChildren, hasSelection]);

  return {
    listRole,
    listItemRole,
    setFocusableChildren,
  };
}
