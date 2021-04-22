import { getTabsterAttribute } from 'tabster';
import { useTabster } from './useTabster';

/**
 * Hook that returns tabster attributes while ensuring tabster exists
 * @param args - same arguments as `getTabsterAttribute`
 */
export const useTabsterAttributes = (...args: Parameters<typeof getTabsterAttribute>) => {
  // A tabster instance is not necessary to generate tabster attributes
  // but calling the hook will ensure that a tabster instance exists internally and avoids consumers doing the same
  useTabster();

  return getTabsterAttribute(...args);
};
