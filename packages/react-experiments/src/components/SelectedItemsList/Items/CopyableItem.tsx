import * as React from 'react';
import type { ISelectedItemProps } from '../SelectedItemsList.types';

type CopyableItemWrappedComponent<T> = React.ComponentType<ISelectedItemProps<T>>;

/**
 * Parameters to the EditingItem higher-order component
 */
export type CopyableItemProps<T> = {
  itemComponent: CopyableItemWrappedComponent<T>;
  getCopyItemText: (items: T[]) => string;
};

// `extends any` to trick the parser into parsing as a type decl instead of a jsx tag
export const CopyableItem = <T extends any>(
  copyableItemProps: CopyableItemProps<T>,
): CopyableItemWrappedComponent<T> => {
  return React.memo((selectedItemProps: ISelectedItemProps<T>) => {
    const onCopy = React.useCallback(
      item => {
        const copyText = copyableItemProps.getCopyItemText([item]);
        const copyInput = document.createElement('input') as HTMLInputElement;
        document.body.appendChild(copyInput);

        try {
          // Try to copy the text directly to the clipboard
          copyInput.value = copyText;
          copyInput.select();
          // eslint-disable-next-line deprecation/deprecation
          if (!document.execCommand('copy')) {
            // The command failed. Fallback to the method below.
            throw new Error();
          }
        } catch (err) {
          // no op
        } finally {
          document.body.removeChild(copyInput);
        }
      },
      // TODO: evaluate whether anything should be changed here based on warning:
      //   "React Hook React.useCallback has an unnecessary dependency: 'copyableItemProps.getCopyItemText'.
      //   Either exclude it or remove the dependency array. Outer scope values like
      //   'copyableItemProps.getCopyItemText' aren't valid dependencies because mutating them
      //   doesn't re-render the component."
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [copyableItemProps.getCopyItemText],
    );

    const ItemComponent = copyableItemProps.itemComponent;
    return <ItemComponent {...selectedItemProps} onCopy={onCopy} />;
  });
};
