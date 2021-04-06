import {
  createDOMRenderer,
  makeStyles as vanillaMakeStyles,
  MakeStylesOptions,
  MakeStylesRenderer,
  MakeStylesStyleRule,
} from '@fluentui/make-styles';
import { useTheme, useFluent } from '@fluentui/react-shared-contexts';
import { Theme } from '@fluentui/react-theme';
import * as React from 'react';

function useRenderer(document: Document | undefined): MakeStylesRenderer {
  return React.useMemo(() => {
    return createDOMRenderer(document);
  }, [document]);
}

export function makeStyles<Slots extends string>(stylesBySlots: Record<Slots, MakeStylesStyleRule<Theme>>) {
  const getStyles = vanillaMakeStyles(stylesBySlots);

  if (process.env.NODE_ENV === 'test') {
    return () => ({} as Record<Slots, string>);
  }

  return function useClasses(): Record<Slots, string> {
    const { dir, document } = useFluent();
    const theme = useTheme();

    const renderer = useRenderer(document);
    const options: MakeStylesOptions<Theme> = {
      dir,
      tokens: theme as Theme,
      renderer,
    };

    return getStyles(options);
  };
}
