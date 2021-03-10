import { makeStylesCompat as vanillaMakeStyles, MakeStylesDefinition, MakeStylesOptions } from '@fluentui/make-styles';
import { useFluent } from '@fluentui/react-provider';
import { useTheme } from '@fluentui/react-theme-provider';
import { Theme } from '@fluentui/react-theme';

import { useRenderer } from './useRenderer';

export function makeStylesCompat<Selectors>(definitions: MakeStylesDefinition<Selectors, Theme>[]) {
  const getStyles = vanillaMakeStyles(definitions);

  if (process.env.NODE_ENV === 'test') {
    return () => '';
  }

  return function useClasses(selectors: Selectors) {
    const { dir, document } = useFluent();
    const theme = useTheme();

    const renderer = useRenderer(document);
    const options: MakeStylesOptions<Theme> = {
      tokens: theme as Theme,
      renderer,
      rtl: dir === 'rtl',
    };

    return getStyles(selectors, options);
  };
}
