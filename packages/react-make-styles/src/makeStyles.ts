import { makeStyles as vanillaMakeStyles, MakeStylesOptions, MakeStylesStyleRule } from '@fluentui/make-styles';
import { useFluent } from '@fluentui/react-shared-contexts';
import { Theme } from '@fluentui/react-theme';

import { useRenderer } from './useRenderer';

export function makeStyles<Slots extends string>(stylesBySlots: Record<Slots, MakeStylesStyleRule<Theme>>) {
  const getStyles = vanillaMakeStyles(stylesBySlots);

  return function useClasses(): Record<Slots, string> {
    const { dir, targetDocument } = useFluent();

    const renderer = useRenderer(targetDocument);
    const options: MakeStylesOptions = {
      dir,
      renderer,
    };

    return getStyles(options);
  };
}
