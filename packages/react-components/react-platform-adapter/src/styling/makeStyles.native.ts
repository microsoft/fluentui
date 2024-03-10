import type { GriffelStyle } from '@griffel/core';
import type { UserAuthoredStyles as StyleXStyle } from '@stylexjs/stylex/lib/StyleXTypes';
import { getUniqueClassName, registerStyles } from './classNameMap.native';
import { convertGriffelToStyleX } from './convertGriffelToStyleX.native';

export function makeStyles<Slots extends string | number>(
  stylesBySlots: Record<Slots, GriffelStyle>,
): () => Record<Slots, string> {
  const classNameMap = {} as Record<Slots, string>;
  const styles: Record<string, StyleXStyle> = {};

  for (const slotName in stylesBySlots) {
    if (!Object.prototype.hasOwnProperty.call(stylesBySlots, slotName)) {
      continue;
    }

    const className = getUniqueClassName(slotName);
    styles[className] = convertGriffelToStyleX(stylesBySlots[slotName]);
    classNameMap[slotName] = className;
  }

  const useStyles = () => {
    return classNameMap;
  };

  registerStyles(styles);

  return useStyles;
}
