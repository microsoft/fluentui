import * as React from 'react';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderNavigation,
  DrawerHeaderTitle,
  InlineDrawer,
  Menu,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuItemCheckbox,
  MenuItemLink,
  MenuItemRadio,
  MenuItemSwitch,
  MenuList,
  MenuPopover,
  MenuSplitGroup,
  MenuTrigger,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarGroup,
  MessageBarTitle,
  OverlayDrawer,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselNav,
  TeachingPopoverCarouselNavButton,
  TeachingPopoverCarouselPageCount,
  TeachingPopoverFooter,
  TeachingPopoverHeader,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
  Toast,
  ToastBody,
  ToastFooter,
  ToastTitle,
  renderDialogActions_unstable,
  renderDialogBody_unstable,
  renderDialogContent_unstable,
  renderDialogSurface_unstable,
  renderDialogTitle_unstable,
  renderDrawerBody_unstable,
  renderDrawerFooter_unstable,
  renderDrawerHeaderNavigation_unstable,
  renderDrawerHeaderTitle_unstable,
  renderDrawerHeader_unstable,
  renderDrawer_unstable,
  renderInlineDrawer_unstable,
  renderMenuDivider_unstable,
  renderMenuGroupHeader_unstable,
  renderMenuGroup_unstable,
  renderMenuItemCheckbox_unstable,
  renderMenuItemLink_unstable,
  renderMenuItemRadio_unstable,
  renderMenuItemSwitch_unstable,
  renderMenuItem_unstable,
  renderMenuList_unstable,
  renderMenuPopover_unstable,
  renderMenuSplitGroup_unstable,
  renderMessageBarActions_unstable,
  renderMessageBarBody_unstable,
  renderMessageBarGroup_unstable,
  renderMessageBarTitle_unstable,
  renderMessageBar_unstable,
  renderOverlayDrawer_unstable,
  renderPopoverSurface_unstable,
  renderTeachingPopoverBody_unstable,
  renderTeachingPopoverCarouselCard_unstable,
  renderTeachingPopoverCarouselFooter_unstable,
  renderTeachingPopoverCarouselNavButton_unstable,
  renderTeachingPopoverCarouselNav_unstable,
  renderTeachingPopoverCarouselPageCount_unstable,
  renderTeachingPopoverCarousel_unstable,
  renderTeachingPopoverFooter_unstable,
  renderTeachingPopoverHeader_unstable,
  renderTeachingPopoverSurface_unstable,
  renderTeachingPopoverTitle_unstable,
  renderToastBody_unstable,
  renderToastFooter_unstable,
  renderToastTitle_unstable,
  renderToast_unstable,
  renderTooltip_unstable,
  useDialogActions_unstable,
  useDialogBody_unstable,
  useDialogContent_unstable,
  useDialogSurfaceContextValues_unstable,
  useDialogSurface_unstable,
  useDialogTitle_unstable,
  useDrawerBody_unstable,
  useDrawerContextValue,
  useDrawerFooter_unstable,
  useDrawerHeaderNavigation_unstable,
  useDrawerHeaderTitle_unstable,
  useDrawerHeader_unstable,
  useDrawer_unstable,
  useInlineDrawer_unstable,
  useMenuDivider_unstable,
  useMenuGroupContextValues_unstable,
  useMenuGroupHeader_unstable,
  useMenuGroup_unstable,
  useMenuItemCheckbox_unstable,
  useMenuItemLink_unstable,
  useMenuItemRadio_unstable,
  useMenuItemSwitch_unstable,
  useMenuItem_unstable,
  useMenuListContextValues_unstable,
  useMenuList_unstable,
  useMenuPopover_unstable,
  useMenuSplitGroup_unstable,
  useMessageBarActionsContextValue_unstable,
  useMessageBarActions_unstable,
  useMessageBarBody_unstable,
  useMessageBarContextValue_unstable,
  useMessageBarGroup_unstable,
  useMessageBarTitle_unstable,
  useMessageBar_unstable,
  useOverlayDrawer_unstable,
  usePopoverSurface_unstable,
  useTeachingPopoverBody_unstable,
  useTeachingPopoverCarouselCard_unstable,
  useTeachingPopoverCarouselContextValues_unstable,
  useTeachingPopoverCarouselFooter_unstable,
  useTeachingPopoverCarouselNavButton_unstable,
  useTeachingPopoverCarouselNav_unstable,
  useTeachingPopoverCarouselPageCount_unstable,
  useTeachingPopoverCarousel_unstable,
  useTeachingPopoverFooter_unstable,
  useTeachingPopoverHeader_unstable,
  useTeachingPopoverSurface_unstable,
  useTeachingPopoverTitle_unstable,
  useToastBody_unstable,
  useToastFooter_unstable,
  useToastTitle_unstable,
  useToast_unstable,
  useTooltipStyles_unstable,
  useTooltip_unstable,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { useMessageBarBodyContextValues_unstable } from '@fluentui/react-message-bar';
