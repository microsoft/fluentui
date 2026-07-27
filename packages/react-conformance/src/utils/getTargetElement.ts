import type { IsConformantOptions } from '../types';

/**
 * Find the target element where the attribute is applied using either `getTargetElement`,
 * or the first child of the container.
 */
export function getTargetElement<TProps = {}>(
  testInfo: IsConformantOptions<TProps>,
  ...[result, attr]: Parameters<Required<IsConformantOptions<TProps>>['getTargetElement']>
): HTMLElement {
  return testInfo.getTargetElement
    ? testInfo.getTargetElement(result, attr)
    : (result.container.firstElementChild as HTMLElement);
}
