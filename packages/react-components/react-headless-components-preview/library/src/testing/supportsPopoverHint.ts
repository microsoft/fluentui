/**
 * Whether the browser supports `popover="hint"`. Where it doesn't, `hint` layers fall back to `manual`.
 */
export const supportsPopoverHint = (targetDocument: Document): boolean => {
  const probe = targetDocument.createElement('div');
  probe.setAttribute('popover', 'hint');
  return (probe as HTMLElement & { popover?: string | null }).popover === 'hint';
};
