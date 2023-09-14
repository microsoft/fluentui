import * as React from 'react';
import { KeytipManager } from '../../utilities/keytips/KeytipManager';
import { useConst, usePrevious } from '@fluentui/react-hooks';
import type { IKeytipProps } from '../../Keytip';
import type { IOverflowSetItemProps, IOverflowSetProps } from './OverflowSet.types';

const registerPersistedKeytips = (
  keytipsToRegister: IKeytipProps[],
  keytipManager: KeytipManager,
  registeredPersistedKeytips: { [uniqueID: string]: IKeytipProps },
) => {
  for (const keytip of keytipsToRegister) {
    const uniqueID = keytipManager.register(keytip, true);
    // Update map
    registeredPersistedKeytips[uniqueID] = keytip;
  }
};

const unregisterPersistedKeytips = (
  keytipManager: KeytipManager,
  registeredPersistedKeytips: { [uniqueID: string]: IKeytipProps },
) => {
  for (const uniqueID of Object.keys(registeredPersistedKeytips)) {
    keytipManager.unregister(registeredPersistedKeytips[uniqueID], uniqueID, true);
    delete registeredPersistedKeytips[uniqueID];
  }
};

const useKeytipRegistrations = (
  registeredPersistedKeytips: { [uniqueID: string]: IKeytipProps },
  keytipsToRegister: IKeytipProps[],
  keytipManager: KeytipManager,
) => {
  const prevPersistedKeytips = usePrevious(registeredPersistedKeytips);

  // Update
  React.useEffect(() => {
    if (prevPersistedKeytips) {
      // Unregister old keytips
      unregisterPersistedKeytips(keytipManager, prevPersistedKeytips);
      // Register new keytips
      registerPersistedKeytips(keytipsToRegister, keytipManager, registeredPersistedKeytips);
    }
  });

  // Mount/Unmount
  React.useEffect(() => {
    // Register on mount
    registerPersistedKeytips(keytipsToRegister, keytipManager, registeredPersistedKeytips);
    return () => {
      // Unregister on unmount
      unregisterPersistedKeytips(keytipManager, registeredPersistedKeytips);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const OverflowButton = (props: IOverflowSetProps) => {
  const keytipManager: KeytipManager = KeytipManager.getInstance();
  const { className, overflowItems, keytipSequences, itemSubMenuProvider, onRenderOverflowButton } = props;

  const persistedKeytips = useConst<{ [uniqueID: string]: IKeytipProps }>({});

  // Gets the subMenu for an overflow item
  const getSubMenuForItem = React.useCallback(
    (item: IOverflowSetItemProps) => {
      // Checks if itemSubMenuProvider has been defined, if not defaults to subMenuProps
      if (itemSubMenuProvider) {
        return itemSubMenuProvider(item);
      }
      if (item.subMenuProps) {
        return item.subMenuProps.items;
      }
      return undefined;
    },
    [itemSubMenuProvider],
  );

  const { modifiedOverflowItems, keytipsToRegister } = React.useMemo(() => {
    const newKeytipsToRegister: IKeytipProps[] = [];
    let newOverflowItems: IOverflowSetItemProps[] | undefined = [];

    if (keytipSequences) {
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
              keytipSequences,
              overflowItem?.keytipProps?.keySequences,
            );
            persistedKeytip.hasOverflowSubMenu = true;
          } else {
            // If the keytip doesn't have a submenu, just execute the original function
            persistedKeytip.onExecute = keytip.onExecute;
          }

          newKeytipsToRegister.push(persistedKeytip);

          // Add the overflow sequence to this item
          const newOverflowItem = {
            ...overflowItem,
            keytipProps: {
              ...keytip,
              overflowSetSequence: keytipSequences,
            },
          };
          newOverflowItems?.push(newOverflowItem);
        } else {
          // Nothing to change, add overflowItem to list
          newOverflowItems?.push(overflowItem);
        }
      });
    } else {
      newOverflowItems = overflowItems;
    }
    return { modifiedOverflowItems: newOverflowItems, keytipsToRegister: newKeytipsToRegister };
  }, [overflowItems, getSubMenuForItem, keytipManager, keytipSequences]);

  useKeytipRegistrations(persistedKeytips, keytipsToRegister, keytipManager);

  return <div className={className}>{onRenderOverflowButton(modifiedOverflowItems)}</div>;
};
