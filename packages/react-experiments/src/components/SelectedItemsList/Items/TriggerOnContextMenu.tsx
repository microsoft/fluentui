import * as React from 'react';
import { TriggerProps } from './ItemTrigger.types';
import { ISelectedItemProps } from '../SelectedItemsList.types';

// `extends any` to trick the parser into parsing as a type decl instead of a jsx tag
export const TriggerOnContextMenu = <T extends any>(ItemComponent: React.ComponentType<ISelectedItemProps<T>>) => {
  return (props: TriggerProps<T>) => {
    const { onTrigger } = props;
    const trigger = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      onTrigger?.();
    };
    // eslint-disable-next-line react/jsx-no-bind
    return <ItemComponent {...props} onContextMenu={trigger} />;
  };
};
