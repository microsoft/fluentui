import * as React from 'react';
import { KeytipManager } from '../../utilities/keytips/KeytipManager';
import { IKeytipProps } from '../../Keytip';
import { IOverflowSetItemProps, IOverflowSetProps } from './OverflowSet.types';
import { useConst, usePrevious } from '@fluentui/react-hooks';
import { memoizeFunction } from '../../../../utilities/lib/memoize';

const registerPersistedKeytip = (
  keytip: IKeytipProps,
  keytipManager: KeytipManager,
  registeredPersistedKeytips: { [content: string]: { uniqueID: string; keytip: IKeytipProps } },
) => {
  const uniqueID = keytipManager.register(keytip, true);
  // Update map
  registeredPersistedKeytips[keytip.content] = { uniqueID, keytip };
};

const useKeytipRegistrations = (
  registeredPersistedKeytips: { [content: string]: { uniqueID: string; keytip: IKeytipProps } },
  keytipsToRegisterOrUpdate: { [content: string]: IKeytipProps },
  keytipManager: KeytipManager,
) => {
  const prevPersistedKeytips = usePrevious(registeredPersistedKeytips);

  // Update
  React.useEffect(() => {
    if (prevPersistedKeytips) {
      // Only run update after mount, which means that prevPersistedKeytips is defined
      for (const keytipContent of Object.keys(keytipsToRegisterOrUpdate)) {
        // Find the previous keytip if it exists
        const keytip = keytipsToRegisterOrUpdate[keytipContent];
        const oldKeytip = prevPersistedKeytips[keytipContent];
        if (oldKeytip && (keytip !== oldKeytip.keytip || keytip.disabled !== oldKeytip.keytip.disabled)) {
          // Keytip was found and it's been changed, update
          const uniqueID = oldKeytip.uniqueID;
          keytipManager.update(keytip, uniqueID);
          registeredPersistedKeytips[keytip.content] = { uniqueID, keytip };
        } else if (!oldKeytip) {
          // Keytip was not found, register it
          registerPersistedKeytip(keytip, keytipManager, registeredPersistedKeytips);
        }
      }
    }
  });

  // Mount/Unmount
  React.useEffect(() => {
    for (const keytip of Object.keys(keytipsToRegisterOrUpdate)) {
      // Register on Mount
      registerPersistedKeytip(keytipsToRegisterOrUpdate[keytip], keytipManager, registeredPersistedKeytips);
    }
    return () => {
      // Unregister and delete all persisted keytips saved on unmount
      // TODO: not sure if we should register prev or curr
      Object.keys(registeredPersistedKeytips).forEach((key: string) => {
        keytipManager.unregister(
          registeredPersistedKeytips[key].keytip,
          registeredPersistedKeytips[key].uniqueID,
          true,
        );
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

const createPersistedKeytip = memoizeFunction(
  (
    keytip: IKeytipProps,
    overflowItem: IOverflowSetItemProps,
    keytipManager: KeytipManager,
    keytipSequences?: string[],
    subMenuForItem?: boolean | any[],
  ): IKeytipProps => {
    const persistedKeytip: IKeytipProps = {
      content: keytip.content,
      keySequences: keytip.keySequences,
      disabled: keytip.disabled || !!(overflowItem.disabled || overflowItem.isDisabled),
      hasDynamicChildren: keytip.hasDynamicChildren,
      hasMenu: keytip.hasMenu,
    };

    if (keytip.hasDynamicChildren || subMenuForItem) {
      // If the keytip has a submenu or children nodes, change onExecute to persistedKeytipExecute
      persistedKeytip.onExecute = keytipManager.menuExecute.bind(
        keytipManager,
        keytipSequences,
        overflowItem?.keytipProps?.keySequences,
      );
    } else {
      // If the keytip doesn't have a submenu, just execute the original function
      persistedKeytip.onExecute = keytip.onExecute;
    }

    return persistedKeytip;
  },
);

export const OverflowButton = (props: IOverflowSetProps) => {
  const keytipManager: KeytipManager = KeytipManager.getInstance();
  const { className, overflowItems, keytipSequences, itemSubMenuProvider, onRenderOverflowButton } = props;
  const keytipsToRegisterOrUpdate = useConst<{ [content: string]: IKeytipProps }>({});
  const persistedKeytips = useConst<{ [content: string]: { uniqueID: string; keytip: IKeytipProps } }>({});

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

  const newOverflowItems = React.useMemo(() => {
    let currentOverflowItems: IOverflowSetItemProps[] | undefined = [];

    if (keytipSequences) {
      overflowItems?.forEach(overflowItem => {
        const keytip = (overflowItem as IOverflowSetItemProps).keytipProps;

        if (keytip) {
          // Create persisted keytip
          /*
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
          } else {
            // If the keytip doesn't have a submenu, just execute the original function
            persistedKeytip.onExecute = keytip.onExecute;
          }

          // Add this persisted keytip to our internal list, use a temporary uniqueID (its content)
          // uniqueID will get updated on register
          */

          keytipsToRegisterOrUpdate[keytip.content] = createPersistedKeytip(
            keytip,
            overflowItem,
            keytipManager,
            keytipSequences,
            getSubMenuForItem(overflowItem),
          );
          // persistedKeytips[unregisteredKeytipID + persistedKeytip.content] = persistedKeytip;

          // Add the overflow sequence to this item
          const newOverflowItem = {
            ...overflowItem,
            keytipProps: {
              ...keytip,
              overflowSetSequence: keytipSequences,
            },
          };
          currentOverflowItems?.push(newOverflowItem);
        } else {
          // Nothing to change, add overflowItem to list
          currentOverflowItems?.push(overflowItem);
        }
      });
    } else {
      currentOverflowItems = overflowItems!;
    }
    return currentOverflowItems;
  }, [overflowItems, itemSubMenuProvider, keytipManager, keytipSequences, keytipsToRegisterOrUpdate]);

  useKeytipRegistrations(persistedKeytips, keytipsToRegisterOrUpdate, keytipManager);

  return <div className={className}>{onRenderOverflowButton(newOverflowItems)}</div>;
};
