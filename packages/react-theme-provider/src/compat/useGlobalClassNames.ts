import { getGlobalClassNames, GlobalClassNames } from '@uifabric/styling';
import { useTheme } from '../useTheme';

export function useGlobalClassNames<T>(classNames: GlobalClassNames<T>): GlobalClassNames<T> {
  const { tokens: theme } = useTheme();

  return getGlobalClassNames(
    classNames,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    theme as any,
  );
}
