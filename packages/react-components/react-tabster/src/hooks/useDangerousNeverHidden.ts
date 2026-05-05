export const DangerousNeverHiddenAttribute = 'data-tabster-never-hide';
const DangerousNeverHiddenPropObject = { [DangerousNeverHiddenAttribute]: '' };

/**
 * !!DANGEROUS!! Designates an element that will not be hidden even when outside an open modal.
 * Only works for top-level elements; should be used with extreme care.
 *
 * @returns Attribute to apply to the target element that should never receive aria-hidden
 */
export function useDangerousNeverHidden_unstable(): { [key: string]: string } {
  return DangerousNeverHiddenPropObject;
}
