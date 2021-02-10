import {
  createDOMRenderer,
  makeOverrides as vanillaMakeOverrides,
  MakeStylesOptions,
  MakeStylesRenderer,
  MakeStylesStyleRule,
} from '@fluentui/make-styles';
import { useFluent } from '@fluentui/react-provider';
import { useTheme } from '@fluentui/react-theme-provider';
import { Theme } from '@fluentui/react-theme';
import * as React from 'react';

function useRenderer(document: Document | undefined): MakeStylesRenderer {
  return React.useMemo(() => {
    return createDOMRenderer(document);
  }, [document]);
}

export function makeOverrides<Slots extends string>(stylesBySlots: Record<Slots, MakeStylesStyleRule<Theme>>) {
  const getStyles = vanillaMakeOverrides(stylesBySlots);

  if (process.env.NODE_ENV === 'test') {
    return () => ({} as Record<Slots, string>);
  }

  return function useClasses(): Record<Slots, string> {
    const { dir, document } = useFluent();
    const theme = useTheme();

    const renderer = useRenderer(document);
    const options: MakeStylesOptions<Theme> = {
      tokens: theme as Theme,
      renderer,
      rtl: dir === 'rtl',
    };

    return getStyles(options);
  };
}
