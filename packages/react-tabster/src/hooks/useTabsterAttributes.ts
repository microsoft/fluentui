import { getTabsterAttribute } from 'tabster';
import { TabsterDOMAttribute, TabsterAttributeProps } from 'tabster/dist/Types';
import { useTabster } from './useTabster';

/**
 * Hook that returns tabster attributes while ensuring tabster exists
 * @param args - same arguments as `getTabsterAttribute`
 */
export const useTabsterAttributes = (
  props: TabsterAttributeProps | null,
  plain?: true | false | undefined,
): string | undefined | TabsterDOMAttribute => {
  // A tabster instance is not necessary to generate tabster attributes
  // but calling the hook will ensure that a tabster instance exists internally and avoids consumers doing the same
  useTabster();

  // eslint-disable-next-line
  return (getTabsterAttribute as any)(props, plain);
};
