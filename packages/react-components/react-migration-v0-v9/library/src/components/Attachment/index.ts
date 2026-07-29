export type { AttachmentProps } from './Attachment';
/*
 * `attachmentProgressBarClassName` and `attachmentProgressContainerClassName` are NOT
 * re-exported any more. They named `fui-Attachment__progress` / `…__progress-container`,
 * i.e. BEM statics on Attachment's INTERNALS, and D16 leaves no public class-name handle on
 * a component's internals. Deleting the exports rather than repointing them makes a stale
 * consumer fail at build time instead of silently selecting nothing
 * (statics-removal-design.md §3, option C).
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated FOR STYLING (DECISIONS.md D16.5); re-exporting the identity class is the point.
export { Attachment, attachmentClassName } from './Attachment';
export type { AttachmentActionProps } from './AttachmentAction';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated FOR STYLING (DECISIONS.md D16.5); re-exporting the identity class is the point.
export { AttachmentAction, attachmentActionClassName } from './AttachmentAction';
export type { AttachmentBodyProps } from './AttachmentBody';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated FOR STYLING (DECISIONS.md D16.5); re-exporting the identity class is the point.
export { AttachmentBody, attachmentBodyClassName } from './AttachmentBody';
export type { AttachmentDescriptionProps } from './AttachmentDescription';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated FOR STYLING (DECISIONS.md D16.5); re-exporting the identity class is the point.
export { AttachmentDescription, attachmentDescriptionClassName } from './AttachmentDescription';
export type { AttachmentHeaderProps } from './AttachmentHeader';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated FOR STYLING (DECISIONS.md D16.5); re-exporting the identity class is the point.
export { AttachmentHeader, attachmentHeaderClassName } from './AttachmentHeader';
export type { AttachmentIconProps } from './AttachmentIcon';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated FOR STYLING (DECISIONS.md D16.5); re-exporting the identity class is the point.
export { AttachmentIcon, attachmentIconClassName } from './AttachmentIcon';
