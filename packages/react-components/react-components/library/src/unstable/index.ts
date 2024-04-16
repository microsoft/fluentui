// =====================================================================================================
//                                    ⚠️ IMPORTANT:
// =====================================================================================================
// - `/unstable` api is DEPRECATED
// - adding new API exports to this file is FORBIDDEN ( except `react-virtualizer` )
// - modifying any existing exports in this file is FORBIDDEN
// - use/consume `*-preview` packages directly for preview/unstable Fluent UI core controls early access
// =====================================================================================================

/* eslint-disable deprecation/deprecation */
export {
  Alert,
  alertClassNames,
  renderAlert_unstable,
  useAlertStyles_unstable,
  useAlert_unstable,
} from '@fluentui/react-alert';
export type { AlertProps, AlertSlots, AlertState } from '@fluentui/react-alert';

export {
  InfoButton,
  infoButtonClassNames,
  useInfoButton_unstable,
  useInfoButtonStyles_unstable,
  renderInfoButton_unstable,
  InfoLabel,
  infoLabelClassNames,
  renderInfoLabel_unstable,
  useInfoLabel_unstable,
  useInfoLabelStyles_unstable,
} from '@fluentui/react-infobutton';
export type {
  InfoButtonProps,
  InfoButtonSlots,
  InfoButtonState,
  InfoLabelProps,
  InfoLabelSlots,
  InfoLabelState,
} from '@fluentui/react-infobutton';
/* eslint-enable deprecation/deprecation */

export {
  Virtualizer,
  virtualizerClassNames,
  useVirtualizer_unstable,
  renderVirtualizer_unstable,
  useVirtualizerStyles_unstable,
  useIntersectionObserver,
  useStaticVirtualizerMeasure,
  useDynamicVirtualizerMeasure,
  useResizeObserverRef_unstable,
  VirtualizerContextProvider,
  useVirtualizerContext_unstable,
  VirtualizerScrollView,
  virtualizerScrollViewClassNames,
  useVirtualizerScrollView_unstable,
  renderVirtualizerScrollView_unstable,
  useVirtualizerScrollViewStyles_unstable,
  VirtualizerScrollViewDynamic,
  virtualizerScrollViewDynamicClassNames,
  useVirtualizerScrollViewDynamic_unstable,
  renderVirtualizerScrollViewDynamic_unstable,
  useVirtualizerScrollViewDynamicStyles_unstable,
  scrollToItemDynamic,
  scrollToItemStatic,
} from '@fluentui/react-virtualizer';

export type {
  VirtualizerProps,
  VirtualizerState,
  VirtualizerSlots,
  VirtualizerChildRenderFunction,
  VirtualizerScrollViewProps,
  VirtualizerScrollViewState,
  VirtualizerScrollViewSlots,
  VirtualizerContextProps,
  VirtualizerScrollViewDynamicProps,
  VirtualizerScrollViewDynamicState,
  VirtualizerScrollViewDynamicSlots,
  VirtualizerMeasureDynamicProps,
  VirtualizerMeasureProps,
  ResizeCallbackWithRef,
  ScrollToInterface,
  ScrollToItemDynamicParams,
  ScrollToItemStaticParams,
} from '@fluentui/react-virtualizer';

export {
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  Tree,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  TreeItem,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  FlatTree,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  TreeProvider,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  TreeItemLayout,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  TreeItemProvider,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  TreeItemPersonaLayout,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  useTreeContext_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  useTreeContextValues_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  useTreeItemContext_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  useTreeItemContextValues_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  useFlatTreeContextValues_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  useTree_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  useTreeItem_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  useTreeItemLayout_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  useTreeItemPersonaLayout_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  renderTree_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  renderTreeItem_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  renderTreeItemPersonaLayout_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  renderTreeItemLayout_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  useTreeStyles_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  useTreeItemStyles_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  useTreeItemPersonaLayoutStyles_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  useTreeItemLayoutStyles_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  treeItemPersonaLayoutClassNames,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  treeItemLevelToken,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  treeItemLayoutClassNames,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  treeItemClassNames,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  treeClassNames,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  flatTreeClassNames,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  useFlatTree_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  useHeadlessFlatTree_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  useFlatTreeStyles_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  renderFlatTree_unstable,
  /** @deprecated Tree is currently stable. Import from @fluentui/react-components instead */
  flattenTree_unstable,
} from '@fluentui/react-tree';

export type {
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  TreeState,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  TreeSlots,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  TreeProps,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  TreeOpenChangeEvent,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  TreeOpenChangeData,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  TreeNavigationEvent_unstable,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  TreeNavigationData_unstable,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  TreeItemState,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  TreeItemSlots,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  TreeItemProps,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  TreeItemPersonaLayoutState,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  TreeItemPersonaLayoutSlots,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  TreeItemPersonaLayoutProps,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  TreeItemLayoutState,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  TreeItemLayoutSlots,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  TreeItemLayoutProps,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  TreeContextValue,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  FlatTreeProps,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  FlatTreeSlots,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  FlatTreeState,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  HeadlessFlatTree,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  HeadlessFlatTreeItem,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  HeadlessFlatTreeItemProps,
  /** @deprecated Tree is stable. Import from @fluentui/react-components instead */
  HeadlessFlatTreeOptions,
} from '@fluentui/react-tree';

