/*
 * The `*ClassName` / `*ClassNames` exports below are all `@deprecated` FOR STYLING: each one
 * now holds the component's Tailwind named-group marker instead of the BEM static it used to
 * hold (DECISIONS.md D16.1 / D16.5). Re-exporting them is the whole point of retaining them —
 * the deprecation is a message to CONSUMERS, not a signal that this barrel should stop
 * forwarding — so every such line carries the documented suppression. Same shape as
 * react-divider's `src/index.ts`.
 */
/*
 * Griffel → Tailwind + CSS Modules migration (S-H, DECISIONS.md D19): the Griffel style
 * mixins (`grid`, `flexItem`, `input`, `slider`, `spinner`, `v0Icon`, `v9CustomSizeIcon`,
 * `v9DisabledCursor`, `v9HoverClasses`, `v9Icon`) are retired. They returned `GriffelStyle`
 * objects for consumers to spread into their own `makeStyles` calls; with the umbrella's
 * Griffel re-exports removed in the same major, that authoring path no longer exists.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated FOR STYLING (DECISIONS.md D16.5); re-exporting the identity class is the point.
export { GridShim, gridClassName, useGridStyles } from './components/Grid/index';
export type { GridShimProps } from './components/Grid/index';
export { FormFieldShim } from './components/FormField';
export { Segment } from './components/Segment';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated FOR STYLING (DECISIONS.md D16.5); re-exporting the identity class is the point.
export { Video, videoClassName } from './components/Video';
export { type VideoProps } from './components/Video';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated FOR STYLING (DECISIONS.md D16.5); re-exporting the identity class is the point.
export { StyledText, styledTextClassName } from './components/StyledText';
export type { StyledTextProps, StyledTextSlots } from './components/StyledText';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated FOR STYLING (DECISIONS.md D16.5); re-exporting the identity class is the point.
export { Primitive, primitiveClassName } from './components/Primitive';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated FOR STYLING (DECISIONS.md D16.5); re-exporting the identity class is the point.
export { ItemLayout, itemLayoutClassName, useItemLayoutStyles } from './components/ItemLayout';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated FOR STYLING (DECISIONS.md D16.5); re-exporting the identity class is the point.
export { Flex, flexClassName, useFlexStyles } from './components/Flex';
/* eslint-disable @typescript-eslint/no-deprecated -- deprecated FOR STYLING (DECISIONS.md D16.5); re-exporting the identity classes is the point. */
export {
  List,
  ListItem,
  listClassNames,
  listItemClassNames,
  renderListItem_unstable,
  renderList_unstable,
  useListItemStyles_unstable,
  useListItem_unstable,
  useListSelection,
  useListStyles_unstable,
  useList_unstable,
} from './components/List';
/* eslint-enable @typescript-eslint/no-deprecated */
export type { ListItemProps, ListItemSlots, ListItemState, ListProps, ListSlots, ListState } from './components/List';
/*
 * `attachmentProgressBarClassName` and `attachmentProgressContainerClassName` are gone. They
 * named `fui-Attachment__progress` / `…__progress-container`, i.e. BEM statics on Attachment's
 * INTERNALS, and D16 leaves no public class-name handle on a component's internals. Deleting
 * the exports rather than repointing them makes a stale consumer fail at build time instead of
 * silently selecting nothing (statics-removal-design.md §3, option C).
 */
/* eslint-disable @typescript-eslint/no-deprecated -- deprecated FOR STYLING (DECISIONS.md D16.5); re-exporting the identity classes is the point. */
export {
  Attachment,
  AttachmentAction,
  AttachmentBody,
  AttachmentDescription,
  AttachmentHeader,
  AttachmentIcon,
  attachmentClassName,
  attachmentActionClassName,
  attachmentBodyClassName,
  attachmentDescriptionClassName,
  attachmentHeaderClassName,
  attachmentIconClassName,
} from './components/Attachment';
/* eslint-enable @typescript-eslint/no-deprecated */

export type {
  AttachmentProps,
  AttachmentActionProps,
  AttachmentBodyProps,
  AttachmentDescriptionProps,
  AttachmentHeaderProps,
  AttachmentIconProps,
} from './components/Attachment';
