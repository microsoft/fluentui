import { makeStyles as vanillaMakeStyles, MakeStylesOptions, MakeStylesStyleRule } from '@fluentui/make-styles';
import { useFluent } from '@fluentui/react-shared-contexts';
import { Theme } from '@fluentui/react-theme';

import { useRenderer } from './RendererContext';

export function makeStyles<Slots extends string>(stylesBySlots: Record<Slots, MakeStylesStyleRule<Theme>>) {
  const getStyles = vanillaMakeStyles(stylesBySlots);

  return function useClasses(): Record<Slots, string> {
    const { dir } = useFluent();

    const renderer = useRenderer();
    const options: MakeStylesOptions = {
      dir,
      renderer,
    };

    return getStyles(options);
  };
}
