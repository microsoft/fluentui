'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderNav, useNav, useNavContextValues } from '@fluentui/react-headless-components-preview/nav';

import type { NavProps } from './Nav.types';
import { useNavStyles } from './useNavStyles';

/**
 * A Nav is a vertical list of navigation destinations. Windmod Nav: the headless nav decorated
 * with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Nav: ForwardRefComponent<NavProps> = React.forwardRef(
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-nav's styled useNav.
  ({ density = 'medium', ...rest }, ref) => {
    const styled = useNavStyles({
      ...useNav(rest, ref as React.Ref<HTMLDivElement>),
      density,
    });
    const contextValues = useNavContextValues(styled);

    // The headless context-values helper writes a literal 'medium' because its state type omits
    // density; overriding it here is the whole mechanism by which a row ever reads 'small'.
    return renderNav(styled, { ...contextValues, nav: { ...contextValues.nav, density } });
    // Casting is required due to lack of distributive union to support union on @types/react
  },
) as ForwardRefComponent<NavProps>;

Nav.displayName = 'Nav';