import {
  TeachingPopoverCarouselFooterButton,
  renderTeachingPopoverCarouselFooterButton_unstable,
  useTeachingPopoverCarouselFooterButton_unstable,
} from '@fluentui/react-teaching-popover';
import { ToastContainerContextProvider } from '@fluentui/react-toast';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useMenuSplitGroupContextValues } from '../../../packages/react-components/react-menu/library/src/components/MenuSplitGroup/useMenuSplitGroupContextValues';
import { useToastContextValues_unstable } from '../../../packages/react-components/react-toast/library/src/components/Toast/useToastContextValues';
// Explicit `.ts` imports bypass the CSS Modules resolution, giving the original Griffel implementations.
import { useDialogActionsStyles_unstable as useGriffelDialogActionsStyles } from '../../../packages/react-components/react-dialog/library/src/components/DialogActions/useDialogActionsStyles.styles.ts';
import { useDialogBodyStyles_unstable as useGriffelDialogBodyStyles } from '../../../packages/react-components/react-dialog/library/src/components/DialogBody/useDialogBodyStyles.styles.ts';
import { useDialogContentStyles_unstable as useGriffelDialogContentStyles } from '../../../packages/react-components/react-dialog/library/src/components/DialogContent/useDialogContentStyles.styles.ts';
import { useDialogSurfaceStyles_unstable as useGriffelDialogSurfaceStyles } from '../../../packages/react-components/react-dialog/library/src/components/DialogSurface/useDialogSurfaceStyles.styles.ts';
import { useDialogTitleStyles_unstable as useGriffelDialogTitleStyles } from '../../../packages/react-components/react-dialog/library/src/components/DialogTitle/useDialogTitleStyles.styles.ts';
import { useDrawerStyles_unstable as useGriffelDrawerStyles } from '../../../packages/react-components/react-drawer/library/src/components/Drawer/useDrawerStyles.styles.ts';
import { useDrawerBodyStyles_unstable as useGriffelDrawerBodyStyles } from '../../../packages/react-components/react-drawer/library/src/components/DrawerBody/useDrawerBodyStyles.styles.ts';
import { useDrawerFooterStyles_unstable as useGriffelDrawerFooterStyles } from '../../../packages/react-components/react-drawer/library/src/components/DrawerFooter/useDrawerFooterStyles.styles.ts';
import { useDrawerHeaderStyles_unstable as useGriffelDrawerHeaderStyles } from '../../../packages/react-components/react-drawer/library/src/components/DrawerHeader/useDrawerHeaderStyles.styles.ts';
import { useDrawerHeaderNavigationStyles_unstable as useGriffelDrawerHeaderNavigationStyles } from '../../../packages/react-components/react-drawer/library/src/components/DrawerHeaderNavigation/useDrawerHeaderNavigationStyles.styles.ts';
import { useDrawerHeaderTitleStyles_unstable as useGriffelDrawerHeaderTitleStyles } from '../../../packages/react-components/react-drawer/library/src/components/DrawerHeaderTitle/useDrawerHeaderTitleStyles.styles.ts';
import { useInlineDrawerStyles_unstable as useGriffelInlineDrawerStyles } from '../../../packages/react-components/react-drawer/library/src/components/InlineDrawer/useInlineDrawerStyles.styles.ts';
import { useOverlayDrawerStyles_unstable as useGriffelOverlayDrawerStyles } from '../../../packages/react-components/react-drawer/library/src/components/OverlayDrawer/useOverlayDrawerStyles.styles.ts';
import { useMenuDividerStyles_unstable as useGriffelMenuDividerStyles } from '../../../packages/react-components/react-menu/library/src/components/MenuDivider/useMenuDividerStyles.styles.ts';
import { useMenuGroupStyles_unstable as useGriffelMenuGroupStyles } from '../../../packages/react-components/react-menu/library/src/components/MenuGroup/useMenuGroupStyles.styles.ts';
import { useMenuGroupHeaderStyles_unstable as useGriffelMenuGroupHeaderStyles } from '../../../packages/react-components/react-menu/library/src/components/MenuGroupHeader/useMenuGroupHeaderStyles.styles.ts';
import { useMenuItemStyles_unstable as useGriffelMenuItemStyles } from '../../../packages/react-components/react-menu/library/src/components/MenuItem/useMenuItemStyles.styles.ts';
import { useMenuItemCheckboxStyles_unstable as useGriffelMenuItemCheckboxStyles } from '../../../packages/react-components/react-menu/library/src/components/MenuItemCheckbox/useMenuItemCheckboxStyles.styles.ts';
import { useMenuItemLinkStyles_unstable as useGriffelMenuItemLinkStyles } from '../../../packages/react-components/react-menu/library/src/components/MenuItemLink/useMenuItemLinkStyles.styles.ts';
import { useMenuItemRadioStyles_unstable as useGriffelMenuItemRadioStyles } from '../../../packages/react-components/react-menu/library/src/components/MenuItemRadio/useMenuItemRadioStyles.styles.ts';
import { useMenuItemSwitchStyles_unstable as useGriffelMenuItemSwitchStyles } from '../../../packages/react-components/react-menu/library/src/components/MenuItemSwitch/useMenuItemSwitchStyles.styles.ts';
import { useMenuListStyles_unstable as useGriffelMenuListStyles } from '../../../packages/react-components/react-menu/library/src/components/MenuList/useMenuListStyles.styles.ts';
import { useMenuPopoverStyles_unstable as useGriffelMenuPopoverStyles } from '../../../packages/react-components/react-menu/library/src/components/MenuPopover/useMenuPopoverStyles.styles.ts';
import { useMenuSplitGroupStyles_unstable as useGriffelMenuSplitGroupStyles } from '../../../packages/react-components/react-menu/library/src/components/MenuSplitGroup/useMenuSplitGroupStyles.styles.ts';
import { useMessageBarStyles_unstable as useGriffelMessageBarStyles } from '../../../packages/react-components/react-message-bar/library/src/components/MessageBar/useMessageBarStyles.styles.ts';
import { useMessageBarActionsStyles_unstable as useGriffelMessageBarActionsStyles } from '../../../packages/react-components/react-message-bar/library/src/components/MessageBarActions/useMessageBarActionsStyles.styles.ts';
import { useMessageBarBodyStyles_unstable as useGriffelMessageBarBodyStyles } from '../../../packages/react-components/react-message-bar/library/src/components/MessageBarBody/useMessageBarBodyStyles.styles.ts';
import { useMessageBarGroupStyles_unstable as useGriffelMessageBarGroupStyles } from '../../../packages/react-components/react-message-bar/library/src/components/MessageBarGroup/useMessageBarGroupStyles.styles.ts';
import { useMessageBarTitleStyles_unstable as useGriffelMessageBarTitleStyles } from '../../../packages/react-components/react-message-bar/library/src/components/MessageBarTitle/useMessageBarTitleStyles.styles.ts';
import { usePopoverSurfaceStyles_unstable as useGriffelPopoverSurfaceStyles } from '../../../packages/react-components/react-popover/library/src/components/PopoverSurface/usePopoverSurfaceStyles.styles.ts';
import { useTeachingPopoverBodyStyles_unstable as useGriffelTeachingPopoverBodyStyles } from '../../../packages/react-components/react-teaching-popover/library/src/components/TeachingPopoverBody/useTeachingPopoverBodyStyles.styles.ts';
import { useTeachingPopoverCarouselStyles_unstable as useGriffelTeachingPopoverCarouselStyles } from '../../../packages/react-components/react-teaching-popover/library/src/components/TeachingPopoverCarousel/useTeachingPopoverCarouselStyles.styles.ts';
import { useTeachingPopoverCarouselCardStyles_unstable as useGriffelTeachingPopoverCarouselCardStyles } from '../../../packages/react-components/react-teaching-popover/library/src/components/TeachingPopoverCarouselCard/useTeachingPopoverCarouselCardStyles.styles.ts';
import { useTeachingPopoverCarouselFooterStyles_unstable as useGriffelTeachingPopoverCarouselFooterStyles } from '../../../packages/react-components/react-teaching-popover/library/src/components/TeachingPopoverCarouselFooter/useTeachingPopoverCarouselFooterStyles.styles.ts';
import { useTeachingPopoverCarouselFooterButtonStyles_unstable as useGriffelTeachingPopoverCarouselFooterButtonStyles } from '../../../packages/react-components/react-teaching-popover/library/src/components/TeachingPopoverCarouselFooterButton/useTeachingPopoverCarouselFooterButtonStyles.styles.ts';
import { useTeachingPopoverCarouselNavStyles_unstable as useGriffelTeachingPopoverCarouselNavStyles } from '../../../packages/react-components/react-teaching-popover/library/src/components/TeachingPopoverCarouselNav/useTeachingPopoverCarouselNavStyles.styles.ts';
import { useTeachingPopoverCarouselNavButtonStyles_unstable as useGriffelTeachingPopoverCarouselNavButtonStyles } from '../../../packages/react-components/react-teaching-popover/library/src/components/TeachingPopoverCarouselNavButton/useTeachingPopoverCarouselNavButtonStyles.styles.ts';
import { useTeachingPopoverCarouselPageCountStyles_unstable as useGriffelTeachingPopoverCarouselPageCountStyles } from '../../../packages/react-components/react-teaching-popover/library/src/components/TeachingPopoverCarouselPageCount/useTeachingPopoverCarouselPageCountStyles.styles.ts';
import { useTeachingPopoverFooterStyles_unstable as useGriffelTeachingPopoverFooterStyles } from '../../../packages/react-components/react-teaching-popover/library/src/components/TeachingPopoverFooter/useTeachingPopoverFooterStyles.styles.ts';
import { useTeachingPopoverHeaderStyles_unstable as useGriffelTeachingPopoverHeaderStyles } from '../../../packages/react-components/react-teaching-popover/library/src/components/TeachingPopoverHeader/useTeachingPopoverHeaderStyles.styles.ts';
import { useTeachingPopoverSurfaceStyles_unstable as useGriffelTeachingPopoverSurfaceStyles } from '../../../packages/react-components/react-teaching-popover/library/src/components/TeachingPopoverSurface/useTeachingPopoverSurfaceStyles.styles.ts';
import { useTeachingPopoverTitleStyles_unstable as useGriffelTeachingPopoverTitleStyles } from '../../../packages/react-components/react-teaching-popover/library/src/components/TeachingPopoverTitle/useTeachingPopoverTitleStyles.styles.ts';
import { useToastStyles_unstable as useGriffelToastStyles } from '../../../packages/react-components/react-toast/library/src/components/Toast/useToastStyles.styles.ts';
import { useToastBodyStyles_unstable as useGriffelToastBodyStyles } from '../../../packages/react-components/react-toast/library/src/components/ToastBody/useToastBodyStyles.styles.ts';
import { useToastFooterStyles_unstable as useGriffelToastFooterStyles } from '../../../packages/react-components/react-toast/library/src/components/ToastFooter/useToastFooterStyles.styles.ts';
import { useToastTitleStyles_unstable as useGriffelToastTitleStyles } from '../../../packages/react-components/react-toast/library/src/components/ToastTitle/useToastTitleStyles.styles.ts';
import { useTooltipStyles_unstable as useGriffelTooltipStyles } from '../../../packages/react-components/react-tooltip/library/src/components/Tooltip/useTooltipStyles.styles.ts';
import { describeParity, griffel, icon } from './harness';
import type { AnyComponent, ComponentSpec, Implementation } from './harness';

