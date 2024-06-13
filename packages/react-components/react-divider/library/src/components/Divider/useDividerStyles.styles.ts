import { mergeClasses, shorthands, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { DividerSlots, DividerState } from './Divider.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const dividerClassNames: SlotClassNames<DividerSlots> = {
  root: 'fui-Divider',
  wrapper: 'fui-Divider__wrapper',
};

const contentSpacing = '12px';
const insetSpacing = '12px';
const maxStartEndLength = '8px';
const minStartEndLength = '8px;';

const useBaseStyles = makeStyles({
  // Base styles
  base: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    position: 'relative',

    fontFamily: `var(--ctrl-token-Divider-1069, var(--semantic-token-Divider-1070, ${tokens.fontFamilyBase}))`,
    fontSize: `var(--ctrl-token-Divider-1071, var(--semantic-token-Divider-1072, ${tokens.fontSizeBase200}))`,
    fontWeight: `var(--ctrl-token-Divider-1073, var(--semantic-token-Divider-1074, ${tokens.fontWeightRegular}))`,
    lineHeight: `var(--ctrl-token-Divider-1075, var(--semantic-token-Divider-1076, ${tokens.lineHeightBase200}))`,
    textAlign: 'center',

    '::before': {
      boxSizing: 'border-box',
      display: 'flex',
      flexGrow: 1,
    },

    '::after': {
      boxSizing: 'border-box',
      display: 'flex',
      flexGrow: 1,
    },
  },

  // Childless styles
  childless: {
    '::before': {
      marginBottom: 0,
      marginRight: 0,
    },

    '::after': {
      marginLeft: 0,
      marginTop: 0,
    },
  },

  // Alignment variations
  start: {
    '::after': {
      content: '""',
    },
  },
  center: {
    '::before': {
      content: '""',
    },
    '::after': {
      content: '""',
    },
  },
  end: {
    '::before': {
      content: '""',
    },
  },

  // Appearance variations
  brand: {
    color: `var(--ctrl-token-Divider-1077, var(--semantic-token-Divider-1078, ${tokens.colorBrandForeground1}))`,

    '::before': {
      ...shorthands.borderColor(tokens.colorBrandStroke1),
    },

    '::after': {
      ...shorthands.borderColor(tokens.colorBrandStroke1),
    },
  },
  default: {
    color: `var(--ctrl-token-Divider-1079, var(--semantic-token-Divider-1080, ${tokens.colorNeutralForeground2}))`,

    '::before': {
      ...shorthands.borderColor(tokens.colorNeutralStroke2),
    },

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke2),
    },
  },
  subtle: {
    color: `var(--ctrl-token-Divider-1081, var(--semantic-token-Divider-1082, ${tokens.colorNeutralForeground3}))`,

    '::before': {
      ...shorthands.borderColor(tokens.colorNeutralStroke3),
    },

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke3),
    },
  },
  strong: {
    color: `var(--ctrl-token-Divider-1083, var(--semantic-token-Divider-1084, ${tokens.colorNeutralForeground1}))`,

    '::before': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
    },

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
    },
  },
});

const useHorizontalStyles = makeStyles({
  // Base styles
  base: {
    width: '100%',

    '::before': {
      borderTopStyle: 'solid',
      borderTopWidth: `var(--ctrl-token-Divider-1085, var(--semantic-token-Divider-1086, ${tokens.strokeWidthThin}))`,
      minWidth: minStartEndLength,
    },

    '::after': {
      borderTopStyle: 'solid',
      borderTopWidth: `var(--ctrl-token-Divider-1087, var(--semantic-token-Divider-1088, ${tokens.strokeWidthThin}))`,
      minWidth: minStartEndLength,
    },
  },

  // Inset styles
  inset: {
    paddingLeft: insetSpacing,
    paddingRight: insetSpacing,
  },

  // Alignment variations
  start: {
    '::before': {
      content: '""',
      marginRight: contentSpacing,
      maxWidth: maxStartEndLength,
    },

    '::after': {
      marginLeft: contentSpacing,
    },
  },
  center: {
    '::before': {
      marginRight: contentSpacing,
    },
    '::after': {
      marginLeft: contentSpacing,
    },
  },
  end: {
    '::before': {
      marginRight: contentSpacing,
    },
    '::after': {
      content: '""',
      marginLeft: contentSpacing,
      maxWidth: maxStartEndLength,
    },
  },
});

const useVerticalStyles = makeStyles({
  // Base styles
  base: {
    flexDirection: 'column',
    minHeight: '20px',

    '::before': {
      borderRightStyle: 'solid',
      borderRightWidth: `var(--ctrl-token-Divider-1089, var(--semantic-token-Divider-1090, ${tokens.strokeWidthThin}))`,
      minHeight: minStartEndLength,
    },

    '::after': {
      borderRightStyle: 'solid',
      borderRightWidth: `var(--ctrl-token-Divider-1091, var(--semantic-token-Divider-1092, ${tokens.strokeWidthThin}))`,
      minHeight: minStartEndLength,
    },
  },

  // Inset styles
  inset: {
    marginTop: insetSpacing,
    marginBottom: insetSpacing,
  },

  // With children styles
  withChildren: {
    minHeight: '84px',
  },

  // Alignment variations
  start: {
    '::before': {
      content: '""',
      marginBottom: contentSpacing,
      maxHeight: maxStartEndLength,
    },

    '::after': {
      marginTop: contentSpacing,
    },
  },
  center: {
    '::before': {
      marginBottom: contentSpacing,
    },
    '::after': {
      marginTop: contentSpacing,
    },
  },
  end: {
    '::before': {
      marginBottom: contentSpacing,
    },
    '::after': {
      content: '""',
      marginTop: contentSpacing,
      maxHeight: maxStartEndLength,
    },
  },
});

export const useDividerStyles_unstable = (state: DividerState): DividerState => {
  const baseStyles = useBaseStyles();
  const horizontalStyles = useHorizontalStyles();
  const verticalStyles = useVerticalStyles();

  const { alignContent, appearance, inset, vertical } = state;

  state.root.className = mergeClasses(
    dividerClassNames.root,

    // Base styles
    baseStyles.base,
    baseStyles[alignContent],
    appearance && baseStyles[appearance],

    // Horizontal styles
    !vertical && horizontalStyles.base,
    !vertical && inset && horizontalStyles.inset,
    !vertical && horizontalStyles[alignContent],

    // Vertical styles
    vertical && verticalStyles.base,
    vertical && inset && verticalStyles.inset,
    vertical && verticalStyles[alignContent],
    vertical && state.root.children !== undefined && verticalStyles.withChildren,

    // Childless styles
    state.root.children === undefined && baseStyles.childless,

    // User provided class name
    state.root.className,
  );

  if (state.wrapper) {
    state.wrapper.className = mergeClasses(dividerClassNames.wrapper, state.wrapper.className);
  }

  return state;
};
