import { getGlobalClassNames, GlobalClassNames, useTheme } from '../Styling';

export function useGlobalClassNames<T>(classNames: GlobalClassNames<T>): GlobalClassNames<T> {
  const { tokens: theme } = useTheme();

  return getGlobalClassNames(
    classNames,
    // tslint:disable-next-line:no-any
    theme as any,
  );
}