type AnyProps = Record<string, unknown>;
type Pair = Record<Implementation, AnyComponent>;

const pair = (css: unknown, griffelComponent: AnyComponent): Pair => ({
  css: css as AnyComponent,
  griffel: griffelComponent,
});

/** Removes context props (consumed by `wrap`) from the variant props spread on the component under test. */
function split(element: JSXElement, keys: string[]): [JSXElement, AnyProps] {
  const props = { ...(element.props as AnyProps) };
  const picked: AnyProps = {};
  for (const key of keys) {
    if (key in props) {
      picked[key] = props[key];
      delete props[key];
    }
  }
  return [React.createElement(element.type as React.ElementType, props), picked];
}

/** Renders portaled content into a node inside the parity container. */
const InContainer = ({ children }: { children: (mountNode: HTMLElement) => JSXElement }) => {
  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);
  return <div ref={setMountNode}>{mountNode ? children(mountNode) : null}</div>;
};

/**
 * Arrows paint their `::before` with the surface background they inherit; in the plain CSS scenarios that background
 * is the one the app declared on the surface (the documented root known difference), so the arrow follows it.
 */
const arrowKnownDifferences = {
  'plain CSS class name': { 'root::before background-color': ['--colorPaletteBerryBackground2'] },
  'plain CSS stateful class name': { 'root::before background-color': ['--colorPaletteBerryBackground2'] },
};

const query = (selector: string) => (container: HTMLElement) => container.querySelector<HTMLElement>(selector)!;

// --- Dialog -----------------------------------------------------------------------------------------------------

