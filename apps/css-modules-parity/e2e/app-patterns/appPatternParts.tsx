import * as React from 'react';
import {
  InlineDrawer,
  MenuItem,
  MenuItemSwitch,
  MenuList,
  OverlayDrawer,
  Tab,
  TabList,
  renderInlineDrawer_unstable,
  renderMenuItemSwitch_unstable,
  renderMenuItem_unstable,
  renderMenuList_unstable,
  renderOverlayDrawer_unstable,
  renderTabList_unstable,
  renderTab_unstable,
  useDrawerContextValue,
  useInlineDrawer_unstable,
  useMenuItemSwitch_unstable,
  useMenuItem_unstable,
  useMenuListContextValues_unstable,
  useMenuList_unstable,
  useOverlayDrawer_unstable,
  useTabListContextValues_unstable,
  useTabList_unstable,
  useTab_unstable,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
// Explicit `.ts` imports bypass the CSS Modules resolution, giving the original Griffel implementations.
import { useInlineDrawerStyles_unstable as useGriffelInlineDrawerStyles } from '../../../../packages/react-components/react-drawer/library/src/components/InlineDrawer/useInlineDrawerStyles.styles.ts';
import { useOverlayDrawerStyles_unstable as useGriffelOverlayDrawerStyles } from '../../../../packages/react-components/react-drawer/library/src/components/OverlayDrawer/useOverlayDrawerStyles.styles.ts';
import { useMenuItemStyles_unstable as useGriffelMenuItemStyles } from '../../../../packages/react-components/react-menu/library/src/components/MenuItem/useMenuItemStyles.styles.ts';
import { useMenuItemSwitchStyles_unstable as useGriffelMenuItemSwitchStyles } from '../../../../packages/react-components/react-menu/library/src/components/MenuItemSwitch/useMenuItemSwitchStyles.styles.ts';
import { useMenuListStyles_unstable as useGriffelMenuListStyles } from '../../../../packages/react-components/react-menu/library/src/components/MenuList/useMenuListStyles.styles.ts';
import { useTabStyles_unstable as useGriffelTabStyles } from '../../../../packages/react-components/react-tabs/library/src/components/Tab/useTabStyles.styles.ts';
import { useTabListStyles_unstable as useGriffelTabListStyles } from '../../../../packages/react-components/react-tabs/library/src/components/TabList/useTabListStyles.styles.ts';
import { defaultRoot, griffel, icon } from '../harness';
import type { AnyComponent, AppPattern, ComponentSpec, Implementation } from '../harness';

/**
 * Components the direction, icon and global class app patterns render besides `core`: menu items in a MenuList, a Tab
 * in a TabList, and drawers. Parents use the implementation under test, like the component specs.
 */
const parts: Record<Implementation, Record<'MenuList' | 'TabList', AnyComponent>> = {
  css: { MenuList: MenuList as AnyComponent, TabList: TabList as AnyComponent },
  griffel: {
    MenuList: griffel(
      'MenuList',
      useMenuList_unstable,
      useGriffelMenuListStyles,
      renderMenuList_unstable,
      useMenuListContextValues_unstable,
    ),
    TabList: griffel(
      'TabList',
      useTabList_unstable,
      useGriffelTabListStyles,
      renderTabList_unstable,
      useTabListContextValues_unstable,
    ),
  },
};

const byClass = (className: string) => (container: HTMLElement) =>
  container.querySelector<HTMLElement>(`.${className}`)!;

/** Renders portaled content into a node inside the parity container. */
const InContainer = ({ children }: { children: (mountNode: HTMLElement) => JSXElement }) => {
  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);
  return <div ref={setMountNode}>{mountNode ? children(mountNode) : null}</div>;
};

export const partSpecs: Record<
  'MenuItem' | 'MenuItemSwitch' | 'Tab' | 'OverlayDrawer' | 'InlineDrawer',
  ComponentSpec
