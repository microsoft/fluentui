import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { useButton_unstable } from '../../../packages/react-components/react-button/library/src/components/Button/useButton';
import { renderButton_unstable } from '../../../packages/react-components/react-button/library/src/components/Button/renderButton';
import { useToggleButton_unstable } from '../../../packages/react-components/react-button/library/src/components/ToggleButton/useToggleButton';
import { renderToggleButton_unstable } from '../../../packages/react-components/react-button/library/src/components/ToggleButton/renderToggleButton';
// Explicit `.ts` imports bypass the CSS Modules resolution, giving the original Griffel implementations.
import { useButtonStyles_unstable as useGriffelButtonStyles } from '../../../packages/react-components/react-button/library/src/components/Button/useButtonStyles.styles.ts';
import { useToggleButtonStyles_unstable as useGriffelToggleButtonStyles } from '../../../packages/react-components/react-button/library/src/components/ToggleButton/useToggleButtonStyles.styles.ts';
import { griffel } from './compose';

// No custom style hook: an app's hook for the component under test must not be inserted early.
const noCustomStyleHook = 'useParityBaseStyles_unstable';
const baseComponents = [
  griffel('Button', useButton_unstable, useGriffelButtonStyles, renderButton_unstable, undefined, noCustomStyleHook),
  griffel(
    'ToggleButton',
    useToggleButton_unstable,
    useGriffelToggleButtonStyles,
    renderToggleButton_unstable,
    undefined,
    noCustomStyleHook,
  ),
];

/**
 * Inserts the Griffel styles of base components that other components compose (Button, ToggleButton) before
 * anything else renders, then unmounts.
 *
 * Griffel inserts a hook's rules on its first call, and rules with different selectors but equal specificity (a
 * wrapper's `:hover:active` and Button's `:hover:active,:active:focus-visible`) are ordered by insertion. In an app,
 * Button has almost always rendered before a Breadcrumb or Carousel button does, and the CSS Modules build imports
 * Button's stylesheet before the wrapper's; the baseline follows that order instead of each hook's call order.
 */
export const GriffelBaseStyles = (): JSXElement | null => {
  const [mounted, setMounted] = React.useState(true);
  React.useEffect(() => setMounted(false), []);
  if (!mounted) {
    return null;
  }
  return (
    <div hidden>
      {baseComponents.map((Component, index) => (
        <Component key={index} />
      ))}
    </div>
  );
};