const C = {
  DialogSurface: pair(
    DialogSurface,
    griffel(
      'DialogSurface',
      useDialogSurface_unstable,
      useGriffelDialogSurfaceStyles,
      renderDialogSurface_unstable,
      useDialogSurfaceContextValues_unstable,
    ),
  ),
  DialogTitle: pair(
    DialogTitle,
    griffel('DialogTitle', useDialogTitle_unstable, useGriffelDialogTitleStyles, renderDialogTitle_unstable),
  ),
  DialogBody: pair(
    DialogBody,
    griffel('DialogBody', useDialogBody_unstable, useGriffelDialogBodyStyles, renderDialogBody_unstable),
  ),
  DialogContent: pair(
    DialogContent,
    griffel('DialogContent', useDialogContent_unstable, useGriffelDialogContentStyles, renderDialogContent_unstable),
  ),
  DialogActions: pair(
    DialogActions,
    griffel('DialogActions', useDialogActions_unstable, useGriffelDialogActionsStyles, renderDialogActions_unstable),
  ),
  PopoverSurface: pair(
    PopoverSurface,
    griffel(
      'PopoverSurface',
      usePopoverSurface_unstable,
      useGriffelPopoverSurfaceStyles,
      renderPopoverSurface_unstable,
    ),
  ),
  MenuList: pair(
    MenuList,
    griffel(
      'MenuList',
      useMenuList_unstable,
      useGriffelMenuListStyles,
      renderMenuList_unstable,
      useMenuListContextValues_unstable,
    ),
  ),
  MenuItem: pair(
    MenuItem,
    griffel('MenuItem', useMenuItem_unstable, useGriffelMenuItemStyles, renderMenuItem_unstable),
  ),
  MenuItemCheckbox: pair(
    MenuItemCheckbox,
    griffel(
      'MenuItemCheckbox',
      useMenuItemCheckbox_unstable,
      useGriffelMenuItemCheckboxStyles,
      renderMenuItemCheckbox_unstable,
    ),
  ),
  MenuItemRadio: pair(
    MenuItemRadio,
    griffel('MenuItemRadio', useMenuItemRadio_unstable, useGriffelMenuItemRadioStyles, renderMenuItemRadio_unstable),
  ),
  MenuItemSwitch: pair(
    MenuItemSwitch,
    griffel(
      'MenuItemSwitch',
      useMenuItemSwitch_unstable,
      useGriffelMenuItemSwitchStyles,
      renderMenuItemSwitch_unstable,
    ),
  ),
  MenuItemLink: pair(
    MenuItemLink,
    griffel('MenuItemLink', useMenuItemLink_unstable, useGriffelMenuItemLinkStyles, renderMenuItemLink_unstable),
  ),
  MenuGroup: pair(
    MenuGroup,
    griffel(
      'MenuGroup',
      useMenuGroup_unstable,
      useGriffelMenuGroupStyles,
      renderMenuGroup_unstable,
      useMenuGroupContextValues_unstable,
    ),
  ),
  MenuGroupHeader: pair(
    MenuGroupHeader,
    griffel(
      'MenuGroupHeader',
      useMenuGroupHeader_unstable,
      useGriffelMenuGroupHeaderStyles,
      renderMenuGroupHeader_unstable,
    ),
  ),
  MenuDivider: pair(
    MenuDivider,
    griffel('MenuDivider', useMenuDivider_unstable, useGriffelMenuDividerStyles, renderMenuDivider_unstable),
  ),
  MenuSplitGroup: pair(
    MenuSplitGroup,
    griffel(
      'MenuSplitGroup',
      useMenuSplitGroup_unstable,
      useGriffelMenuSplitGroupStyles,
      renderMenuSplitGroup_unstable,
      useMenuSplitGroupContextValues,
    ),
  ),
  MenuPopover: pair(
    MenuPopover,
    griffel('MenuPopover', useMenuPopover_unstable, useGriffelMenuPopoverStyles, renderMenuPopover_unstable),
  ),
  Drawer: pair(
    Drawer,
    griffel('Drawer', useDrawer_unstable, useGriffelDrawerStyles, renderDrawer_unstable, useDrawerContextValue),
  ),
  InlineDrawer: pair(
    InlineDrawer,
    griffel(
      'InlineDrawer',
      useInlineDrawer_unstable,
      useGriffelInlineDrawerStyles,
      renderInlineDrawer_unstable,
      useDrawerContextValue,
    ),
  ),
  OverlayDrawer: pair(
    OverlayDrawer,
    griffel(
      'OverlayDrawer',
      useOverlayDrawer_unstable,
      useGriffelOverlayDrawerStyles,
      renderOverlayDrawer_unstable,
      useDrawerContextValue,
    ),
  ),
  DrawerHeader: pair(
    DrawerHeader,
    griffel('DrawerHeader', useDrawerHeader_unstable, useGriffelDrawerHeaderStyles, renderDrawerHeader_unstable),
  ),
  DrawerHeaderTitle: pair(
    DrawerHeaderTitle,
    griffel(
      'DrawerHeaderTitle',
      useDrawerHeaderTitle_unstable,
      useGriffelDrawerHeaderTitleStyles,
      renderDrawerHeaderTitle_unstable,
    ),
  ),
  DrawerHeaderNavigation: pair(
    DrawerHeaderNavigation,
    griffel(
      'DrawerHeaderNavigation',
      useDrawerHeaderNavigation_unstable,
      useGriffelDrawerHeaderNavigationStyles,
      renderDrawerHeaderNavigation_unstable,
    ),
  ),
  DrawerBody: pair(
    DrawerBody,
    griffel('DrawerBody', useDrawerBody_unstable, useGriffelDrawerBodyStyles, renderDrawerBody_unstable),
  ),
  DrawerFooter: pair(
    DrawerFooter,
    griffel('DrawerFooter', useDrawerFooter_unstable, useGriffelDrawerFooterStyles, renderDrawerFooter_unstable),
  ),
  TeachingPopoverSurface: pair(
    TeachingPopoverSurface,
    griffel(
      'TeachingPopoverSurface',
      useTeachingPopoverSurface_unstable,
      useGriffelTeachingPopoverSurfaceStyles,
      renderTeachingPopoverSurface_unstable,
    ),
  ),
  TeachingPopoverHeader: pair(
    TeachingPopoverHeader,
    griffel(
      'TeachingPopoverHeader',
      useTeachingPopoverHeader_unstable,
      useGriffelTeachingPopoverHeaderStyles,
      renderTeachingPopoverHeader_unstable,
    ),
  ),
  TeachingPopoverTitle: pair(
    TeachingPopoverTitle,
    griffel(
      'TeachingPopoverTitle',
      useTeachingPopoverTitle_unstable,
      useGriffelTeachingPopoverTitleStyles,
      renderTeachingPopoverTitle_unstable,
    ),
  ),
  TeachingPopoverBody: pair(
    TeachingPopoverBody,
    griffel(
      'TeachingPopoverBody',
      useTeachingPopoverBody_unstable,
      useGriffelTeachingPopoverBodyStyles,
      renderTeachingPopoverBody_unstable,
    ),
  ),
  TeachingPopoverFooter: pair(
    TeachingPopoverFooter,
    griffel(
      'TeachingPopoverFooter',
      useTeachingPopoverFooter_unstable,
      useGriffelTeachingPopoverFooterStyles,
      renderTeachingPopoverFooter_unstable,
    ),
  ),
  TeachingPopoverCarousel: pair(
    TeachingPopoverCarousel,
    griffel(
      'TeachingPopoverCarousel',
      useTeachingPopoverCarousel_unstable,
      useGriffelTeachingPopoverCarouselStyles,
      renderTeachingPopoverCarousel_unstable,
      useTeachingPopoverCarouselContextValues_unstable,
    ),
  ),
  TeachingPopoverCarouselCard: pair(
    TeachingPopoverCarouselCard,
    griffel(
      'TeachingPopoverCarouselCard',
      useTeachingPopoverCarouselCard_unstable,
      useGriffelTeachingPopoverCarouselCardStyles,
      renderTeachingPopoverCarouselCard_unstable,
    ),
  ),
  TeachingPopoverCarouselNav: pair(
    TeachingPopoverCarouselNav,
    griffel(
      'TeachingPopoverCarouselNav',
      useTeachingPopoverCarouselNav_unstable,
      useGriffelTeachingPopoverCarouselNavStyles,
      renderTeachingPopoverCarouselNav_unstable,
    ),
  ),
  TeachingPopoverCarouselNavButton: pair(
    TeachingPopoverCarouselNavButton,
    griffel(
      'TeachingPopoverCarouselNavButton',
      useTeachingPopoverCarouselNavButton_unstable,
      useGriffelTeachingPopoverCarouselNavButtonStyles,
      renderTeachingPopoverCarouselNavButton_unstable,
    ),
  ),
  TeachingPopoverCarouselPageCount: pair(
    TeachingPopoverCarouselPageCount,
    griffel(
      'TeachingPopoverCarouselPageCount',
      useTeachingPopoverCarouselPageCount_unstable,
      useGriffelTeachingPopoverCarouselPageCountStyles,
      renderTeachingPopoverCarouselPageCount_unstable,
    ),
  ),
  TeachingPopoverCarouselFooter: pair(
    TeachingPopoverCarouselFooter,
    griffel(
      'TeachingPopoverCarouselFooter',
      useTeachingPopoverCarouselFooter_unstable,
      useGriffelTeachingPopoverCarouselFooterStyles,
      renderTeachingPopoverCarouselFooter_unstable,
    ),
  ),
  TeachingPopoverCarouselFooterButton: pair(
    TeachingPopoverCarouselFooterButton,
    griffel(
      'TeachingPopoverCarouselFooterButton',
      useTeachingPopoverCarouselFooterButton_unstable,
      useGriffelTeachingPopoverCarouselFooterButtonStyles,
      renderTeachingPopoverCarouselFooterButton_unstable,
    ),
  ),
  Toast: pair(
    Toast,
    griffel('Toast', useToast_unstable, useGriffelToastStyles, renderToast_unstable, useToastContextValues_unstable),
  ),
  ToastTitle: pair(
    ToastTitle,
    griffel('ToastTitle', useToastTitle_unstable, useGriffelToastTitleStyles, renderToastTitle_unstable),
  ),
  ToastBody: pair(
    ToastBody,
    griffel('ToastBody', useToastBody_unstable, useGriffelToastBodyStyles, renderToastBody_unstable),
  ),
  ToastFooter: pair(
    ToastFooter,
    griffel('ToastFooter', useToastFooter_unstable, useGriffelToastFooterStyles, renderToastFooter_unstable),
  ),
  MessageBar: pair(
    MessageBar,
    griffel(
      'MessageBar',
      useMessageBar_unstable,
      useGriffelMessageBarStyles,
      renderMessageBar_unstable,
      useMessageBarContextValue_unstable,
    ),
  ),
  MessageBarTitle: pair(
    MessageBarTitle,
    griffel(
      'MessageBarTitle',
      useMessageBarTitle_unstable,
      useGriffelMessageBarTitleStyles,
      renderMessageBarTitle_unstable,
    ),
  ),
  MessageBarBody: pair(
    MessageBarBody,
    griffel(
      'MessageBarBody',
      useMessageBarBody_unstable,
      useGriffelMessageBarBodyStyles,
      renderMessageBarBody_unstable,
      useMessageBarBodyContextValues_unstable,
    ),
  ),
  MessageBarActions: pair(
    MessageBarActions,
    griffel(
      'MessageBarActions',
      useMessageBarActions_unstable,
      useGriffelMessageBarActionsStyles,
      renderMessageBarActions_unstable,
      useMessageBarActionsContextValue_unstable,
    ),
  ),
  MessageBarGroup: pair(
    MessageBarGroup,
    griffel(
      'MessageBarGroup',
      useMessageBarGroup_unstable,
      useGriffelMessageBarGroupStyles,
      renderMessageBarGroup_unstable,
    ),
  ),
  Tooltip: {} as Pair,
};

