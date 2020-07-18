import * as React from 'react';
import { TriggerProps } from './ItemTrigger.types';
import { ISelectedItemProps } from '../SelectedItemsList.types';

// `extends any` to trick the parser into parsing as a type decl instead of a jsx tag
export const TriggerOnContextMenu = <T extends any>(ItemComponent: React.ComponentType<ISelectedItemProps<T>>) => {
  // TODO: verify fix with @nebhatna
  return React.memo((props: TriggerProps<T>) => {
    const { onTrigger } = props;
    const trigger = React.useCallback(
      e => {
        e.preventDefault();
        e.stopPropagation();
        onTrigger?.();
      },
      [onTrigger],
    );
    return <ItemComponent {...props} onContextMenu={trigger} />;
  });
};
