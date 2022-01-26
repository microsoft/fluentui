import { makeStyles as vanillaMakeStyles } from '@griffel/core';
import { useFluent } from '@fluentui/react-shared-contexts';
import * as React from 'react';

import { useRenderer } from './RendererContext';
import type { MakeStylesOptions, GriffelStyle } from '@griffel/core';

function isInsideComponent() {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useContext(({} as unknown) as React.Context<unknown>);
    return true;
  } catch (e) {
    return false;
  }
}

export function makeStyles<Slots extends string | number>(stylesBySlots: Record<Slots, GriffelStyle>) {
  const getStyles = vanillaMakeStyles(stylesBySlots);

  if (process.env.NODE_ENV !== 'production') {
    if (isInsideComponent()) {
      throw new Error(
        [
          "makeStyles(): this function cannot be called in component's scope.",
          'All makeStyles() calls should be top level i.e. in a root scope of a file.',
        ].join(' '),
      );
    }
  }

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
