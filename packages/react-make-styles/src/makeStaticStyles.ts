import { makeStaticStyles as vanillaMakeStaticStyles } from '@griffel/core';

import { useRenderer } from './RendererContext';
import type { GriffelStaticStyles, MakeStaticStylesOptions } from '@griffel/core';

export function makeStaticStyles<Selectors>(styles: GriffelStaticStyles | GriffelStaticStyles[]) {
  const getStyles = vanillaMakeStaticStyles(styles);

  if (process.env.NODE_ENV === 'test') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }

  return function useStaticStyles(): void {
    const renderer = useRenderer();
    const options: MakeStaticStylesOptions = { renderer };

    return getStyles(options);
  };
}
