import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { DividerState } from './Divider.types';

const contentSpacing = '12px';
const insetSpacing = '12px';
const startEndMaxHeight = '8px';

const useBaseStyles = makeStyles({
  // Base styles
  base: theme => ({
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    position: 'relative',

    fontFamily: theme.fontFamilyBase,
    fontSize: theme.fontSizeBase200,
    fontWeight: theme.fontWeightRegular,
    lineHeight: theme.lineHeightBase200,

    color: theme.colorNeutralForeground2,

    ':before': {
      boxSizing: 'border-box',
      display: 'flex',
      flexGrow: 1,

      borderColor: theme.colorNeutralStroke2,
    },

    ':after': {
      boxSizing: 'border-box',
      display: 'flex',
      flexGrow: 1,

      borderColor: theme.colorNeutralStroke2,
    },
  }),

  // Childless styles
  childless: {
    ':before': {
      marginBottom: 0,
      marginRight: 0,
    },

    ':after': {
      marginLeft: 0,
      marginTop: 0,
    },
  },

  // Alignment variations
  start: {
    ':after': {
      content: '""',
    },
  },
  center: {
    ':before': {
      content: '""',
    },
    ':after': {
      content: '""',
    },
  },
  end: {
    ':before': {
      content: '""',
    },
  },

  // Appearance variations
  brand: theme => ({
    color: theme.colorBrandForeground1,

    ':before': {
      borderColor: theme.colorBrandStroke1,
    },

    ':after': {
      borderColor: theme.colorBrandStroke1,
    },
  }),
  subtle: theme => ({
    ':before': {
      borderColor: theme.colorNeutralStroke3,
    },

    ':after': {
      borderColor: theme.colorNeutralStroke3,
    },
  }),
  strong: theme => ({
    ':before': {
      borderColor: theme.colorNeutralStroke1,
    },

    ':after': {
      borderColor: theme.colorNeutralStroke1,
    },
  }),
});

const useHorizontalStyles = makeStyles({
  // Base styles
  base: theme => ({
    width: '100%',

    ':before': {
      borderTopStyle: 'solid',
      borderTopWidth: theme.strokeWidthThin,
    },

    ':after': {
      borderTopStyle: 'solid',
      borderTopWidth: theme.strokeWidthThin,
    },
  }),

  // Inset styles
  inset: {
    paddingLeft: insetSpacing,
    paddingRight: insetSpacing,
  },

  // Alignment variations
  start: {
    ':before': {
      content: '""',
      marginRight: contentSpacing,
      maxWidth: startEndMaxHeight,
    },

    ':after': {
      marginLeft: contentSpacing,
    },
  },
  center: {
    ':before': {
      marginRight: contentSpacing,
    },
    ':after': {
      marginLeft: contentSpacing,
    },
  },
  end: {
    ':before': {
      marginRight: contentSpacing,
    },
    ':after': {
      content: '""',
      marginLeft: contentSpacing,
      maxWidth: startEndMaxHeight,
    },
  },
});

const useVerticalStyles = makeStyles({
  // Base styles
  base: theme => ({
    flexDirection: 'column',
    minHeight: '20px',

    ':before': {
      borderRightStyle: 'solid',
      borderRightWidth: theme.strokeWidthThin,
    },

    ':after': {
      borderRightStyle: 'solid',
      borderRightWidth: theme.strokeWidthThin,
    },
  }),

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
    ':before': {
      content: '""',
      marginBottom: contentSpacing,
      maxHeight: startEndMaxHeight,
    },

    ':after': {
      marginTop: contentSpacing,
    },
  },
  center: {
    ':before': {
      marginBottom: contentSpacing,
    },
    ':after': {
      marginTop: contentSpacing,
    },
  },
  end: {
    ':before': {
      marginBottom: contentSpacing,
    },
    ':after': {
      content: '""',
      marginTop: contentSpacing,
      maxHeight: startEndMaxHeight,
    },
  },
});

export const useDividerStyles = (state: DividerState): DividerState => {
  const baseStyles = useBaseStyles();
  const horizontalStyles = useHorizontalStyles();
  const verticalStyles = useVerticalStyles();

  const { alignContent, appearance, inset, vertical } = state;

  state.root.className = mergeClasses(
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

  return state;
};
