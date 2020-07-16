import * as React from 'react';
import { FocusZone, FocusZoneDirection, IFocusZone } from '@fluentui/react-focus';
import { useConst } from '@uifabric/react-hooks';
import { KeytipManager } from 'office-ui-fabric-react/lib/utilities/keytips/KeytipManager';
import { IKeytipProps } from '../../Keytip';
import { IProcessedStyleSet } from '../../Styling';
import {
  IOverflowSetItemProps,
  IOverflowSetProps,
  IOverflowSetStyles,
  IOverflowSetStyleProps,
  IOverflowSet,
} from './OverflowSet.types';
import {
  classNamesFunction,
  divProperties,
  elementContains,
  getNativeProps,
  warnMutuallyExclusive,
  focusFirstChild,
} from '../../Utilities';

const getClassNames = classNamesFunction<IOverflowSetStyleProps, IOverflowSetStyles>();
const COMPONENT_NAME = 'OverflowSet';

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
      });
      persistedKeytips = {};
    };
  }, [persistedKeytips, keytipManager]);
};

const useComponentRef = (
  props: IOverflowSetProps,
  focusZone: React.RefObject<IFocusZone>,
  divContainer: React.RefObject<HTMLDivElement>,
) => {
  React.useImperativeHandle(
    props.componentRef,
    (): IOverflowSet => ({
      focus: (forceIntoFirstElement?: boolean): boolean => {
        let focusSucceeded = false;
        // eslint-disable-next-line deprecation/deprecation
        if (props.doNotContainWithinFocusZone) {
          if (divContainer.current) {
            focusSucceeded = focusFirstChild(divContainer.current);
          }
        } else if (focusZone.current) {
          focusSucceeded = focusZone.current.focus(forceIntoFirstElement);
        }
        return focusSucceeded;
      },
      focusElement: (childElement?: HTMLElement) => {
        let focusSucceeded = false;
        if (!childElement) {
          return false;
        }
        // eslint-disable-next-line deprecation/deprecation
        if (props.doNotContainWithinFocusZone) {
          if (divContainer.current && elementContains(divContainer.current, childElement)) {
            childElement.focus();
            focusSucceeded = document.activeElement === childElement;
          }
        } else if (focusZone.current) {
          focusSucceeded = focusZone.current.focusElement(childElement);
        }
        return focusSucceeded;
      },
    }),
    [],
  );
};

export const OverflowSetBase = React.forwardRef((props: IOverflowSetProps, forwardedRef: React.Ref<HTMLDivElement>) => {
  const focusZone = React.useRef<IFocusZone>(null);
  const divContainer = React.useRef<HTMLDivElement>(null);
  const keytipManager: KeytipManager = KeytipManager.getInstance();
  const {
    items,
    overflowItems,
    className,
    // eslint-disable-next-line deprecation/deprecation
    focusZoneProps,
    styles,
    vertical,
    // eslint-disable-next-line deprecation/deprecation
    doNotContainWithinFocusZone,
    role,
    overflowSide = 'end',
  } = props;
  let Tag;
  let uniqueComponentProps;

  const classNames: IProcessedStyleSet<IOverflowSetStyles> = getClassNames(styles, { className, vertical });

  const showOverflow = overflowItems && overflowItems.length > 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onRenderOverflowButtonWrapper = (itemsProp: any[]): JSX.Element => {
    const persistedKeytips: { [uniqueID: string]: IKeytipProps } = {};
    const wrapperDivProps: React.HTMLProps<HTMLDivElement> = {
      className: classNames.overflowButton,
    };
    const overflowKeytipSequences = props.keytipSequences;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let newOverflowItems: any[] = [];
    if (overflowKeytipSequences) {
      itemsProp.forEach(overflowItem => {
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
              overflowKeytipSequences,
              overflowItem.keytipProps.keySequences,
            );
          } else {
            // If the keytip doesn't have a submenu, just execute the original function
            persistedKeytip.onExecute = keytip.onExecute;
          }
          // Add this persisted keytip to our internal list, use a temporary uniqueID (its content)
          // uniqueID will get updated on register
          persistedKeytips[persistedKeytip.content] = persistedKeytip;
          // Add the overflow sequence to this item
          const newOverflowItem = {
            ...overflowItem,
            keytipProps: {
              ...keytip,
              overflowSetSequence: overflowKeytipSequences,
            },
          };
          newOverflowItems.push(newOverflowItem);
        } else {
          // Nothing to change, add overflowItem to list
          newOverflowItems.push(overflowItem);
        }
      });
    } else {
      newOverflowItems = itemsProp;
    }
    // Set up the keytip effect here, after persistedKeytips
    useKeytipRegistrations(persistedKeytips, keytipManager);
    return <div {...wrapperDivProps}>{props.onRenderOverflowButton(newOverflowItems)}</div>;
  };

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

  useConst(() => {
    warnMutuallyExclusive(COMPONENT_NAME, props, {
      doNotContainWithinFocusZone: 'focusZoneProps',
    });
  });

  if (doNotContainWithinFocusZone) {
    Tag = 'div';
    uniqueComponentProps = {
      ...getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties),
      ref: divContainer,
    };
  } else {
    Tag = FocusZone;
    uniqueComponentProps = {
      ...getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties),
      ...focusZoneProps,
      componentRef: focusZone,
      direction: vertical ? FocusZoneDirection.vertical : FocusZoneDirection.horizontal,
    };
  }

  useComponentRef(props, focusZone, divContainer);

  return (
    <Tag
      role={role || 'group'}
      aria-orientation={role === 'menubar' ? (vertical === true ? 'vertical' : 'horizontal') : undefined}
      {...uniqueComponentProps}
      className={classNames.root}
    >
      {overflowSide === 'start' && showOverflow && onRenderOverflowButtonWrapper(overflowItems!)}
      {items &&
        items.map((item, i) => (
          <div key={item.key} className={classNames.item}>
            {props.onRenderItem(item)}
          </div>
        ))}
      {overflowSide === 'end' && showOverflow && onRenderOverflowButtonWrapper(overflowItems!)}
    </Tag>
  );
});
OverflowSetBase.displayName = COMPONENT_NAME;