/**
 * Tooltip has no root slot (its primary slot is `content`) and no `className` prop, so it is recomposed here: the
 * app's class name goes to `content`, and `content` is aliased as `root` while custom style hooks run (the harness'
 * custom hooks style `state.root`). It renders visible into a mount node inside the parity container.
 */
function tooltip(useStyles: (state: never) => unknown, name: string): AnyComponent {
  const Inner = (props: AnyProps) => {
    const state = useTooltip_unstable(props as never);
    useStyles(state as never);
    const slots = state as unknown as AnyProps;
    slots.root = state.content;
    useCustomStyleHook_unstable('useTooltipStyles_unstable')(state as never);
    delete slots.root;
    return renderTooltip_unstable(state);
  };
  const Component = React.forwardRef<HTMLElement, AnyProps>(({ className, ...props }, _ref) => (
    <InContainer>
      {mountNode => (
        <Inner
          relationship="description"
          visible
          mountNode={mountNode}
          {...props}
          content={{ children: 'Tooltip content', className }}
        >
          <button>Trigger</button>
        </Inner>
      )}
    </InContainer>
  ));
  Component.displayName = name;
  return Component as unknown as AnyComponent;
}
C.Tooltip = {
  css: tooltip(useTooltipStyles_unstable, 'CssTooltip'),
  griffel: tooltip(useGriffelTooltipStyles, 'GriffelTooltip'),
};

// --- Shared wrappers ----------------------------------------------------------------------------------------------

const dialogSurface = (element: JSXElement): JSXElement => {
  const [surface, { modalType = 'non-modal' }] = split(element, ['modalType']);
  return (
    <InContainer>
      {mountNode => (
        <Dialog open modalType={modalType as 'non-modal'}>
          {React.cloneElement(surface, { mountNode } as AnyProps)}
        </Dialog>
      )}
    </InContainer>
  );
};

const popover = (element: JSXElement): JSXElement => {
  const [surface, popoverProps] = split(element, ['appearance', 'size', 'withArrow']);
  return (
    <Popover open inline {...popoverProps}>
      <PopoverTrigger disableButtonEnhancement>
        <button>Trigger</button>
      </PopoverTrigger>
      {surface}
    </Popover>
  );
};

const menuList = (element: JSXElement, implementation: Implementation, props: AnyProps = {}) => {
  const List = C.MenuList[implementation];
  return <List {...props}>{element}</List>;
};

const inlineDrawer = (element: JSXElement, implementation: Implementation) => {
  const Inline = C.InlineDrawer[implementation];
  return <Inline open>{element}</Inline>;
};

const overlayDrawer = (element: JSXElement): JSXElement => {
  const [drawer, { modalType = 'non-modal' }] = split(element, ['modalType']);
  return <InContainer>{mountNode => React.cloneElement(drawer, { mountNode, modalType } as AnyProps)}</InContainer>;
};

const teachingPopover = (element: JSXElement, implementation: Implementation, withSurface = true) => {
  const [part, { appearance }] = split(element, ['appearance']);
  const Surface = C.TeachingPopoverSurface[implementation];
  // Inline surfaces are absolutely positioned, so each popover reserves room below its trigger and never flips;
  // otherwise surfaces from different scenarios overlap and intercept hover/press.
  // Auto focus would move focus into whichever surface mounts last, making rest samples order dependent.
  return (
    <div style={{ position: 'relative', minHeight: 480 }}>
      <TeachingPopover
        open
        inline
        trapFocus={false}
        unstable_disableAutoFocus
        appearance={appearance as 'brand'}
        positioning={{ position: 'below', align: 'start', pinned: true }}
      >
        <TeachingPopoverTrigger disableButtonEnhancement>
          <button>Trigger</button>
        </TeachingPopoverTrigger>
        {withSurface ? <Surface>{part}</Surface> : part}
      </TeachingPopover>
    </div>
  );
};

const carouselCards = (implementation: Implementation) => {
  const Card = C.TeachingPopoverCarouselCard[implementation];
  return ['1', '2'].map(value => (
    <Card key={value} value={value}>
      Page {value}
    </Card>
  ));
};

/** Renders a griffel slot with the griffel footer button (the footer button slots default to the CSS Modules one). */
const footerButton = (implementation: Implementation, children: string) =>
  implementation === 'griffel'
    ? {
        children: (_: unknown, props: AnyProps) => (
          <C.TeachingPopoverCarouselFooterButton.griffel {...props}>
            {children}
          </C.TeachingPopoverCarouselFooterButton.griffel>
        ),
      }
    : children;

const carouselFooterProps = (implementation: Implementation): AnyProps => {
  const Nav = C.TeachingPopoverCarouselNav[implementation];
  const NavButton = C.TeachingPopoverCarouselNavButton[implementation];
  return {
    next: footerButton(implementation, 'Next'),
    previous: footerButton(implementation, 'Previous'),
    initialStepText: 'Close',
    finalStepText: 'Finish',
    children: <Nav>{(value: string) => <NavButton aria-label={`Tip ${value}`} />}</Nav>,
  };
};

/** Renders a part inside a teaching popover carousel of the same implementation. */
const carousel = (element: JSXElement, implementation: Implementation) => {
  const Carousel = C.TeachingPopoverCarousel[implementation];
  const [part, { appearance }] = split(element, ['appearance']);
  return teachingPopover(
    <Carousel defaultValue="1" announcement={(value: string) => `Page ${value}`} appearance={appearance}>
      {carouselCards(implementation)}
      {part}
    </Carousel>,
    implementation,
  );
};

const toast = (element: JSXElement, implementation: Implementation) => {
  const [part, { intent = 'info', inverted }] = split(element, ['intent', 'inverted']);
  const ToastImpl = C.Toast[implementation];
  return (
    <ToastContainerContextProvider
      value={{ intent: intent as 'info', close: () => null, bodyId: 'body', titleId: 'title' }}
    >
      <ToastImpl appearance={inverted ? 'inverted' : undefined}>{part}</ToastImpl>
    </ToastContainerContextProvider>
  );
};

const messageBar = (element: JSXElement, implementation: Implementation) => {
  const [part, { layout, intent }] = split(element, ['layout', 'intent']);
  const Bar = C.MessageBar[implementation];
  return (
    <Bar layout={layout ?? 'singleline'} intent={intent}>
      {part}
    </Bar>
  );
};

const messageBarContent = (implementation: Implementation) => {
  const Body = C.MessageBarBody[implementation];
  const Title = C.MessageBarTitle[implementation];
  const Actions = C.MessageBarActions[implementation];
  return [
    <Body key="body">
      <Title>Title</Title>
      Message
    </Body>,
    <Actions key="actions" containerAction={<button>x</button>}>
      <button>Action</button>
    </Actions>,
  ];
};

