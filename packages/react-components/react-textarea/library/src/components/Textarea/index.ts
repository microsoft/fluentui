export { Textarea } from './Textarea';
export type {
  TextareaBaseProps,
  TextareaBaseState,
  TextareaOnChangeData,
  TextareaProps,
  TextareaSlots,
  TextareaState,
} from './Textarea.types';
export { renderTextarea_unstable } from './renderTextarea';
export { useTextarea_unstable, useTextareaBase_unstable } from './useTextarea';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- `textareaClassNames` is deprecated for styling (DECISIONS.md D16.5); re-exporting it is the point.
export { textareaClassNames, useTextareaStyles_unstable } from './useTextareaStyles.styles';
