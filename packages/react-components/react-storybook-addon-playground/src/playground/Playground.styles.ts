import { makeStyles, tokens } from '@fluentui/react-components';

/** Below this width the editor and the preview are stacked instead of side by side. */
export const NARROW_LAYOUT_QUERY = '(max-width: 800px)';
/** Below this width the toolbar buttons show icons only. */
export const COMPACT_TOOLBAR_QUERY = '(max-width: 1100px)';

const NARROW_LAYOUT = `@media ${NARROW_LAYOUT_QUERY}`;

const paneBorder = `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`;

export const usePlaygroundStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto minmax(0, 1fr)',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
  },
  rootDragging: {
    userSelect: 'none',
    cursor: 'col-resize',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalM,
    borderBottom: paneBorder,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow2,
    position: 'relative',
    zIndex: 1,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
  },
  brandMark: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacingHorizontalXS,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontSize: tokens.fontSizeBase500,
    '& svg': {
      display: 'block',
    },
  },
  titles: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  title: {
    margin: 0,
    whiteSpace: 'nowrap',
    lineHeight: tokens.lineHeightBase400,
  },
  subtitle: {
    color: tokens.colorNeutralForeground3,
    whiteSpace: 'nowrap',
    [NARROW_LAYOUT]: {
      display: 'none',
    },
  },
  toolbar: {
    flexShrink: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  themePicker: {
    minWidth: '150px',
  },

  main: {
    display: 'grid',
    gridTemplateColumns: 'minmax(240px, var(--playground-split, 50%)) auto minmax(240px, 1fr)',
    minHeight: 0,
    [NARROW_LAYOUT]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
      gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr)',
    },
  },
  pane: {
    display: 'grid',
    gridTemplateRows: 'auto minmax(0, 1fr)',
    minWidth: 0,
    minHeight: 0,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  editorPane: {
    [NARROW_LAYOUT]: {
      borderBottom: paneBorder,
    },
  },
  previewPane: {
    gridTemplateRows: 'auto minmax(0, 1fr) auto',
  },
  paneHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    minHeight: tokens.lineHeightHero700,
    boxSizing: 'border-box',
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalXXS,
    paddingBottom: tokens.spacingVerticalXXS,
    borderBottom: paneBorder,
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground2,
  },
  paneTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase200,
    '& svg': {
      fontSize: tokens.fontSizeBase400,
      color: tokens.colorNeutralForeground3,
    },
  },
  fileName: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground3,
  },
  paneMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    marginLeft: 'auto',
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },

  separator: {
    position: 'relative',
    width: tokens.spacingHorizontalS,
    cursor: 'col-resize',
    backgroundColor: tokens.colorNeutralBackground3,
    borderLeft: paneBorder,
    borderRight: paneBorder,
    boxSizing: 'border-box',
    '::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: tokens.strokeWidthThick,
      height: tokens.spacingVerticalXXXL,
      borderRadius: tokens.borderRadiusCircular,
      backgroundColor: tokens.colorNeutralStroke1,
    },
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground3Hover,
      '::after': {
        backgroundColor: tokens.colorBrandStroke1,
      },
    },
    ':focus-visible': {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: `calc(-1 * ${tokens.strokeWidthThick})`,
    },
    [NARROW_LAYOUT]: {
      display: 'none',
    },
  },
  separatorActive: {
    backgroundColor: tokens.colorNeutralBackground3Pressed,
    '::after': {
      backgroundColor: tokens.colorBrandStroke1,
    },
  },

  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacingVerticalS,
    height: '100%',
    boxSizing: 'border-box',
    padding: tokens.spacingHorizontalXXL,
    textAlign: 'center',
    color: tokens.colorNeutralForeground3,
  },
  placeholderIcon: {
    fontSize: tokens.fontSizeHero800,
    color: tokens.colorNeutralForeground4,
  },

  errorBar: {
    margin: tokens.spacingHorizontalM,
    maxHeight: '40vh',
    overflow: 'auto',
  },
  errorMessage: {
    margin: 0,
    marginTop: tokens.spacingVerticalXS,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
  },
  errorHint: {
    display: 'block',
    marginTop: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground3,
  },
});