export {
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  Drawer,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  renderDrawer_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  useDrawer_unstable,
  /** @deprecated Use `OverlayDrawer` from @fluentui/react-components instead */
  OverlayDrawer as DrawerOverlay,
  /** @deprecated Use `OverlayDrawerClassNames` from @fluentui/react-components instead */
  overlayDrawerClassNames as DrawerOverlayClassNames,
  /** @deprecated Use `renderOverlayDrawer_unstable` from @fluentui/react-components instead */
  renderOverlayDrawer_unstable as renderDrawerOverlay_unstable,
  /** @deprecated Use `useOverlayDrawerStyles_unstable` from @fluentui/react-components instead */
  useOverlayDrawerStyles_unstable as useDrawerOverlayStyles_unstable,
  /** @deprecated Use `useOverlayDrawer_unstable` from @fluentui/react-components instead */
  useOverlayDrawer_unstable as useDrawerOverlay_unstable,
  /** @deprecated Use `InlineDrawer` from @fluentui/react-components instead */
  InlineDrawer as DrawerInline,
  /** @deprecated Use `InlineDrawerClassNames` from @fluentui/react-components instead */
  inlineDrawerClassNames as DrawerInlineClassNames,
  /** @deprecated Use `renderInlineDrawer_unstable` from @fluentui/react-components instead */
  renderInlineDrawer_unstable as renderDrawerInline_unstable,
  /** @deprecated Use `useInlineDrawerStyles_unstable` from @fluentui/react-components instead */
  useInlineDrawerStyles_unstable as useDrawerInlineStyles_unstable,
  /** @deprecated Use `useInlineDrawer_unstable` from @fluentui/react-components instead */
  useInlineDrawer_unstable as useDrawerInline_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  OverlayDrawer,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  overlayDrawerClassNames,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  renderOverlayDrawer_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  useOverlayDrawerStyles_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  useOverlayDrawer_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  InlineDrawer,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  inlineDrawerClassNames,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  renderInlineDrawer_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  useInlineDrawerStyles_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  useInlineDrawer_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerBody,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  drawerBodyClassNames,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  renderDrawerBody_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  useDrawerBodyStyles_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  useDrawerBody_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerHeader,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  drawerHeaderClassNames,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  renderDrawerHeader_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  useDrawerHeaderStyles_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  useDrawerHeader_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerHeaderTitle,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  drawerHeaderTitleClassNames,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  renderDrawerHeaderTitle_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  useDrawerHeaderTitleStyles_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  useDrawerHeaderTitle_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerHeaderNavigation,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  drawerHeaderNavigationClassNames,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  renderDrawerHeaderNavigation_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  useDrawerHeaderNavigationStyles_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  useDrawerHeaderNavigation_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerFooter,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  drawerFooterClassNames,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  renderDrawerFooter_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  useDrawerFooterStyles_unstable,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  useDrawerFooter_unstable,
} from '@fluentui/react-drawer';

export type {
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerProps,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerSlots,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerState,
  /** @deprecated Use `OverlayDrawerProps` from @fluentui/react-components instead */
  OverlayDrawerProps as DrawerOverlayProps,
  /** @deprecated Use `OverlayDrawerSlots` from @fluentui/react-components instead */
  OverlayDrawerSlots as DrawerOverlaySlots,
  /** @deprecated Use `OverlayDrawerState` from @fluentui/react-components instead */
  OverlayDrawerState as DrawerOverlayState,
  /** @deprecated Use `InlineDrawerProps` from @fluentui/react-components instead */
  InlineDrawerProps as DrawerInlineProps,
  /** @deprecated Use `InlineDrawerSlots` from @fluentui/react-components instead */
  InlineDrawerSlots as DrawerInlineSlots,
  /** @deprecated Use `InlineDrawerState` from @fluentui/react-components instead */
  InlineDrawerState as DrawerInlineState,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  OverlayDrawerProps,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  OverlayDrawerSlots,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  OverlayDrawerState,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  InlineDrawerProps,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  InlineDrawerSlots,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  InlineDrawerState,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerBodySlots,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerBodyState,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerHeaderSlots,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerHeaderState,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerHeaderTitleSlots,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerHeaderTitleState,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerFooterSlots,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerFooterState,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerHeaderNavigationProps,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerHeaderNavigationSlots,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
  DrawerHeaderNavigationState,
  /** @deprecated Drawer is currently stable. Import from @fluentui/react-components instead */
} from '@fluentui/react-drawer';
