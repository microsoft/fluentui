import {
  MakeStaticStyles,
  makeStaticStyles as vanillaMakeStaticStyles,
  MakeStaticStylesOptions,
} from '@fluentui/make-styles';
import { useFluent } from '@fluentui/react-shared-contexts';

import { useRenderer } from './useRenderer';

export function makeStaticStyles<Selectors>(styles: MakeStaticStyles | MakeStaticStyles[]) {
  const getStyles = vanillaMakeStaticStyles(styles);

  if (process.env.NODE_ENV === 'test') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }

  return function useStaticStyles(): void {
    const { targetDocument } = useFluent();

    const renderer = useRenderer(targetDocument);
    const options: MakeStaticStylesOptions = { renderer };

    return getStyles(options);
  };
}
