import type { GriffelResetStyle } from '@griffel/core';
import type { UserAuthoredStyles as StyleXStyle } from '@stylexjs/stylex/lib/StyleXTypes';
import { getUniqueClassName, registerStyles } from './classNameMap.native';
import { convertGriffelToStyleX } from './convertGriffelToStyleX.native';

export function makeResetStyles(resetStyles: GriffelResetStyle): () => string {
  const styles: Record<string, StyleXStyle> = {};

  const className = getUniqueClassName('resetStyles');
  styles[className] = convertGriffelToStyleX(resetStyles);

  const useResetStyles = () => {
    return className;
  };

  registerStyles(styles);

  return useResetStyles;
}