> = {
  MenuItem: {
    css: MenuItem as AnyComponent,
    griffel: griffel('MenuItem', useMenuItem_unstable, useGriffelMenuItemStyles, renderMenuItem_unstable),
    findRoot: byClass('fui-MenuItem'),
    slot: 'icon',
    sampledSlots: ['fui-MenuItem__icon', 'fui-MenuItem__content'],
    interactive: true,
    props: { icon, children: 'Item' },
    variants: [{}, { disabled: true }],
    wrap: (element, implementation) => {
      const List = parts[implementation].MenuList;
      return <List>{element}</List>;
    },
  },
  MenuItemSwitch: {
    css: MenuItemSwitch as unknown as AnyComponent,
    griffel: griffel(
      'MenuItemSwitch',
      useMenuItemSwitch_unstable,
      useGriffelMenuItemSwitchStyles,
      renderMenuItemSwitch_unstable,
    ),
    findRoot: byClass('fui-MenuItemSwitch'),
    slot: 'switchIndicator',
    // The thumb is the element the RTL rule moves.
    sampledSlots: ['fui-MenuItemSwitch__switchIndicator', 'fui-MenuItemSwitch__switchIndicator__circleFilled'],
    interactive: true,
    props: { name: 'options', children: 'Switch' },
    variants: [{ value: 'checked' }, { value: 'unchecked' }],
    wrap: (element, implementation) => {
      const List = parts[implementation].MenuList;
      return <List checkedValues={{ options: ['checked'] }}>{element}</List>;
    },
  },
  Tab: {
    css: Tab as unknown as AnyComponent,
    griffel: griffel('Tab', useTab_unstable, useGriffelTabStyles, renderTab_unstable),
    findRoot: byClass('fui-Tab'),
    slot: 'icon',
    sampledSlots: ['fui-Tab__icon', 'fui-Tab__content'],
    interactive: true,
    props: { icon, value: 'tab', children: 'Tab' },
    variants: [{}, { value: 'selected' }],
    wrap: (element, implementation) => {
      const List = parts[implementation].TabList;
      const OtherTab = partSpecs.Tab[implementation];
      return (
        <List selectedValue="selected">
          {element}
          <OtherTab value="other">Other</OtherTab>
        </List>
      );
    },
  },
  OverlayDrawer: {
    css: OverlayDrawer as AnyComponent,
    griffel: griffel(
      'OverlayDrawer',
      useOverlayDrawer_unstable,
      useGriffelOverlayDrawerStyles,
      renderOverlayDrawer_unstable,
      useDrawerContextValue,
    ),
    findRoot: byClass('fui-OverlayDrawer'),
    sampledSlots: [],
    interactive: false,
    props: { open: true, modalType: 'non-modal', children: 'Drawer content' },
    variants: [{ position: 'end' }],
    wrap: element => (
      <InContainer>{mountNode => React.cloneElement(element, { mountNode } as Record<string, unknown>)}</InContainer>
    ),
  },
  InlineDrawer: {
    css: InlineDrawer as AnyComponent,
    griffel: griffel(
      'InlineDrawer',
      useInlineDrawer_unstable,
      useGriffelInlineDrawerStyles,
      renderInlineDrawer_unstable,
      useDrawerContextValue,
    ),
    findRoot: byClass('fui-InlineDrawer'),
    sampledSlots: [],
    interactive: false,
    props: { open: true, children: 'Drawer content' },
    variants: [{ position: 'end' }, { position: 'end', separator: true }],
  },
};

/**
 * App markup around the component, kept inside the component's own `ComponentSpec.wrap` (a MenuList, a TabList).
 * `findRoot` keeps sampling the component: the spec's own, or the first element with the component's root class.
 */
export function around(
  componentName: string,
  spec: ComponentSpec,
  markup: (children: JSXElement, implementation: Implementation) => JSXElement,
): Pick<ComponentSpec, 'findRoot'> & Required<Pick<AppPattern, 'wrap'>> {
  return {
    wrap: (element, implementation) => markup(spec.wrap ? spec.wrap(element, implementation) : element, implementation),
    findRoot:
      spec.findRoot ??
      (container => container.querySelector<HTMLElement>(`.fui-${componentName}`) ?? defaultRoot(container)),
  };
}
