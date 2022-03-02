import { mergeStyles } from '@fluentui/react';

/** Styles to make the example easier to visually follow when debugging */
export const rootClass = mergeStyles({
  button: { display: 'inline-block', margin: 5, height: 25, minWidth: 60 },
  '> *': { margin: 5 },
  '*:focus': { outline: '2px dashed red' },
  // usually targets FocusTrapZone roots
  '> div': { border: '2px dashed blue', padding: 5 },
  // targets FocusZone roots
  '[data-focuszone-id]': { border: '2px dashed lightgray', margin: 5, padding: 5 },
});
