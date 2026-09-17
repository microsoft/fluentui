import { makeStyles, tokens } from '@fluentui/react-components';

/** Below this width the editor and the preview are stacked instead of side by side. */
export const NARROW_LAYOUT_QUERY = '(max-width: 800px)';
/** Below this width the toolbar buttons show icons only. */
export const COMPACT_TOOLBAR_QUERY = '(max-width: 1100px)';

const NARROW_LAYOUT = `@media ${NARROW_LAYOUT_QUERY}`;

/**
 * Shell chrome uses Fluent tokens so light/dark (and high contrast) follow `FluentProvider`.
 * Syntax highlighting in Monaco stays on a curated palette — see `editorTheme.ts`.
 */
export const usePlaygroundStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto minmax(0, 1fr)',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  rootDragging: {
    userSelect: 'none',
    cursor: 'col-resize',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalL,
    height: '48px',
    boxSizing: 'border-box',
    padding: `0 ${tokens.spacingHorizontalL}`,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalMNudge,
    minWidth: 0,
  },
  brandIcon: {
    display: 'inline-flex',
    fontSize: tokens.fontSizeBase500,
    color: tokens.colorBrandForeground1,
    '& svg': {
      display: 'block',
    },
  },
  title: {
    margin: 0,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    fontWeight: tokens.fontWeightSemibold,
    whiteSpace: 'nowrap',
  },
  subtitle: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    whiteSpace: 'nowrap',
    [NARROW_LAYOUT]: {
      display: 'none',
    },
  },
  toolbar: {
    flexShrink: 0,
    gap: tokens.spacingHorizontalXS,
    padding: 0,
  },
  themePicker: {
    minWidth: '140px',
  },

  main: {
    display: 'grid',
    gridTemplateColumns: 'minmax(240px, var(--playground-split, 50%)) auto minmax(240px, 1fr)',
    minHeight: 0,
    padding: tokens.spacingHorizontalM,
    boxSizing: 'border-box',
    [NARROW_LAYOUT]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
      gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr)',
      rowGap: tokens.spacingVerticalM,
    },
  },
  pane: {
    display: 'grid',
    gridTemplateRows: 'auto minmax(0, 1fr)',
    minWidth: 0,
    minHeight: 0,
    overflow: 'hidden',
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  previewPane: {
    gridTemplateRows: 'auto minmax(0, 1fr) auto',
  },
  paneHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    height: '36px',
    boxSizing: 'border-box',
    padding: `0 ${tokens.spacingHorizontalM}`,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  paneTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalSNudge,
    minWidth: 0,
    flex: 1,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    '& svg': {
      fontSize: tokens.fontSizeBase300,
      color: tokens.colorNeutralForeground3,
      flexShrink: 0,
    },
  },
  fileName: {
    fontFamily: '"Cascadia Code", "JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, monospace',
    fontWeight: tokens.fontWeightMedium,
  },
  fileTabs: {
    display: 'flex',
    minWidth: 0,
    height: '100%',
    overflowX: 'auto',
  },
  fileTab: {
    display: 'inline-flex',
    alignItems: 'center',
    height: '100%',
    margin: 0,
    padding: `0 ${tokens.spacingHorizontalMNudge}`,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: tokens.strokeWidthThick,
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    fontFamily: '"Cascadia Code", "JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, monospace',
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground3,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    ':hover': {
      color: tokens.colorNeutralForeground1,
    },
    ':focus-visible': {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: `-${tokens.strokeWidthThick}`,
    },
  },
  fileTabActive: {
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
    borderBottomColor: tokens.colorBrandStroke1,
  },
  paneMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    marginLeft: 'auto',
    color: tokens.colorNeutralForeground3,
  },

  status: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalSNudge,
    whiteSpace: 'nowrap',
    color: tokens.colorNeutralForeground3,
  },
  statusDot: {
    width: tokens.spacingHorizontalSNudge,
    height: tokens.spacingVerticalSNudge,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  statusSuccess: { color: tokens.colorStatusSuccessForeground1 },
  statusDanger: { color: tokens.colorStatusDangerForeground1 },
  statusWarning: { color: tokens.colorStatusWarningForeground1 },
  statusLabel: {
    color: tokens.colorNeutralForeground2,
  },

  separator: {
    position: 'relative',
    width: tokens.spacingHorizontalM,
    cursor: 'col-resize',
    '::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: '50%',
      width: tokens.strokeWidthThick,
      transform: 'translateX(-50%)',
      borderRadius: tokens.borderRadiusSmall,
      backgroundColor: 'transparent',
      transitionProperty: 'background-color',
      transitionDuration: '100ms',
    },
    ':hover': {
      '::after': {
        backgroundColor: tokens.colorBrandStroke1,
      },
    },
    ':focus-visible': {
      outline: 'none',
      '::after': {
        backgroundColor: tokens.colorBrandStroke1,
      },
    },
    [NARROW_LAYOUT]: {
      display: 'none',
    },
  },
  separatorActive: {
    '::after': {
      backgroundColor: tokens.colorBrandStroke1,
    },
  },

  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacingVerticalXS,
    height: '100%',
    boxSizing: 'border-box',
    padding: tokens.spacingHorizontalXXXL,
    textAlign: 'center',
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  placeholderIcon: {
    fontSize: tokens.fontSizeBase600,
    marginBottom: tokens.spacingVerticalXS,
    color: tokens.colorNeutralForeground3,
  },
  placeholderTitle: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },

  errorBar: {
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr)',
    columnGap: tokens.spacingHorizontalS,
    alignItems: 'start',
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    maxHeight: '40vh',
    overflow: 'auto',
    borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  errorDot: {
    width: tokens.spacingHorizontalSNudge,
    height: tokens.spacingVerticalSNudge,
    marginTop: tokens.spacingVerticalXS,
    borderRadius: '50%',
    backgroundColor: tokens.colorStatusDangerForeground1,
  },
  errorTitle: {
    margin: 0,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorStatusDangerForeground1,
  },
  errorMessage: {
    margin: `${tokens.spacingVerticalXS} 0 0`,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontFamily: '"Cascadia Code", "JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, monospace',
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },
  errorHint: {
    display: 'block',
    marginTop: tokens.spacingVerticalSNudge,
    color: tokens.colorNeutralForeground3,
  },
});
