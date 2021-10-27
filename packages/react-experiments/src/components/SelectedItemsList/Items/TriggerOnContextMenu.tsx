import * as React from 'react';
import type { TriggerProps } from './ItemTrigger.types';
import type { ISelectedItemProps } from '../SelectedItemsList.types';

// `extends any` to trick the parser into parsing as a type decl instead of a jsx tag
export const TriggerOnContextMenu = <T extends any>(ItemComponent: React.ComponentType<ISelectedItemProps<T>>) => {
  return (props: TriggerProps<T>) => {
    const { onTrigger } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks -- this is a component
    const trigger = React.useCallback(
      e => {
        e.preventDefault();
        e.stopPropagation();
        onTrigger?.();
      },
      [onTrigger],
    );
    return <ItemComponent {...props} onContextMenu={trigger} />;
  };
};
