import { getTabsterAttribute } from 'tabster';
import { useTabster } from './useTabster';

/**
 * Hook that returns tabster attributes while ensuring tabster exists
 * @param args same arguments as `getTabsterAttribute`
 */
export const useTabsterAttributes = (...args: Parameters<typeof getTabsterAttribute>) => {
  useTabster();

  return getTabsterAttribute(...args);
};
