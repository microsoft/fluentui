import { mergeClasses, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { MenuDividerSlots, MenuDividerState } from './MenuDivider.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { MaterialType } from '@fluentui/react-shared-contexts';

export const menuDividerClassNames: SlotClassNames<MenuDividerSlots> = {
  root: 'fui-MenuDivider',
};

const useStyles = makeStyles({
  root: {
    margin: '4px -5px 4px -5px',
    width: 'auto',
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  translucent: {
    borderBottomColor: tokens.colorNeutralStrokeAlpha,
  },
});

export const useMenuDividerStyles_unstable = (state: MenuDividerState) => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(
    menuDividerClassNames.root,
    styles.root,
    state.materialType && state.materialType !== MaterialType.Opaque && styles.translucent,
    state.root.className,
  );

  return state;
};
