import * as React from 'react';
import { KeytipManager } from 'office-ui-fabric-react/lib/utilities/keytips/KeytipManager';
import { IKeytipProps } from '../../Keytip';
import { IProcessedStyleSet } from '../../Styling';
import {
  IOverflowSetItemProps,
  IOverflowSetProps,
  IOverflowSetStyles,
  IOverflowSetStyleProps,
} from './OverflowSet.types';
import { classNamesFunction } from '../../Utilities';
import { useConst } from '@uifabric/react-hooks';

interface IOverflowInternalState {
  persistedKeytips: { [uniqueID: string]: IKeytipProps };
  wrapperDivProps: React.HTMLProps<HTMLDivElement>;
  overflowKeytipSequences: string[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  newOverflowItems: any[];
}

const getClassNames = classNamesFunction<IOverflowSetStyleProps, IOverflowSetStyles>();

const useKeytipRegistrations = (
  persistedKeytips: { [uniqueID: string]: IKeytipProps },
  keytipManager: KeytipManager,
) => {
  React.useEffect(() => {
    Object.keys(persistedKeytips).forEach((keytipId: string) => {
      const keytip = persistedKeytips[keytipId];
      const uniqueID = keytipManager.register(keytip as IKeytipProps, true);
      // Update map
      persistedKeytips[uniqueID] = keytip;
      delete persistedKeytips[keytipId];
    });
    return () => {
      // Delete all persisted keytips saved
      Object.keys(persistedKeytips).forEach((uniqueID: string) => {
        keytipManager.unregister(persistedKeytips[uniqueID] as IKeytipProps, uniqueID, true);
        delete persistedKeytips[uniqueID];
      });
    };
  }, [persistedKeytips, keytipManager]);
};

export const OverflowButtonBase = (props: IOverflowSetProps) => {
  const keytipManager: KeytipManager = KeytipManager.getInstance();
  const { className, styles, vertical, overflowItems, keytipSequences } = props;
  const classNames: IProcessedStyleSet<IOverflowSetStyles> = getClassNames(styles, { className, vertical });
  const internalState = useConst<IOverflowInternalState>(() => ({
    persistedKeytips: {},
    wrapperDivProps: {
      className: classNames.overflowButton,
    },
    overflowKeytipSequences: keytipSequences,
    newOverflowItems: [],
  }));

  // Gets the subMenu for an overflow item
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getSubMenuForItem = (item: any): any[] | undefined => {
    // Checks if itemSubMenuProvider has been defined, if not defaults to subMenuProps
    if (props.itemSubMenuProvider) {
      return props.itemSubMenuProvider(item);
    }
    if (item.subMenuProps) {
      return item.subMenuProps.items;
    }
    return undefined;
  };

  if (internalState.overflowKeytipSequences) {
    overflowItems?.forEach(overflowItem => {
      const keytip = (overflowItem as IOverflowSetItemProps).keytipProps;
      if (keytip) {
        // Create persisted keytip
        const persistedKeytip: IKeytipProps = {
          content: keytip.content,
          keySequences: keytip.keySequences,
          disabled: keytip.disabled || !!(overflowItem.disabled || overflowItem.isDisabled),
          hasDynamicChildren: keytip.hasDynamicChildren,
          hasMenu: keytip.hasMenu,
        };
        if (keytip.hasDynamicChildren || getSubMenuForItem(overflowItem)) {
          // If the keytip has a submenu or children nodes, change onExecute to persistedKeytipExecute
          persistedKeytip.onExecute = keytipManager.menuExecute.bind(
            keytipManager,
            internalState.overflowKeytipSequences,
            overflowItem?.keytipProps?.keySequences,
          );
        } else {
          // If the keytip doesn't have a submenu, just execute the original function
          persistedKeytip.onExecute = keytip.onExecute;
        }
        // Add this persisted keytip to our internal list, use a temporary uniqueID (its content)
        // uniqueID will get updated on register
        internalState.persistedKeytips[persistedKeytip.content] = persistedKeytip;
        // Add the overflow sequence to this item
        const newOverflowItem = {
          ...overflowItem,
          keytipProps: {
            ...keytip,
            overflowSetSequence: internalState.overflowKeytipSequences,
          },
        };
        internalState.newOverflowItems.push(newOverflowItem);
      } else {
        // Nothing to change, add overflowItem to list
        internalState.newOverflowItems.push(overflowItem);
      }
    });
  } else {
    internalState.newOverflowItems = overflowItems!;
  }

  useKeytipRegistrations(internalState.persistedKeytips, keytipManager);

  return <div {...internalState.wrapperDivProps}>{props.onRenderOverflowButton(internalState.newOverflowItems)}</div>;
};
