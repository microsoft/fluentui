export {
  AnnounceProvider,
  PortalMountNodeProvider,
  useAnnounce,
  useFluent_unstable as useFluent,
  usePortalMountNode,
  useTooltipVisibility_unstable as useTooltipVisibility,
  useThemeClassName_unstable as useThemeClassName,
} from '@fluentui/react-shared-contexts';
export type { AnnounceContextValue } from '@fluentui/react-shared-contexts';
export {
  // getNativeElementProps is deprecated but removing it would be a breaking change
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  getNativeElementProps,
  getIntrinsicElementProps,
  getPartitionedNativeProps,
  getSlotClassNameProp_unstable,
  // getSlots is deprecated but removing it would be a breaking change
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  getSlots,
  slot,
  assertSlots,
  IdPrefixProvider,
  resetIdsForTests,
  // resolveShorthand is deprecated but removing it would be a breaking change
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  resolveShorthand,
  SSRProvider,
  useAnimationFrame,
  useId,
  useIsomorphicLayoutEffect,
  useEventCallback,
  mergeCallbacks,
  useIsSSR,
  useMergedRefs,
  useApplyScrollbarWidth,
  useScrollbarWidth,
  useSelection,
  useTimeout,
  isHTMLElement,
} from '@fluentui/react-utilities';
export type {
  ComponentProps,
  ComponentState,
  ForwardRefComponent,
  JSXElement,
  JSXIntrinsicElement,
  JSXIntrinsicElementKeys,
  // ResolveShorthandFunction is deprecated but removing it would be a breaking change
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  ResolveShorthandFunction,
  // ResolveShorthandOptions is deprecated but removing it would be a breaking change
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  ResolveShorthandOptions,
  Slot,
  SlotOptions,
  SlotComponentType,
  SlotClassNames,
  SlotPropsRecord,
  SlotRenderFunction,
  OnSelectionChangeCallback,
  OnSelectionChangeData,
  SelectionHookParams,
  SelectionItemId,
  SelectionMethods,
  SelectionMode,
} from '@fluentui/react-utilities';

export {
  Accordion,
  renderAccordion,
  useAccordion,
  useAccordionContext,
  useAccordionContextValues,
  AccordionHeader,
  renderAccordionHeader,
  useAccordionHeader,
  AccordionItem,
  renderAccordionItem,
  useAccordionItem,
  AccordionPanel,
  renderAccordionPanel,
  useAccordionPanel,
} from './Accordion';
export type {
  AccordionSlots,
  AccordionProps,
  AccordionState,
  AccordionContextValues,
  AccordionHeaderSlots,
  AccordionHeaderProps,
  AccordionHeaderState,
  AccordionItemSlots,
  AccordionItemProps,
  AccordionItemState,
  AccordionPanelSlots,
  AccordionPanelProps,
  AccordionPanelState,
} from './Accordion';

export { Button, renderButton, useButton } from './Button';
export type { ButtonSlots, ButtonProps, ButtonState } from './Button';

export { Divider, renderDivider, useDivider } from './Divider';
export type { DividerSlots, DividerProps, DividerState } from './Divider';
