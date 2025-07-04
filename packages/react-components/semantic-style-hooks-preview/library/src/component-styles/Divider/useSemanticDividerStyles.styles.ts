import { mergeClasses, shorthands, makeStyles } from '@griffel/react';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { dividerClassNames, DividerState } from '@fluentui/react-divider';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useBaseStyles = makeStyles({
  // Base styles
  base: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    position: 'relative',

    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textGlobalCaption1FontSize,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    lineHeight: semanticTokens.textGlobalCaption1LineHeight,
    letterSpacing: semanticTokens.textStyleDefaultRegularLetterSpacing,
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
    color: semanticTokens.foregroundContentBrandPrimary,

    '::before': {
      ...shorthands.borderColor(semanticTokens.strokeDividerBrand),
    },

    '::after': {
      ...shorthands.borderColor(semanticTokens.strokeDividerBrand),
    },
  },
  default: {
    color: semanticTokens.foregroundContentNeutralSecondary,

    '::before': {
      ...shorthands.borderColor(semanticTokens.strokeDividerDefault),
    },

    '::after': {
      ...shorthands.borderColor(semanticTokens.strokeDividerDefault),
    },
  },
  subtle: {
    color: semanticTokens._ctrlDividerForegroundSubtle,

    '::before': {
      ...shorthands.borderColor(semanticTokens.strokeDividerSubtle),
    },

    '::after': {
      ...shorthands.borderColor(semanticTokens.strokeDividerSubtle),
    },
  },
  strong: {
    color: semanticTokens.foregroundContentNeutralPrimary,

    '::before': {
      ...shorthands.borderColor(semanticTokens.strokeDividerStrong),
    },

    '::after': {
      ...shorthands.borderColor(semanticTokens.strokeDividerStrong),
    },
  },
});

const useHorizontalStyles = makeStyles({
  // Base styles
  base: {
    width: '100%',

    '::before': {
      borderTopStyle: 'solid',
      borderTopWidth: semanticTokens.strokeWidthDividerDefault,
      minWidth: semanticTokens.ctrlDividerFixedLineLength,
    },

    '::after': {
      borderTopStyle: 'solid',
      borderTopWidth: semanticTokens.strokeWidthDividerDefault,
      minWidth: semanticTokens.ctrlDividerFixedLineLength,
    },
  },

  // Inset styles
  inset: {
    paddingLeft: semanticTokens.paddingCtrlHorizontalDefault,
    paddingRight: semanticTokens.paddingCtrlHorizontalDefault,
  },

  // Alignment variations
  start: {
    '::before': {
      content: '""',
      marginRight: semanticTokens.paddingCtrlHorizontalDefault,
      maxWidth: semanticTokens.ctrlDividerFixedLineLength,
    },

    '::after': {
      marginLeft: semanticTokens.paddingCtrlHorizontalDefault,
    },
  },
  center: {
    '::before': {
      marginRight: semanticTokens.paddingCtrlHorizontalDefault,
    },
    '::after': {
      marginLeft: semanticTokens.paddingCtrlHorizontalDefault,
    },
  },
  end: {
    '::before': {
      marginRight: semanticTokens.paddingCtrlHorizontalDefault,
    },
    '::after': {
      content: '""',
      marginLeft: semanticTokens.paddingCtrlHorizontalDefault,
      maxWidth: semanticTokens.ctrlDividerFixedLineLength,
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
      borderRightWidth: semanticTokens.strokeWidthDividerDefault,
      minHeight: semanticTokens.ctrlDividerFixedLineLength,
    },

    '::after': {
      borderRightStyle: 'solid',
      borderRightWidth: semanticTokens.strokeWidthDividerDefault,
      minHeight: semanticTokens.ctrlDividerFixedLineLength,
    },
  },

  // Inset styles
  inset: {
    marginTop: semanticTokens.paddingCtrlHorizontalDefault,
    marginBottom: semanticTokens.paddingCtrlHorizontalDefault,
  },

  // With children styles
  withChildren: {
    minHeight: '84px',
  },

  // Alignment variations
  start: {
    '::before': {
      content: '""',
      marginBottom: semanticTokens.paddingCtrlHorizontalDefault,
      maxHeight: semanticTokens.ctrlDividerFixedLineLength,
    },

    '::after': {
      marginTop: semanticTokens.paddingCtrlHorizontalDefault,
    },
  },
  center: {
    '::before': {
      marginBottom: semanticTokens.paddingCtrlHorizontalDefault,
    },
    '::after': {
      marginTop: semanticTokens.paddingCtrlHorizontalDefault,
    },
  },
  end: {
    '::before': {
      marginBottom: semanticTokens.paddingCtrlHorizontalDefault,
    },
    '::after': {
      content: '""',
      marginTop: semanticTokens.paddingCtrlHorizontalDefault,
      maxHeight: semanticTokens.ctrlDividerFixedLineLength,
    },
  },
});

export const useSemanticDividerStyles = (_state: unknown): DividerState => {
  'use no memo';

  const state = _state as DividerState;

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

    getSlotClassNameProp_unstable(state.root),
  );

  if (state.wrapper) {
    state.wrapper.className = mergeClasses(
      dividerClassNames.wrapper,
      state.wrapper.className,
      getSlotClassNameProp_unstable(state.wrapper),
    );
  }

  return state;
};
