import { getGlobalClassNames, GlobalClassNames, ITheme } from '@uifabric/styling';
import { useTheme } from './useTheme';

/**
 * Hook to get global classnames based on `disableGlobalClassNames` inside theme.
 */
export function useGlobalClassNames<T>(classNames: GlobalClassNames<T>): GlobalClassNames<T> {
  const theme = useTheme();

  return getGlobalClassNames(classNames, theme as ITheme);
}
