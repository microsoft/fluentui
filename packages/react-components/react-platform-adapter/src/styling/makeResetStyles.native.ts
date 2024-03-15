import type { GriffelStyle } from '@griffel/core';
import type { UserAuthoredStyles as StyleXStyle } from '@stylexjs/stylex/lib/StyleXTypes';
import { getUniqueClassName, registerStyles } from './classNameMap.native';
import { convertGriffelToStyleX } from './convertGriffelToStyleX.native';

// Note, the `resetStyles` param is of type `GriffelStyle` and not `GriffelResetStyle`, since
// react-strict-dom does not support all shorthand properties.
export function makeResetStyles(resetStyles: GriffelStyle): () => string {
  const styles: Record<string, StyleXStyle> = {};

  const className = getUniqueClassName('resetStyles');
  styles[className] = convertGriffelToStyleX(resetStyles);

  let registered = false;
  const useResetStyles = () => {
    if (!registered) {
      registerStyles(styles);
      registered = true;
    }

    return className;
  };

  return useResetStyles;
}