const components: Record<string, ComponentSpec> = {
  // --- react-dialog ---
  DialogSurface: {
    ...C.DialogSurface,
    findRoot: query('.fui-DialogSurface'),
    sampledSlots: [],
    interactive: false,
    props: (implementation: Implementation) => {
      const Title = C.DialogTitle[implementation];
      return { children: <Title>Title</Title> };
    },
    variants: [{ modalType: 'non-modal' }, { modalType: 'modal' }, { modalType: 'alert' }],
    wrap: dialogSurface,
  },
  'DialogSurface backdrop': {
    ...C.DialogSurface,
    customStyleHook: 'useDialogSurfaceStyles_unstable',
    // The backdrop is a sibling of the surface; app styles are applied to the surface, the backdrop is sampled.
    findRoot: query('.fui-DialogSurface__backdrop'),
    slot: 'backdrop',
    sampledSlots: [],
    interactive: false,
    props: { children: 'Content' },
    variants: [{ modalType: 'modal' }, { modalType: 'alert' }],
    wrap: dialogSurface,
  },
  DialogTitle: {
    ...C.DialogTitle,
    slot: 'action',
    sampledSlots: ['fui-DialogTitle__action'],
    interactive: false,
    props: { children: 'Title', action: <button>x</button> },
    variants: [{}, { action: null }],
  },
  DialogBody: {
    ...C.DialogBody,
    sampledSlots: [],
    interactive: false,
    props: { children: 'Body' },
    variants: [{}],
  },
  DialogContent: {
    ...C.DialogContent,
    sampledSlots: [],
    interactive: false,
    props: { children: 'Content' },
    variants: [{}],
  },
  DialogActions: {
    ...C.DialogActions,
    sampledSlots: [],
    interactive: false,
    props: { children: [<button key="a">OK</button>, <button key="b">Cancel</button>] },
    variants: [{}, { position: 'start' }, { fluid: true }],
  },

  // --- react-popover ---
  PopoverSurface: {
    ...C.PopoverSurface,
    findRoot: query('.fui-PopoverSurface'),
    sampledSlots: [],
    interactive: false,
    props: { children: 'Popover content' },
    variants: [{}, { appearance: 'brand' }, { appearance: 'inverted' }, { size: 'small' }, { size: 'large' }],
    wrap: popover,
  },
  'PopoverSurface arrow': {
    ...C.PopoverSurface,
    customStyleHook: 'usePopoverSurfaceStyles_unstable',
    findRoot: container => query('.fui-PopoverSurface')(container).firstElementChild as HTMLElement,
    knownDifferences: arrowKnownDifferences,
    sampledSlots: [],
    interactive: false,
    props: { children: 'Popover content', withArrow: true },
    variants: [{}, { appearance: 'brand' }, { size: 'small' }],
    wrap: popover,
  },

  // --- react-tooltip ---
  Tooltip: {
    ...C.Tooltip,
    findRoot: query('.fui-Tooltip__content'),
    sampledSlots: [],
    interactive: false,
    props: {},
    variants: [{}, { appearance: 'inverted' }],
  },
  'Tooltip arrow': {
    ...C.Tooltip,
    customStyleHook: 'useTooltipStyles_unstable',
    findRoot: container => query('.fui-Tooltip__content')(container).firstElementChild as HTMLElement,
    knownDifferences: arrowKnownDifferences,
    sampledSlots: [],
    interactive: false,
    props: { withArrow: true },
    variants: [{}, { appearance: 'inverted' }],
  },

  // --- react-menu ---
  MenuList: {
    ...C.MenuList,
    sampledSlots: [],
    interactive: false,
    props: (implementation: Implementation) => {
      const Item = C.MenuItem[implementation];
      return { children: [<Item key="a">Item A</Item>, <Item key="b">Item B</Item>] };
    },
    variants: [{}],
  },
  MenuItem: {
    ...C.MenuItem,
    findRoot: query('.fui-MenuItem'),
    slot: 'icon',
    sampledSlots: [
      'fui-MenuItem__icon',
      'fui-MenuItem__content',
      'fui-MenuItem__secondaryContent',
      'fui-MenuItem__subText',
      'fui-MenuItem__submenuIndicator',
    ],
    interactive: true,
    props: { icon, children: 'Item', secondaryContent: 'Ctrl+K' },
    variants: [{}, { subText: 'Sub text' }, { hasSubmenu: true }, { disabled: true }],
    wrap: (element, implementation) => menuList(element, implementation),
  },
  MenuItemCheckbox: {
    ...C.MenuItemCheckbox,
    findRoot: query('.fui-MenuItemCheckbox'),
    slot: 'icon',
    sampledSlots: ['fui-MenuItemCheckbox__checkmark', 'fui-MenuItemCheckbox__icon', 'fui-MenuItemCheckbox__content'],
    interactive: true,
    props: { icon, name: 'options', children: 'Checkbox' },
    variants: [{ value: 'checked' }, { value: 'unchecked' }, { value: 'checked', disabled: true }],
    wrap: (element, implementation) => menuList(element, implementation, { checkedValues: { options: ['checked'] } }),
  },
  MenuItemRadio: {
    ...C.MenuItemRadio,
    findRoot: query('.fui-MenuItemRadio'),
    slot: 'icon',
    sampledSlots: ['fui-MenuItemRadio__checkmark', 'fui-MenuItemRadio__icon', 'fui-MenuItemRadio__content'],
    interactive: true,
    props: { icon, name: 'options', children: 'Radio' },
    variants: [{ value: 'checked' }, { value: 'unchecked' }, { value: 'checked', disabled: true }],
    wrap: (element, implementation) => menuList(element, implementation, { checkedValues: { options: ['checked'] } }),
  },
  MenuItemSwitch: {
    ...C.MenuItemSwitch,
    findRoot: query('.fui-MenuItemSwitch'),
    slot: 'switchIndicator',
    sampledSlots: ['fui-MenuItemSwitch__switchIndicator', 'fui-MenuItemSwitch__content'],
    interactive: true,
    props: { name: 'options', children: 'Switch' },
    variants: [{ value: 'checked' }, { value: 'unchecked' }, { value: 'checked', disabled: true }],
    wrap: (element, implementation) => menuList(element, implementation, { checkedValues: { options: ['checked'] } }),
  },
  MenuItemLink: {
    ...C.MenuItemLink,
    findRoot: query('.fui-MenuItemLink'),
    slot: 'icon',
    sampledSlots: ['fui-MenuItemLink__icon', 'fui-MenuItemLink__content', 'fui-MenuItemLink__secondaryContent'],
    interactive: true,
    props: { icon, href: '#parity', children: 'Link', secondaryContent: 'Ctrl+L' },
    variants: [{}],
    wrap: (element, implementation) => menuList(element, implementation),
  },
  MenuGroup: {
    ...C.MenuGroup,
    findRoot: query('.fui-MenuGroup'),
    sampledSlots: ['fui-MenuGroupHeader'],
    interactive: false,
    props: (implementation: Implementation) => {
      const Header = C.MenuGroupHeader[implementation];
      const Item = C.MenuItem[implementation];
      return { children: [<Header key="h">Header</Header>, <Item key="i">Item</Item>] };
    },
    variants: [{}],
    wrap: (element, implementation) => menuList(element, implementation),
  },
  MenuGroupHeader: {
    ...C.MenuGroupHeader,
    findRoot: query('.fui-MenuGroupHeader'),
    sampledSlots: [],
    interactive: false,
    props: { children: 'Header' },
    variants: [{}],
    wrap: (element, implementation) => {
      const Group = C.MenuGroup[implementation];
      return menuList(<Group>{element}</Group>, implementation);
    },
  },
  MenuDivider: {
    ...C.MenuDivider,
    findRoot: query('.fui-MenuDivider'),
    sampledSlots: [],
    interactive: false,
    props: {},
    variants: [{}],
    wrap: (element, implementation) => {
      const Item = C.MenuItem[implementation];
      return menuList(
        <>
          <Item>Above</Item>
          {element}
          <Item>Below</Item>
        </>,
        implementation,
      );
    },
  },
  MenuSplitGroup: {
    ...C.MenuSplitGroup,
    findRoot: query('.fui-MenuSplitGroup'),
    sampledSlots: ['fui-MenuItem', 'fui-MenuItem__submenuIndicator'],
    interactive: false,
    props: (implementation: Implementation) => {
      const Item = C.MenuItem[implementation];
      return {
        children: [
          <Item key="main">Open</Item>,
          <MenuTrigger key="trigger" disableButtonEnhancement>
            <Item aria-label="Open on platform" />
          </MenuTrigger>,
        ],
      };
    },
    variants: [{}],
    wrap: (element, implementation) => {
      const MenuPopoverPart = C.MenuPopover[implementation];
      const Item = C.MenuItem[implementation];
      return menuList(
        <Menu>
          {element}
          <MenuPopoverPart>{menuList(<Item>In browser</Item>, implementation)}</MenuPopoverPart>
        </Menu>,
        implementation,
      );
    },
  },
  MenuPopover: {
    ...C.MenuPopover,
    findRoot: query('.fui-MenuPopover'),
    sampledSlots: ['fui-MenuList'],
    interactive: false,
    props: (implementation: Implementation) => {
      const Item = C.MenuItem[implementation];
      return { children: menuList(<Item>Item</Item>, implementation) };
    },
    variants: [{}],
    wrap: element => (
      <Menu open inline>
        <MenuTrigger disableButtonEnhancement>
          <button>Trigger</button>
        </MenuTrigger>
        {element}
      </Menu>
    ),
  },

  // --- react-drawer ---
  InlineDrawer: {
    ...C.InlineDrawer,
    sampledSlots: [],
    interactive: false,
    props: { open: true, children: 'Drawer content' },
    variants: [
      { position: 'start' },
      { position: 'end' },
      { position: 'bottom' },
      { separator: true },
      { position: 'end', separator: true, size: 'large' },
      { size: 'small' },
    ],
  },
  OverlayDrawer: {
    ...C.OverlayDrawer,
    findRoot: query('.fui-OverlayDrawer'),
    sampledSlots: [],
    interactive: false,
    props: { open: true, children: 'Drawer content' },
    variants: [
      { position: 'start' },
      { position: 'end', size: 'large' },
      { position: 'bottom' },
      { position: 'start', modalType: 'modal' },
    ],
    wrap: overlayDrawer,
  },
  'OverlayDrawer backdrop': {
    ...C.OverlayDrawer,
    customStyleHook: 'useOverlayDrawerStyles_unstable',
    // The backdrop is a sibling of the drawer; app styles are applied to the drawer, the backdrop is sampled.
    findRoot: query('.fui-OverlayDrawer__backdrop'),
    sampledSlots: [],
    interactive: false,
    props: { open: true, children: 'Drawer content' },
    variants: [{ modalType: 'modal' }, { modalType: 'alert' }],
    wrap: overlayDrawer,
  },
  Drawer: {
    ...C.Drawer,
    sampledSlots: [],
    interactive: false,
    props: { open: true, type: 'inline', children: 'Drawer content' },
    variants: [{}, { position: 'end' }],
  },
  DrawerHeader: {
    ...C.DrawerHeader,
    findRoot: query('.fui-DrawerHeader'),
    sampledSlots: [],
    interactive: false,
    props: { children: 'Header' },
    variants: [{}],
    wrap: inlineDrawer,
  },
  DrawerHeaderTitle: {
    ...C.DrawerHeaderTitle,
    findRoot: query('.fui-DrawerHeaderTitle'),
    slot: 'action',
    sampledSlots: ['fui-DrawerHeaderTitle__heading', 'fui-DrawerHeaderTitle__action'],
    interactive: false,
    props: { children: 'Title', action: <button>x</button> },
    variants: [{}, { action: null }],
    wrap: inlineDrawer,
  },
  DrawerHeaderNavigation: {
    ...C.DrawerHeaderNavigation,
    findRoot: query('.fui-DrawerHeaderNavigation'),
    sampledSlots: [],
    interactive: false,
    props: { children: <button>Back</button> },
    variants: [{}],
    wrap: inlineDrawer,
  },
  DrawerBody: {
    ...C.DrawerBody,
    findRoot: query('.fui-DrawerBody'),
    sampledSlots: [],
    interactive: false,
    props: { children: 'Body' },
    variants: [{}],
    wrap: inlineDrawer,
  },
  DrawerFooter: {
    ...C.DrawerFooter,
    findRoot: query('.fui-DrawerFooter'),
    sampledSlots: [],
    interactive: false,
    props: { children: <button>OK</button> },
    variants: [{}],
    wrap: inlineDrawer,
  },

  // --- react-teaching-popover ---
  TeachingPopoverSurface: {
    ...C.TeachingPopoverSurface,
    findRoot: query('.fui-TeachingPopoverSurface'),
    sampledSlots: [],
    interactive: false,
    props: { children: 'Teaching content' },
    variants: [{}, { appearance: 'brand' }],
    wrap: (element, implementation) => teachingPopover(element, implementation, false),
  },
  TeachingPopoverHeader: {
    ...C.TeachingPopoverHeader,
    findRoot: query('.fui-TeachingPopoverHeader'),
    slot: 'icon',
    sampledSlots: ['fui-TeachingPopoverHeader__icon', 'fui-TeachingPopoverHeader__dismissButton'],
    interactive: false,
    props: { children: 'Tips' },
    variants: [{}, { appearance: 'brand' }],
    wrap: (element, implementation) => teachingPopover(element, implementation),
  },
  TeachingPopoverTitle: {
    ...C.TeachingPopoverTitle,
    findRoot: query('.fui-TeachingPopoverTitle'),
    slot: 'dismissButton',
    sampledSlots: ['fui-TeachingPopoverTitle__dismissButton'],
    interactive: false,
    props: { children: 'Title' },
    variants: [{}, { dismissButton: <span>x</span> }, { appearance: 'brand', dismissButton: <span>x</span> }],
    wrap: (element, implementation) => teachingPopover(element, implementation),
  },
  TeachingPopoverBody: {
    ...C.TeachingPopoverBody,
    findRoot: query('.fui-TeachingPopoverBody'),
    slot: 'media',
    sampledSlots: ['fui-TeachingPopoverBody__media'],
    interactive: false,
    props: { media: <span>Media</span>, children: 'Body' },
    variants: [{ mediaLength: 'short' }, { mediaLength: 'medium' }, { mediaLength: 'tall' }],
    wrap: (element, implementation) => teachingPopover(element, implementation),
  },
  TeachingPopoverFooter: {
    ...C.TeachingPopoverFooter,
    findRoot: query('.fui-TeachingPopoverFooter'),
    sampledSlots: ['fui-TeachingPopoverFooter__primary', 'fui-TeachingPopoverFooter__secondary'],
    interactive: false,
    props: { primary: 'Learn more', secondary: 'Got it' },
    variants: [
      { footerLayout: 'horizontal' },
      { footerLayout: 'vertical' },
      { appearance: 'brand' },
      { secondary: undefined },
    ],
    wrap: (element, implementation) => teachingPopover(element, implementation),
  },
  TeachingPopoverCarousel: {
    ...C.TeachingPopoverCarousel,
    findRoot: query('.fui-TeachingPopoverCarousel'),
    sampledSlots: ['fui-TeachingPopoverCarouselCard'],
    interactive: false,
    props: (implementation: Implementation) => {
      const Footer = C.TeachingPopoverCarouselFooter[implementation];
      return {
        defaultValue: '1',
        announcement: (value: string) => `Page ${value}`,
        children: [...carouselCards(implementation), <Footer key="footer" {...carouselFooterProps(implementation)} />],
      };
    },
    variants: [{}, { appearance: 'brand' }],
    wrap: (element, implementation) => teachingPopover(element, implementation),
  },
  TeachingPopoverCarouselCard: {
    ...C.TeachingPopoverCarouselCard,
    findRoot: query('.fui-TeachingPopoverCarouselCard'),
    sampledSlots: [],
    interactive: false,
    props: { value: '0', children: 'Page 0' },
    variants: [{}],
    wrap: carousel,
  },
  TeachingPopoverCarouselFooter: {
    ...C.TeachingPopoverCarouselFooter,
    findRoot: query('.fui-TeachingPopoverCarouselFooter'),
    slot: 'next',
    sampledSlots: ['fui-TeachingPopoverCarouselFooter__previous', 'fui-TeachingPopoverCarouselFooter__next'],
    interactive: false,
    props: carouselFooterProps,
    variants: [{ layout: 'offset' }, { layout: 'centered' }, { appearance: 'brand' }],
    wrap: carousel,
  },
  TeachingPopoverCarouselNav: {
    ...C.TeachingPopoverCarouselNav,
    findRoot: query('.fui-TeachingPopoverCarouselNav'),
    sampledSlots: ['fui-TeachingPopoverCarouselNavButton'],
    interactive: false,
    props: (implementation: Implementation) => {
      const NavButton = C.TeachingPopoverCarouselNavButton[implementation];
      return { children: (value: string) => <NavButton aria-label={`Tip ${value}`} /> };
    },
    variants: [{}, { appearance: 'brand' }],
    wrap: carousel,
  },
  TeachingPopoverCarouselNavButton: {
    ...C.TeachingPopoverCarouselNavButton,
    findRoot: query('[data-parity-root]'),
    sampledSlots: [],
    interactive: true,
    // Tab moves focus to the popover trigger, not to the sampled nav button.
    states: ['rest', 'hover', 'pressed'],
    props: { 'aria-label': 'Tip' },
    variants: [{ selected: true }, { selected: false }, { selected: true, appearance: 'brand' }],
    wrap: (element, implementation) => {
      const [button, { selected, appearance }] = split(element, ['selected', 'appearance']);
      const Nav = C.TeachingPopoverCarouselNav[implementation];
      const target = React.cloneElement(button, { 'data-parity-root': true } as AnyProps);
      return carousel(
        <Nav appearance={appearance}>
          {(value: string) => ((value === '1') === selected ? target : React.cloneElement(button))}
        </Nav>,
        implementation,
      );
    },
  },
  TeachingPopoverCarouselPageCount: {
    ...C.TeachingPopoverCarouselPageCount,
    findRoot: query('.fui-TeachingPopoverCarouselPageCount'),
    sampledSlots: [],
    interactive: false,
    props: { children: (current: number, total: number) => `${current} of ${total}` },
    variants: [{}, { appearance: 'brand' }],
    wrap: carousel,
  },
  TeachingPopoverCarouselFooterButton: {
    ...C.TeachingPopoverCarouselFooterButton,
    findRoot: query('.fui-TeachingPopoverCarouselFooterButton'),
    sampledSlots: [],
    interactive: true,
    // Tab moves focus to the popover trigger, not to the sampled footer button.
    states: ['rest', 'hover', 'pressed'],
    props: { altText: 'Close' },
    variants: [
      { navType: 'next', children: 'Next' },
      { navType: 'prev', children: 'Previous' },
      { navType: 'next', children: 'Next', appearance: 'brand' },
      { navType: 'prev', children: 'Previous', appearance: 'brand' },
    ],
    wrap: carousel,
  },

  // --- react-toast ---
  Toast: {
    ...C.Toast,
    sampledSlots: ['fui-ToastTitle', 'fui-ToastBody'],
    interactive: false,
    props: (implementation: Implementation) => {
      const Title = C.ToastTitle[implementation];
      const Body = C.ToastBody[implementation];
      return {
        children: [
          <Title key="title" action={<button>Undo</button>}>
            Title
          </Title>,
          <Body key="body" subtitle="Subtitle">
            Body
          </Body>,
        ],
      };
    },
    variants: [{}, { appearance: 'inverted' }],
  },
  ToastTitle: {
    ...C.ToastTitle,
    findRoot: query('.fui-ToastTitle'),
    slot: 'media',
    sampledSlots: ['fui-ToastTitle__media', 'fui-ToastTitle__action'],
    interactive: false,
    props: { children: 'Title', action: <button>Undo</button> },
    variants: [
      { intent: 'info' },
      { intent: 'success' },
      { intent: 'warning' },
      { intent: 'error' },
      { intent: 'success', inverted: true },
      { media: <span>m</span>, inverted: true },
    ],
    wrap: toast,
  },
  ToastBody: {
    ...C.ToastBody,
    findRoot: query('.fui-ToastBody'),
    slot: 'subtitle',
    sampledSlots: ['fui-ToastBody__subtitle'],
    interactive: false,
    props: { children: 'Body', subtitle: 'Subtitle' },
    variants: [{}, { inverted: true }],
    wrap: toast,
  },
  ToastFooter: {
    ...C.ToastFooter,
    findRoot: query('.fui-ToastFooter'),
    sampledSlots: [],
    interactive: false,
    props: { children: [<button key="a">Action</button>, <button key="b">Dismiss</button>] },
    variants: [{}],
    wrap: toast,
  },

  // --- react-message-bar ---
  MessageBar: {
    ...C.MessageBar,
    slot: 'icon',
    sampledSlots: ['fui-MessageBar__icon', 'fui-MessageBar__bottomReflowSpacer'],
    interactive: false,
    props: (implementation: Implementation) => ({ layout: 'singleline', children: messageBarContent(implementation) }),
    variants: [
      { intent: 'info' },
      { intent: 'success' },
      { intent: 'warning' },
      { intent: 'error' },
      { intent: 'info', shape: 'square' },
      { intent: 'warning', layout: 'multiline' },
    ],
  },
  MessageBarTitle: {
    ...C.MessageBarTitle,
    findRoot: query('.fui-MessageBarTitle'),
    sampledSlots: [],
    interactive: false,
    props: { children: 'Title' },
    variants: [{}],
    wrap: (element, implementation) => {
      const Body = C.MessageBarBody[implementation];
      return messageBar(<Body>{element}Message</Body>, implementation);
    },
  },
  MessageBarBody: {
    ...C.MessageBarBody,
    findRoot: query('.fui-MessageBarBody'),
    sampledSlots: [],
    interactive: false,
    props: { children: 'Message' },
    variants: [{}, { layout: 'multiline' }],
    wrap: messageBar,
  },
  MessageBarActions: {
    ...C.MessageBarActions,
    findRoot: query('.fui-MessageBarActions'),
    slot: 'containerAction',
    sampledSlots: ['fui-MessageBarActions__containerAction'],
    interactive: false,
    props: { containerAction: <button>x</button>, children: <button>Action</button> },
    variants: [{}, { layout: 'multiline' }, { children: undefined }, { layout: 'multiline', children: undefined }],
    wrap: messageBar,
  },
  MessageBarGroup: {
    ...C.MessageBarGroup,
    sampledSlots: ['fui-MessageBar'],
    interactive: false,
    props: (implementation: Implementation) => {
      const Bar = C.MessageBar[implementation];
      return {
        children: ['info', 'error'].map(intent => (
          <Bar key={intent} intent={intent}>
            {messageBarContent(implementation)[0]}
          </Bar>
        )),
      };
    },
    variants: [{}, { animate: 'both' }],
  },
};

describeParity('overlays', components);
