import * as React from 'react';
import { KeytipManager } from '../../utilities/keytips/KeytipManager';
import { IKeytipProps } from '../../Keytip';
import { IOverflowSetItemProps, IOverflowSetProps } from './OverflowSet.types';
import { useConst, usePrevious } from '@fluentui/react-hooks';
import { memoizeFunction } from '../../../../utilities/lib/memoize';

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
  const keytipsToRegister = useConst<IKeytipProps[]>([]);
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

  const newOverflowItems = React.useMemo(() => {
    let currentOverflowItems: IOverflowSetItemProps[] | undefined = [];

    if (keytipSequences) {
      overflowItems?.forEach(overflowItem => {
        const keytip = (overflowItem as IOverflowSetItemProps).keytipProps;

        if (keytip) {
          // Create persisted keytip
          keytipsToRegister.push(
            createPersistedKeytip(
              keytip,
              overflowItem,
              keytipManager,
              keytipSequences,
              getSubMenuForItem(overflowItem),
            ),
          );

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
  }, [overflowItems, itemSubMenuProvider, keytipManager, keytipSequences, keytipsToRegister]);

  useKeytipRegistrations(persistedKeytips, keytipsToRegister, keytipManager);

  return <div className={className}>{onRenderOverflowButton(newOverflowItems)}</div>;
};
