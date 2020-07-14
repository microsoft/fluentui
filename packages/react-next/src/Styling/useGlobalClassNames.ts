import { getGlobalClassNames, GlobalClassNames, useTheme } from '../Styling';

export function useGlobalClassNames<T>(classNames: GlobalClassNames<T>): GlobalClassNames<T> {
  const { tokens: theme } = useTheme();

  return getGlobalClassNames(
    classNames,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    theme as any,
  );
}
